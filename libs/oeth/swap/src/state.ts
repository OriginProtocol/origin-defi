import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { useCurve } from '@origin/shared/providers';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
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
      swapRoutes: [],
      selectedSwapRoute: null,
      slippage: 0.01,
      isSwapRoutesLoading: false,
      isApproved: false,
      isApprovalLoading: false,
      isSwapLoading: false,
    });
    const queryClient = useQueryClient();
    const { CurveRegistryExchange, OethPoolUnderlyings } = useCurve();

    useDebouncedEffect(
      async () => {
        if (state.amountIn === 0n) {
          setState(
            produce((draft) => {
              draft.swapRoutes = [];
              draft.selectedSwapRoute = null;
              draft.amountOut = 0n;
              draft.isSwapRoutesLoading = false;
              draft.isApproved = false;
              draft.isApprovalLoading = false;
              draft.isSwapLoading = false;
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
            draft.isSwapRoutesLoading = false;
          }),
        );
      },
      [state.amountIn],
      state.amountIn === 0n ? 0 : 800,
    );

    return [state, setState];
  });
