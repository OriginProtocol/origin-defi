import { useEffect, useState } from 'react';

import {
  isFulfilled,
  isNilOrEmpty,
  scale,
  timeoutRejectPromise,
  timeoutResolvePromise,
} from '@origin/shared/utils';
import { useDebouncedEffect, useIntervalEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { mergeDeepRight, update } from 'ramda';
import { createContainer } from 'react-tracked';
import { mainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import { useSlippage } from '../slippage';
import { getAvailableRoutes, getFilteredSwapRoutes, routeEq } from './utils';

import type { Dispatch, SetStateAction } from 'react';

import type { SwapState } from './types';

export const ESTIMATE_ROUTE_TIMEOUT = 5000; // ms

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
      | 'onApproveSigned'
      | 'onApproveSuccess'
      | 'onApproveReject'
      | 'onApproveFailure'
      | 'onSwapStart'
      | 'onSwapSigned'
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
      onApproveSigned,
      onApproveSuccess,
      onApproveReject,
      onApproveFailure,
      onSwapStart,
      onSwapSigned,
      onSwapSuccess,
      onSwapReject,
      onSwapFailure,
    }) => {
      const { chain } = useAccount();
      const queryClient = useQueryClient();
      const config = useConfig();
      const { value: slippage } = useSlippage();
      const filteredSwapRoutes = getFilteredSwapRoutes(
        swapRoutes,
        chain ?? mainnet,
      );
      const routes = isNilOrEmpty(filteredSwapRoutes)
        ? swapRoutes
        : filteredSwapRoutes;

      const [state, setState] = useState<SwapState>({
        swapActions,
        swapRoutes: routes,
        amountIn: 0n,
        tokenIn: routes[0]?.tokenIn,
        amountOut: 0n,
        tokenOut: routes[0]?.tokenOut,
        estimatedSwapRoutes: [],
        selectedSwapRoute: null,
        isSwapWaitingForSignature: false,
        isSwapRoutesLoading: false,
        isApprovalWaitingForSignature: false,
        isApprovalLoading: false,
        isSwapLoading: false,
        debounceTime: debounceTime ?? 800,
        status: 'idle',
        trackEvent,
        onInputAmountChange,
        onInputTokenChange,
        onOutputTokenChange,
        onTokenFlip,
        onSwapRouteChange,
        onApproveStart,
        onApproveSigned,
        onApproveSuccess,
        onApproveReject,
        onApproveFailure,
        onSwapStart,
        onSwapSigned,
        onSwapSuccess,
        onSwapReject,
        onSwapFailure,
      });

      useEffect(() => {
        const routes = getFilteredSwapRoutes(swapRoutes, chain);
        const available = getAvailableRoutes(
          routes,
          state.tokenIn,
          state.tokenOut,
        );
        setState((prev) => ({
          ...prev,
          swapRoutes: routes,
          ...(isNilOrEmpty(available) && {
            tokenIn: routes[0]?.tokenIn,
            amountIn: 0n,
            amountOut: 0n,
            tokenOut: routes[0]?.tokenOut,
            estimatedSwapRoutes: [],
            selectedSwapRoute: null,
          }),
        }));
      }, [chain, state.tokenIn, state.tokenOut, swapRoutes]);

      useIntervalEffect(async () => {
        const route = state?.selectedSwapRoute;

        if (route && route?.refreshInterval && route?.refreshInterval > 0) {
          const refreshed = await swapActions[route.action].estimateRoute(
            { config, queryClient },
            {
              tokenIn: route.tokenIn,
              tokenOut: route.tokenOut,
              amountIn: state.amountIn,
              route,
              slippage,
            },
          );

          const idx = state?.estimatedSwapRoutes?.findIndex((r) =>
            routeEq(r, route),
          );

          if (refreshed && idx > -1) {
            const merged = mergeDeepRight(route, refreshed);
            setState((prev) => ({
              ...prev,
              estimatedSwapRoutes: update(
                idx,
                merged,
                prev.estimatedSwapRoutes,
              ),
              selectedSwapRoute: merged,
            }));
          }
        }
      }, state?.selectedSwapRoute?.refreshInterval);

      useDebouncedEffect(
        async () => {
          if (state.amountIn === 0n) {
            setState((state) => ({
              ...state,
              amountOut: 0n,
              selectedSwapRoute: null,
              isSwapRoutesLoading: false,
              isSwapWaitingForSignature: false,
              isApprovalLoading: false,
              isSwapLoading: false,
              isApprovalWaitingForSignature: false,
              status: 'idle',
              estimatedSwapRoutes: [],
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
              Promise.race([
                swapActions[r.action].isRouteAvailable(
                  { config, queryClient },
                  {
                    amountIn: state.amountIn,
                    tokenIn: r.tokenIn,
                    tokenOut: r.tokenOut,
                  },
                ),
                timeoutRejectPromise(ESTIMATE_ROUTE_TIMEOUT),
              ]),
            ),
          );
          const filteredRoutes = availableRoutes.filter(
            (_, i) =>
              availabilities[i].status === 'fulfilled' &&
              (availabilities[i] as PromiseFulfilledResult<boolean>).value,
          );

          if (isNilOrEmpty(filteredRoutes)) {
            setState((state) => ({
              ...state,
              estimatedSwapRoutes: [],
              selectedSwapRoute: null,
              amountOut: 0n,
              isSwapRoutesLoading: false,
              status: 'noAvailableRoute',
            }));

            return;
          }

          const routes = await Promise.allSettled(
            filteredRoutes.map((route) =>
              queryClient.fetchQuery({
                queryKey: [
                  'estimateRoute',
                  state.tokenIn.id,
                  state.tokenOut.id,
                  route.action,
                  slippage,
                  state.amountIn.toString(),
                ] as const,
                queryFn: async () => {
                  return await Promise.race([
                    swapActions[route.action].estimateRoute(
                      { config, queryClient },
                      {
                        tokenIn: route.tokenIn,
                        tokenOut: route.tokenOut,
                        amountIn: state.amountIn,
                        route,
                        slippage,
                      },
                    ),
                    timeoutResolvePromise(ESTIMATE_ROUTE_TIMEOUT, {
                      tokenIn: route.tokenIn,
                      tokenOut: route.tokenOut,
                      estimatedAmount: 0n,
                      action: route.action,
                      allowanceAmount: 0n,
                      approvalGas: 0n,
                      gas: 0n,
                      rate: 0,
                      refreshInterval: route.refreshInterval,
                    }),
                  ]);
                },
              }),
            ),
          );

          const sortedRoutes = routes
            .filter(isFulfilled)
            .map((r) => r.value)
            .toSorted((a, b) => {
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
            status: 'idle',
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
