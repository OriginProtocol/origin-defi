import { useState } from 'react';

import { formatError, isFulfilled, scale } from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { createContainer } from 'react-tracked';
import { useAccount, useConfig } from 'wagmi';

import { useSlippage } from '../slippage';
import { getAvailableRoutes, getFilteredSwapRoutes } from './utils';

import type { Dispatch, SetStateAction } from 'react';

import type { EstimatedSwapRoute, SwapState } from './types';

export const { Provider: SwapProvider, useTracked: useSwapState } =
  createContainer<
    SwapState,
    Dispatch<SetStateAction<SwapState>>,
    Pick<
      SwapState,
      | 'swapActions'
      | 'swapRoutes'
      | 'trackEvent'
      | 'onInputAmountChange'
      | 'onInputTokenChange'
      | 'onOutputTokenChange'
      | 'onTokenFlip'
      | 'onSwapRouteChange'
      | 'onApproveStart'
      | 'onApproveSuccess'
      | 'onApproveReject'
      | 'onApproveFailure'
      | 'onSwapStart'
      | 'onSwapSuccess'
      | 'onSwapReject'
      | 'onSwapFailure'
    > & { debounceTime?: number }
  >(
    ({
      swapActions,
      swapRoutes,
      debounceTime,
      trackEvent,
      onInputAmountChange,
      onInputTokenChange,
      onOutputTokenChange,
      onTokenFlip,
      onSwapRouteChange,
      onApproveStart,
      onApproveSuccess,
      onApproveReject,
      onApproveFailure,
      onSwapStart,
      onSwapSuccess,
      onSwapReject,
      onSwapFailure,
    }) => {
      const { chain } = useAccount();
      const filteredSwapRoutes = getFilteredSwapRoutes(swapRoutes, chain);
      const [state, setState] = useState<SwapState>({
        swapActions,
        swapRoutes: filteredSwapRoutes,
        amountIn: 0n,
        tokenIn: filteredSwapRoutes[0].tokenIn,
        amountOut: 0n,
        tokenOut: filteredSwapRoutes[0].tokenOut,
        estimatedSwapRoutes: [],
        selectedSwapRoute: null,
        isSwapWaitingForSignature: false,
        isSwapRoutesLoading: false,
        isApprovalWaitingForSignature: false,
        isApprovalLoading: false,
        isSwapLoading: false,
        debounceTime: debounceTime ?? 800,
        trackEvent,
        onInputAmountChange,
        onInputTokenChange,
        onOutputTokenChange,
        onTokenFlip,
        onSwapRouteChange,
        onApproveStart,
        onApproveSuccess,
        onApproveReject,
        onApproveFailure,
        onSwapStart,
        onSwapSuccess,
        onSwapReject,
        onSwapFailure,
      });
      const queryClient = useQueryClient();
      const config = useConfig();
      const { value: slippage } = useSlippage();

      useDebouncedEffect(
        async () => {
          if (state.amountIn === 0n) {
            setState((state) => ({
              ...state,
              amountOut: 0n,
              isSwapRoutesLoading: false,
              isSwapWaitingForSignature: false,
              isApprovalLoading: false,
              isSwapLoading: false,
              isApprovalWaitingForSignature: false,
            }));
            state?.onInputAmountChange?.({ ...state, amountIn: 0n });

            return;
          }

          const availableRoutes = getAvailableRoutes(
            state.swapRoutes,
            state.tokenIn,
            state.tokenOut,
          );
          const availabilities = await Promise.allSettled(
            availableRoutes.map((r) =>
              swapActions[r.action].isRouteAvailable(config, {
                amountIn: state.amountIn,
                tokenIn: r.tokenIn,
                tokenOut: r.tokenOut,
              }),
            ),
          );
          const filteredRoutes = availableRoutes.filter(
            (_, i) =>
              availabilities[i].status === 'fulfilled' &&
              (availabilities[i] as PromiseFulfilledResult<boolean>).value,
          );

          const routes = await Promise.allSettled(
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
                    res = await swapActions[route.action].estimateRoute(
                      config,
                      {
                        tokenIn: route.tokenIn,
                        tokenOut: route.tokenOut,
                        amountIn: state.amountIn,
                        amountOut: state.amountOut,
                        route,
                        slippage,
                      },
                    );
                  } catch (error) {
                    console.error(
                      `Fail to estimate route ${route.action}\n${formatError(error)}`,
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

          const sortedRoutes = routes
            .filter(isFulfilled)
            .map((r) => r.value)
            .sort((a, b) => {
              const valA =
                scale(a.estimatedAmount, a.tokenOut.decimals, 18) -
                (a.gas +
                  (a.allowanceAmount < state.amountIn ? a.approvalGas : 0n));
              const valB =
                scale(b.estimatedAmount, b.tokenOut.decimals, 18) -
                (b.gas +
                  (b.allowanceAmount < state.amountIn ? b.approvalGas : 0n));

              return valA < valB ? 1 : valA > valB ? -1 : 0;
            });

          setState((state) => ({
            ...state,
            estimatedSwapRoutes: sortedRoutes,
            selectedSwapRoute: sortedRoutes[0],
            amountOut: sortedRoutes?.[0]?.estimatedAmount ?? 0n,
            isSwapRoutesLoading: false,
          }));

          trackEvent?.({
            name: 'change_input_amount',
            change_amount_to: state.amountIn,
          });
          state?.onInputAmountChange?.(state);
        },
        [state.amountIn],
        state.amountIn === 0n ? 0 : state.debounceTime,
      );

      return [state, setState];
    },
  );
