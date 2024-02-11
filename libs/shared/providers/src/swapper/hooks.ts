import { useCallback, useMemo } from 'react';

import { isNilOrEmpty, isUserRejected, scale } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { waitForTransaction } from '@wagmi/core';
import { useAccount, useQueryClient as useWagmiClient } from 'wagmi';

import { useSwapState } from './state';
import {
  getAllAvailableTokens,
  getAvailableRoutes,
  getAvailableTokensForSource,
} from './utils';

import type {
  EstimatedSwapRoute,
  SwapRoute,
  Token,
  TokenSource,
} from './types';

export const useSwapperSlippage = () => {
  const [{ slippage }, setSwapState] = useSwapState();

  const setSlippage = useCallback(
    (slippage: number) => {
      setSwapState((state) => ({ ...state, slippage }));
    },
    [setSwapState],
  );

  return [slippage, setSlippage];
};

export const useHandleAmountInChange = () => {
  const [, setSwapState] = useSwapState();

  return useCallback(
    (amount: bigint) => {
      setSwapState((state) => {
        if (state.amountIn !== amount) {
          return {
            ...state,
            amountIn: amount,
            isSwapRoutesLoading: amount !== 0n,
          };
        }

        return state;
      });
    },
    [setSwapState],
  );
};

export const useTokenOptions = () => {
  const [{ tokenIn, tokenOut, swapRoutes }] = useSwapState();
  const tokensIn = getAllAvailableTokens(swapRoutes, 'tokenIn');
  const tokensOut = getAllAvailableTokens(swapRoutes, 'tokenOut');
  const availableTokensIn = getAvailableTokensForSource(
    swapRoutes,
    'tokenOut',
    tokenOut,
  );
  const availableTokensOut = getAvailableTokensForSource(
    swapRoutes,
    'tokenIn',
    tokenIn,
  );

  return useMemo(
    () => ({
      tokensIn: tokensIn.map((t) => ({
        ...t,
        isSelected: t.symbol === tokenIn.symbol,
        isSwappable: availableTokensIn.reduce(
          (acc, curr) => acc || curr.symbol === t.symbol,
          false,
        ),
      })),
      tokensOut: tokensOut.map((t) => ({
        ...t,
        isSelected: t.symbol === tokenOut.symbol,
        isSwappable: availableTokensOut.reduce(
          (acc, curr) => acc || curr.symbol === t.symbol,
          false,
        ),
      })),
    }),
    [
      availableTokensIn,
      availableTokensOut,
      tokenIn.symbol,
      tokenOut.symbol,
      tokensIn,
      tokensOut,
    ],
  );
};

export const useHandleTokenChange = () => {
  const [
    { swapRoutes, trackEvent, onInputTokenChange, onOutputTokenChange },
    setSwapState,
  ] = useSwapState();

  return useCallback(
    (source: TokenSource, token: Token) => {
      setSwapState((state) => {
        let tokenIn = state.tokenIn;
        let tokenOut = state.tokenOut;
        if (source === 'tokenIn') {
          tokenIn = token;
          const availableTokensOut = getAvailableTokensForSource(
            swapRoutes,
            'tokenIn',
            token,
          );
          const found = availableTokensOut.find(
            (t) => t.symbol === state.tokenOut.symbol,
          );
          if (isNilOrEmpty(found)) {
            tokenOut = availableTokensOut[0];
          }
          onInputTokenChange?.(state);
        } else {
          tokenOut = token;
          const availableTokensIn = getAvailableTokensForSource(
            swapRoutes,
            'tokenOut',
            token,
          );
          const found = availableTokensIn.find(
            (t) => t.symbol === state.tokenIn.symbol,
          );
          if (isNilOrEmpty(found)) {
            tokenIn = availableTokensIn[0];
          }
          onOutputTokenChange?.(state);
        }

        trackEvent?.(
          source === 'tokenIn'
            ? { name: 'change_input_currency', change_input_to: token.symbol }
            : {
                name: 'change_output_currency',
                change_output_to: token.symbol,
              },
        );

        return {
          ...state,
          tokenIn,
          tokenOut,
          amountIn: 0n,
          amountOut: 0n,
          estimatedSwapRoutes: [],
          selectedSwapRoute: null,
        };
      });
    },
    [
      onInputTokenChange,
      onOutputTokenChange,
      setSwapState,
      swapRoutes,
      trackEvent,
    ],
  );
};

