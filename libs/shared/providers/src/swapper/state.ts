import { useState } from 'react';

import { useDebouncedEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';

import { useCurve } from '../curve';
import { useSlippage } from '../slippage';
import { getAvailableRoutes } from './utils';

import type { Dispatch, SetStateAction } from 'react';

import type { EstimatedSwapRoute, SwapState } from './types';

export const { Provider: SwapProvider, useTracked: useSwapState } =
  createContainer<
    SwapState,
    Dispatch<SetStateAction<SwapState>>,
    Pick<SwapState, 'swapActions' | 'swapRoutes' | 'trackEvent'>
  >(({ swapActions, swapRoutes, trackEvent }) => {
    const [state, setState] = useState<SwapState>({
      swapActions,
      swapRoutes,
      amountIn: 0n,
      tokenIn: swapRoutes[0].tokenIn,
      amountOut: 0n,
      tokenOut: swapRoutes[0].tokenOut,
      estimatedSwapRoutes: [],
      selectedSwapRoute: null,
      isSwapWaitingForSignature: false,
      isSwapRoutesLoading: false,
      isApprovalWaitingForSignature: false,
      isApprovalLoading: false,
      isSwapLoading: false,
      trackEvent,
    });
    const queryClient = useQueryClient();
    const { value: slippage } = useSlippage();
    const { CurveRegistryExchange, OethPoolUnderlyings } = useCurve();

    useDebouncedEffect(
      async () => {
        if (state.amountIn === 0n) {
          setState(
            produce((draft) => {
              draft.estimatedSwapRoutes = [];
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

        const availableRoutes = getAvailableRoutes(
          state.swapRoutes,
          state.tokenIn,
          state.tokenOut,
        );
        const filteredRoutes = [];
        for (const r of availableRoutes) {
          const isRouteAvailable = await swapActions[r.action].isRouteAvailable(
            {
              amountIn: state.amountIn,
              tokenIn: r.tokenIn,
              tokenOut: r.tokenOut,
            },
          );
          if (isRouteAvailable) {
            filteredRoutes.push(r);
          }
        }

        const routes = await Promise.all(
          filteredRoutes.map((route) =>
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
            draft.estimatedSwapRoutes = sortedRoutes;
            draft.selectedSwapRoute = sortedRoutes[0];
            draft.amountOut = sortedRoutes[0].estimatedAmount ?? 0n;
            draft.isSwapRoutesLoading = false;
          }),
        );

        trackEvent({
          name: 'change_input_amount',
          change_amount_to: state.amountIn,
        });
      },
      [state.amountIn],
      state.amountIn === 0n ? 0 : 800,
    );

    return [state, setState];
  });
