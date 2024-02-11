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

export const useSlippage = () => {
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
    { swapRoutes, onInputTokenChange, onOutputTokenChange },
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
          onInputTokenChange?.(token);
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
          onOutputTokenChange?.(token);
        }

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
    [onInputTokenChange, onOutputTokenChange, setSwapState, swapRoutes],
  );
};

export const useHandleTokenFlip = () => {
  const [
    {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut,
      swapActions,
      swapRoutes,
      slippage,
      onTokenFlip,
    },
    setSwapState,
  ] = useSwapState();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    onTokenFlip?.(tokenIn, tokenOut);
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
    }
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
  ]);
};

export const useHandleSelectSwapRoute = () => {
  const [{ onSwapRouteChange }, setSwapState] = useSwapState();

  return useCallback(
    (route: EstimatedSwapRoute) => {
      setSwapState((state) => ({
        ...state,
        selectedSwapRoute: route,
        amountOut: route.estimatedAmount,
      }));
      onSwapRouteChange?.(route.action);
    },
    [onSwapRouteChange, setSwapState],
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

  const [
    {
      amountIn,
      selectedSwapRoute,
      tokenIn,
      tokenOut,
      swapActions,
      onApproveStart,
      onApproveFailure,
      onApproveReject,
      onApproveSuccess,
    },
    setSwapState,
  ] = useSwapState();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute) || isNilOrEmpty(address)) {
      return;
    }

    setSwapState((state) => ({
      ...state,
      isApprovalWaitingForSignature: true,
    }));
    const trackId = onApproveStart?.(tokenIn);
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
        onApproveSuccess?.(tokenIn, txReceipt, trackId);
      }
    } catch (error) {
      setSwapState((state) => ({
        ...state,
        isApprovalWaitingForSignature: false,
        isApprovalLoading: false,
      }));

      if (isUserRejected(error)) {
        onApproveReject?.(tokenIn, trackId);
      } else {
        onApproveFailure?.(
          tokenIn,
          error?.shortMessage ?? error.message,
          trackId,
        );
      }
    }
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
    wagmiClient,
  ]);
};

export const useHandleSwap = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const wagmiClient = useWagmiClient();

  const [
    {
      amountIn,
      amountOut,
      selectedSwapRoute,
      tokenIn,
      tokenOut,
      swapActions,
      slippage,
      onSwapStart,
      onSwapFailure,
      onSwapReject,
      onSwapSuccess,
    },
    setSwapState,
  ] = useSwapState();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute) || isNilOrEmpty(address)) {
      return;
    }

    setSwapState((state) => ({ ...state, isSwapWaitingForSignature: true }));
    const trackId = onSwapStart?.(
      tokenIn,
      tokenOut,
      selectedSwapRoute.action,
      amountIn,
    );
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
        onSwapSuccess?.(
          tokenIn,
          tokenOut,
          selectedSwapRoute.action,
          amountIn,
          txReceipt,
          trackId,
        );
      }
    } catch (error) {
      setSwapState((state) => ({
        ...state,
        isSwapWaitingForSignature: false,
        isSwapLoading: false,
      }));
      if (isUserRejected(error)) {
        onSwapReject?.(
          tokenIn,
          tokenOut,
          selectedSwapRoute.action,
          amountIn,
          trackId,
        );
      } else {
        onSwapFailure?.(
          tokenIn,
          tokenOut,
          selectedSwapRoute.action,
          amountIn,
          error?.shortMessage ?? error.message,
          trackId,
        );
      }
    }
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
    wagmiClient,
  ]);
};