export const useHandleTokenFlip = () => {
  const [state, setSwapState] = useSwapState();
  const {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    swapActions,
    swapRoutes,
    slippage,
    trackEvent,
    onTokenFlip,
  } = state;
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const scaledAmountIn = scale(amountIn, tokenIn.decimals, tokenOut.decimals);
    const scaledAmountOut = scale(
      amountOut,
      tokenOut.decimals,
      tokenIn.decimals,
    );
    const newRoutes = getAvailableRoutes(swapRoutes, tokenOut, tokenIn);
    const availabilities = await Promise.allSettled(
      newRoutes.map((r) =>
        swapActions[r.action].isRouteAvailable({
          amountIn: amountIn,
          tokenIn: r.tokenIn,
          tokenOut: r.tokenOut,
        }),
      ),
    );
    const filteredRoutes = newRoutes.filter(
      (_, i) =>
        availabilities[i].status === 'fulfilled' &&
        (availabilities[i] as PromiseFulfilledResult<boolean>).value,
    );

    if (isNilOrEmpty(filteredRoutes)) {
      const newTokenOut = getAvailableTokensForSource(
        swapRoutes,
        'tokenIn',
        tokenOut,
      )[0];
      setSwapState((state) => {
        const oldTokenOut = state.tokenOut;

        return {
          ...state,
          amountIn: 0n,
          amountOut: 0n,
          tokenOut: newTokenOut,
          tokenIn: oldTokenOut,
          estimatedSwapRoutes: [],
          selectedSwapRoute: null,
          isSwapRoutesLoading: false,
        };
      });
    } else {
      setSwapState((state) => {
        const oldTokenOut = tokenOut;

        return {
          ...state,
          tokenOut: tokenIn,
          tokenIn: oldTokenOut,
          amountIn: scaledAmountIn,
          amountOut: scaledAmountOut,
        };
      });
      if (amountIn > 0n || amountOut > 0n) {
        setSwapState((state) => ({
          ...state,
          isSwapRoutesLoading: true,
          estimatedSwapRoutes: [],
          selectedSwapRoute: null,
        }));
        const routes = await Promise.allSettled(
          newRoutes.map((route) =>
            queryClient.fetchQuery({
              queryKey: [
                'estimateRoute',
                tokenOut.symbol,
                tokenIn.symbol,
                route.action,
                slippage,
                scaledAmountIn.toString(),
                scaledAmountOut.toString(),
              ] as const,
              queryFn: async () => {
                let res: EstimatedSwapRoute;
                try {
                  res = await swapActions[route.action].estimateRoute({
                    tokenIn: route.tokenIn,
                    tokenOut: route.tokenOut,
                    amountIn: scaledAmountIn,
                    amountOut: scaledAmountOut,
                    route,
                    slippage,
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

        const sortedRoutes = routes
          .map((r) => (r.status === 'fulfilled' ? r.value : null))
          .sort((a, b) => {
            const valA =
              scale(a.estimatedAmount, a.tokenOut.decimals, 18) -
              (a.gas + (a.allowanceAmount < amountIn ? a.approvalGas : 0n));
            const valB =
              scale(b.estimatedAmount, b.tokenOut.decimals, 18) -
              (b.gas + (b.allowanceAmount < amountIn ? b.approvalGas : 0n));

            return valA < valB ? 1 : valA > valB ? -1 : 0;
          });
        setSwapState((state) => ({
          ...state,
          estimatedSwapRoutes: sortedRoutes,
          selectedSwapRoute: sortedRoutes[0],
          amountOut: sortedRoutes[0].estimatedAmount ?? 0n,
        }));
      }
      setSwapState((state) => ({
        ...state,
        isSwapRoutesLoading: false,
      }));

      onTokenFlip?.(state);
      trackEvent?.({ name: 'change_input_output' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    amountIn,
    amountOut,
    onTokenFlip,
    queryClient,
    setSwapState,
    slippage,
    swapActions,
    swapRoutes,
    tokenIn,
    tokenOut,
    trackEvent,
  ]);
};

export const useHandleSelectSwapRoute = () => {
  const [state, setSwapState] = useSwapState();
  const { trackEvent, onSwapRouteChange } = state;

  return useCallback(
    (route: EstimatedSwapRoute) => {
      setSwapState((state) => ({
        ...state,
        selectedSwapRoute: route,
        amountOut: route.estimatedAmount,
      }));
      onSwapRouteChange?.(state);
      trackEvent?.({
        name: 'change_swap_route',
        change_route_to: route.action,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSwapRouteChange, setSwapState, trackEvent],
  );
};

export const useSwapRouteAllowance = (route: SwapRoute) => {
  const [{ swapActions }] = useSwapState();

  return useQuery({
    queryKey: [
      'swap_allowance',
      route?.tokenIn.symbol,
      route?.tokenOut.symbol,
      route?.action,
    ],
    queryFn: async () => {
      let res = 0n;
      try {
        res = await swapActions[route.action].allowance({
          tokenIn: route.tokenIn,
          tokenOut: route.tokenOut,
        });
      } catch {}

      return res;
    },
    enabled: !isNilOrEmpty(route),
    placeholderData: 0n,
  });
};

export const useHandleApprove = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const wagmiClient = useWagmiClient();

  const [state, setSwapState] = useSwapState();
  const {
    amountIn,
    selectedSwapRoute,
    tokenIn,
    tokenOut,
    swapActions,
    trackEvent,
    onApproveStart,
    onApproveFailure,
    onApproveReject,
    onApproveSuccess,
  } = state;

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute) || isNilOrEmpty(address)) {
      return;
    }

    setSwapState((state) => ({
      ...state,
      isApprovalWaitingForSignature: true,
    }));

    const trackId = onApproveStart?.(state);
    trackEvent({
      name: 'approve_started',
      approval_token: tokenIn.symbol,
    });

    try {
      const hash = await swapActions[selectedSwapRoute.action].approve({
        tokenIn,
        tokenOut,
        amountIn,
      });
      setSwapState((state) => ({
        ...state,
        isApprovalWaitingForSignature: false,
        isApprovalLoading: true,
      }));
      if (!isNilOrEmpty(hash)) {
        const txReceipt = await waitForTransaction({ hash });
        wagmiClient.invalidateQueries();
        queryClient.invalidateQueries();
        setSwapState((state) => ({
          ...state,
          isApprovalLoading: false,
        }));
        onApproveSuccess?.({ ...state, txReceipt, trackId });
        trackEvent?.({
          name: 'approve_complete',
          approval_token: tokenIn.symbol,
        });
      }
    } catch (error) {
      setSwapState((state) => ({
        ...state,
        isApprovalWaitingForSignature: false,
        isApprovalLoading: false,
      }));

      if (isUserRejected(error)) {
        onApproveReject?.({ ...state, trackId });
        trackEvent?.({
          name: 'approve_rejected',
          approval_token: tokenIn.symbol,
        });
      } else {
        onApproveFailure?.({ ...state, error, trackId });
        trackEvent?.({
          name: 'approve_failed',
          approval_token: tokenIn.symbol,
          approve_error: error?.shortMessage ?? error.message,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    amountIn,
    onApproveFailure,
    onApproveReject,
    onApproveStart,
    onApproveSuccess,
    queryClient,
    selectedSwapRoute,
    setSwapState,
    swapActions,
    tokenIn,
    tokenOut,
    trackEvent,
    wagmiClient,
  ]);
};

export const useHandleSwap = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const wagmiClient = useWagmiClient();

  const [state, setSwapState] = useSwapState();
  const {
    amountIn,
    amountOut,
    selectedSwapRoute,
    tokenIn,
    tokenOut,
    swapActions,
    slippage,
    trackEvent,
    onSwapStart,
    onSwapFailure,
    onSwapReject,
    onSwapSuccess,
  } = state;

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute) || isNilOrEmpty(address)) {
      return;
    }

    setSwapState((state) => ({ ...state, isSwapWaitingForSignature: true }));

    const trackId = onSwapStart?.(state);
    trackEvent?.({
      name: 'swap_started',
      swap_route: selectedSwapRoute.action,
      swap_token: tokenIn.symbol,
      swap_to: tokenOut.symbol,
      swap_amount: amountIn,
    });

    try {
      const hash = await swapActions[selectedSwapRoute.action].swap({
        tokenIn,
        tokenOut,
        amountIn,
        estimatedRoute: selectedSwapRoute,
        slippage,
        amountOut,
      });
      setSwapState((state) => ({
        ...state,
        isSwapWaitingForSignature: false,
        isSwapLoading: true,
      }));
      if (!isNilOrEmpty(hash)) {
        const txReceipt = await waitForTransaction({ hash });
        wagmiClient.invalidateQueries();
        queryClient.invalidateQueries();
        setSwapState((state) => ({
          ...state,
          isSwapLoading: false,
          amountIn: 0n,
          amountOut: 0n,
          estimatedSwapRoutes: [],
          selectedSwapRoute: null,
        }));
        onSwapSuccess?.({ ...state, txReceipt, trackId });
        trackEvent?.({
          name: 'swap_complete',
          swap_route: selectedSwapRoute.action,
          swap_token: tokenIn.symbol,
          swap_to: tokenOut.symbol,
          swap_amount: amountIn,
        });
      }
    } catch (error) {
      setSwapState((state) => ({
        ...state,
        isSwapWaitingForSignature: false,
        isSwapLoading: false,
      }));
      if (isUserRejected(error)) {
        onSwapReject?.({ ...state, trackId });
        trackEvent?.({
          name: 'swap_rejected',
          swap_token: tokenIn.symbol,
          swap_amount: amountIn,
          swap_to: tokenOut.symbol,
          swap_route: selectedSwapRoute.action,
        });
      } else {
        onSwapFailure?.({ ...state, error, trackId });
        trackEvent?.({
          name: 'swap_failed',
          swap_token: tokenIn.symbol,
          swap_amount: amountIn,
          swap_to: tokenOut.symbol,
          swap_route: selectedSwapRoute.action,
          swap_error: error?.shortMessage ?? error.message,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    amountIn,
    amountOut,
    onSwapFailure,
    onSwapReject,
    onSwapStart,
    onSwapSuccess,
    queryClient,
    selectedSwapRoute,
    setSwapState,
    slippage,
    swapActions,
    tokenIn,
    tokenOut,
    trackEvent,
    wagmiClient,
  ]);
};
