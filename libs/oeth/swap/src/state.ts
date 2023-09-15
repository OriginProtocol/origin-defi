import { useState } from 'react';

import { queryClient } from '@origin/oeth/shared';
import { tokens } from '@origin/shared/contracts';
import { useCurve } from '@origin/shared/providers';
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
      swapRoutes: [],
      selectedSwapRoute: null,
      isSwapRoutesLoading: false,
      isApproved: false,
      isApprovalLoading: false,
      slippage: 0.01,
    });
    const { CurveRegistryExchange, OethPoolUnderlyings } = useCurve();

    useDebouncedEffect(
      async () => {
        if (state.amountIn === 0n) {
          setState(
            produce((draft) => {
              draft.swapRoutes = [];
              draft.selectedSwapRoute = null;
              draft.amountOut = 0n;
              draft.isAmountOutLoading = false;
              draft.isPriceOutLoading = false;
              draft.isSwapRoutesLoading = false;
              draft.isApproved = false;
              draft.isApprovalLoading = false;
            }),
          );
          return;
        }

        const routes = await Promise.all(
          getAvailableRoutes(state.tokenIn, state.tokenOut).map((route) =>
            queryClient.fetchQuery({
              queryKey: [
                'estimateRoute',
                state.tokenIn.symbol,
                state.tokenOut.symbol,
                route.action,
                state.slippage,
                state.amountIn.toString(),
              ] as const,
              queryFn: async () =>
                swapActions[route.action].estimateRoute({
                  tokenIn: route.tokenIn,
                  tokenOut: route.tokenOut,
                  amountIn: state.amountIn,
                  amountOut: state.amountOut,
                  route,
                  slippage: state.slippage,
                  curve: {
                    CurveRegistryExchange,
                    OethPoolUnderlyings,
                  },
                }),
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
      state.amountIn === 0n ? 0 : 800,
    );

    return [state, setState];
  });
