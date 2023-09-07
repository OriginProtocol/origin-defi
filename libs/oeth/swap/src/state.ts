import { useState } from 'react';

import { queryClient } from '@origin/oeth/shared';
import { tokens } from '@origin/shared/contracts';
import { useDebouncedEffect } from '@react-hookz/web';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import { swapActions } from './actions';
import { getAvailableRoutes } from './utils';

import type { SwapState } from './types';

export const { Provider: SwapProvider, useTracked: useSwapState } =
  createContainer(() => {
    const [state, setState] = useState<SwapState>({
      amountIn: 0n,
      tokenIn: tokens.mainnet.ETH,
      amountOut: 0n,
      tokenOut: tokens.mainnet.OETH,
      isAmountOutLoading: false,
      isPriceOutLoading: false,
      isBalanceOutLoading: false,
      slippage: 0.01,
      swapRoutes: [],
      selectedSwapRoute: null,
      isSwapRoutesLoading: false,
    });

    useDebouncedEffect(
      async () => {
        if (state.amountIn === 0n) {
          return;
        }

        const routes = await Promise.all(
          getAvailableRoutes(state.tokenIn, state.tokenOut).map((route) =>
            queryClient.fetchQuery({
              queryKey: [
                'estimateRoute',
                state.tokenIn,
                state.tokenOut,
                route.action,
                state.amountIn.toString(),
                state.slippage,
              ] as const,
              queryFn: async ({
                queryKey: [, tokenIn, tokenOut, action, , slippage],
              }) =>
                swapActions[action].estimateRoute(
                  tokenIn,
                  tokenOut,
                  state.amountIn,
                  route,
                  slippage,
                ),
            }),
          ),
        );

        const sortedRoutes = routes.sort((a, b) =>
          a.estimatedAmount < b.estimatedAmount
            ? 1
            : a.estimatedAmount > b.estimatedAmount
            ? -1
            : 0,
        );

        setState(
          produce((draft) => {
            draft.swapRoutes = sortedRoutes;
            draft.selectedSwapRoute = sortedRoutes[0];
            draft.amountOut = sortedRoutes[0].estimatedAmount ?? 0n;
            draft.isAmountOutLoading = false;
            draft.isPriceOutLoading = false;
            draft.isSwapRoutesLoading = false;
          }),
        );
      },
      [state.amountIn],
      800,
    );

    return [state, setState];
  });
