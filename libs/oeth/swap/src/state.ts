import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { useCurve, useSlippage } from '@origin/shared/providers';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import { swapActions } from './actions';
import { getAvailableRoutes } from './utils';

import type { EstimatedSwapRoute, SwapState } from './types';

export const { Provider: SwapProvider, useTracked: useSwapState } =
  createContainer(() => {
    const [state, setState] = useState<SwapState>({
      amountIn: 0n,
      tokenIn: tokens.mainnet.ETH,
      amountOut: 0n,
      tokenOut: tokens.mainnet.OETH,
      swapRoutes: [],
      selectedSwapRoute: null,
      isSwapWaitingForSignature: false,
      isSwapRoutesLoading: false,
      isApprovalWaitingForSignature: false,
      isApprovalLoading: false,
      isSwapLoading: false,
    });
    const queryClient = useQueryClient();
    const { value: slippage } = useSlippage();
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
              draft.isSwapWaitingForSignature = false;
              draft.isApprovalLoading = false;
              draft.isSwapLoading = false;
              draft.isApprovalWaitingForSignature = false;
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
                slippage,
                state.amountIn.toString(),
              ] as const,
              queryFn: async () => {
                let res: EstimatedSwapRoute;
                try {
                  res = await swapActions[route.action].estimateRoute({
                    tokenIn: route.tokenIn,
                    tokenOut: route.tokenOut,
                    amountIn: state.amountIn,
                    amountOut: state.amountOut,
                    route,
                    slippage,
                    curve: {
                      CurveRegistryExchange,
                      OethPoolUnderlyings,
                    },
                  });
                } catch (error) {
                  console.error(
                    `Fail to estimate route ${route.action}\n${error.message}`,
                  );
                  res = {
                    tokenIn: route.tokenIn,
                    tokenOut: route.tokenOut,
                    estimatedAmount: 0n,
                    action: route.action,
                    allowanceAmount: 0n,
                    approvalGas: 0n,
                    gas: 0n,
                    rate: 0,
                  };
                }

                return res;
              },
            }),
          ),
        );

        const sortedRoutes = routes.sort((a, b) => {
          const valA =
            a.estimatedAmount -
            (a.gas + (a.allowanceAmount < state.amountIn ? a.approvalGas : 0n));
          const valB =
            b.estimatedAmount -
            (b.gas + (b.allowanceAmount < state.amountIn ? b.approvalGas : 0n));

          return valA < valB ? 1 : valA > valB ? -1 : 0;
        });

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
