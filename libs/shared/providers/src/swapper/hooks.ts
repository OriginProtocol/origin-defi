import { useCallback, useMemo } from 'react';

import {
  formatError,
  isNilOrEmpty,
  isUserRejected,
  scale,
  timeoutRejectPromise,
  timeoutResolvePromise,
} from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { waitForTransactionReceipt } from '@wagmi/core';
import { uniq } from 'ramda';
import { formatUnits } from 'viem';
import { mainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import { getTokenPriceKey, useTokenPrices } from '../prices';
import { useSlippage } from '../slippage';
import { ESTIMATE_ROUTE_TIMEOUT, useSwapState } from './state';
import {
  getAllAvailableChainIds,
  getAllAvailableTokens,
  getAvailableRoutes,
  getAvailableTokensForSource,
  getTokenMeta,
} from './utils';

import type { Token } from '@origin/shared/contracts';
import type { TransactionReceipt } from 'viem';

import type { SupportedCurrency } from '../prices/types';
import type {
  EstimatedSwapRoute,
  SwapRoute,
  TokenOption,
  TokenSource,
} from './types';

export const useRoutingSwapState = <S = string, M = object>() => {
  const [{ tokenIn, tokenOut, selectedSwapRoute, swapActions, swapRoutes }] =
    useSwapState();

  if (!swapActions || !tokenIn || !tokenOut) {
    return { action: null, route: null };
  }

  if (selectedSwapRoute) {
    return {
      action: swapActions[selectedSwapRoute.action],
      route: selectedSwapRoute as unknown as SwapRoute<S, M>,
    };
  }

  const availableRoutes = getAvailableRoutes(swapRoutes, tokenIn, tokenOut);

  if (availableRoutes) {
    return {
      action: swapActions[availableRoutes[0].action],
      route: availableRoutes[0] as SwapRoute<S, M>,
    };
  }

  return { action: null, route: null };
};

export const useTokenOptions = <M = object>(): {
  tokensIn: TokenOption<M>[];
  tokensOut: TokenOption<M>[];
} => {
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
      tokensIn: tokensIn.map(
        (t) =>
          ({
            ...t,
            isSelected: t.symbol === tokenIn.symbol,

            isSwappable: availableTokensIn.reduce(
              (acc, curr) => acc || curr.symbol === t.symbol,
              false,
            ),

            meta: getTokenMeta(swapRoutes, 'tokenIn', t),
          }) as TokenOption<M>,
      ),
      tokensOut: tokensOut.map(
        (t) =>
          ({
            ...t,
            isSelected: t.symbol === tokenOut.symbol,

            isSwappable: availableTokensOut.reduce(
              (acc, curr) => acc || curr.symbol === t.symbol,
              false,
            ),

            meta: getTokenMeta(swapRoutes, 'tokenIn', t),
          }) as TokenOption<M>,
      ),
    }),
    [
      availableTokensIn,
      availableTokensOut,
      swapRoutes,
      tokenIn?.symbol,
      tokenOut?.symbol,
      tokensIn,
      tokensOut,
    ],
  );
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
            status: amount !== 0n ? 'swapRoutesLoading' : 'idle',
          };
        }

        return state;
      });
    },
    [setSwapState],
  );
};

export const useHandleTokenChange = () => {
  const [
    { swapRoutes, trackEvent, onInputTokenChange, onOutputTokenChange },
    setSwapState,
  ] = useSwapState();

  return useCallback(
    (
      source: TokenSource | undefined | null,
      token: Token | undefined | null,
    ) => {
      setSwapState((state) => {
        if (!source || !token) {
          return state;
        }
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
          status: 'idle',
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
    trackEvent,
    onTokenFlip,
  } = state;
  const config = useConfig();
  const queryClient = useQueryClient();
  const { value: slippage } = useSlippage();

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
        Promise.race([
          swapActions[r.action].isRouteAvailable(
            { config, queryClient },
            {
              amountIn: amountIn,
              tokenIn: r.tokenIn,
              tokenOut: r.tokenOut,
            },
          ),
          timeoutRejectPromise(ESTIMATE_ROUTE_TIMEOUT),
        ]),
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
          status: 'idle',
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
          status: 'swapRoutesLoading',
        }));
        const routes = await Promise.all(
          filteredRoutes.map((route) =>
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
                  res = await Promise.race([
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
                    refreshInterval: route.refreshInterval,
                  };
                }

                return res;
              },
            }),
          ),
        );

        const sortedRoutes = routes.sort((a, b) => {
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
        status: 'idle',
      }));

      onTokenFlip?.(state);
      trackEvent?.({ name: 'change_input_output' });
    }
  }, [
    amountIn,
    amountOut,
    config,
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
    [onSwapRouteChange, setSwapState, trackEvent],
  );
};

export const useIsSwapRouteAvailable = (
  route: SwapRoute | undefined | null,
) => {
  const queryClient = useQueryClient();
  const config = useConfig();
  const [{ amountIn, swapActions }] = useSwapState();

  return useQuery({
    queryKey: [
      'swap_available',
      amountIn?.toString(),
      route?.tokenIn.symbol,
      route?.tokenOut.symbol,
      route?.action,
    ],
    queryFn: async () => {
      if (!route) {
        return false;
      }

      return await swapActions[route.action].isRouteAvailable(
        { config, queryClient },
        {
          tokenIn: route.tokenIn,
          tokenOut: route.tokenOut,
          amountIn,
        },
      );
    },
  });
};

export const useSwapRouteAllowance = (
  route: SwapRoute | EstimatedSwapRoute | undefined | null,
) => {
  const queryClient = useQueryClient();
  const config = useConfig();
  const [{ swapActions }] = useSwapState();

  return useQuery({
    queryKey: [
      'swap_allowance',
      route?.tokenIn.symbol,
      route?.tokenOut.symbol,
      route?.action,
    ],
    queryFn: async () => {
      if (!route) {
        return 0n;
      }
      let res = 0n;
      try {
        res = await swapActions[route.action].allowance(
          { config, queryClient },
          {
            tokenIn: route.tokenIn,
            tokenOut: route.tokenOut,
            estimatedRoute: route as EstimatedSwapRoute,
          },
        );
      } catch {}

      return res;
    },
    enabled: !isNilOrEmpty(route),
    placeholderData: 0n,
  });
};

export const useHandleApprove = () => {
  const config = useConfig();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const [state, setSwapState] = useSwapState();
  const {
    amountIn,
    selectedSwapRoute,
    tokenIn,
    tokenOut,
    swapActions,
    trackEvent,
    onApproveStart,
    onApproveSigned,
    onApproveFailure,
    onApproveReject,
    onApproveSuccess,
  } = state;

  return useCallback(async () => {
    if (!selectedSwapRoute || !address) {
      return;
    }

    setSwapState((state) => ({
      ...state,
      isApprovalWaitingForSignature: true,
      status: 'approvalWaitingForSignature',
    }));

    const trackId = onApproveStart?.(state);
    trackEvent?.({
      name: 'approve_started',
      approval_token: tokenIn.symbol,
    });
    let notifId;

    try {
      const hash = await swapActions[selectedSwapRoute.action].approve(
        { config, queryClient },
        {
          tokenIn,
          tokenOut,
          amountIn,
          estimatedRoute: selectedSwapRoute,
        },
      );
      notifId = onApproveSigned?.({ ...state, trackId });
      setSwapState((state) => ({
        ...state,
        isApprovalWaitingForSignature: false,
        isApprovalLoading: true,
        status: 'approvalWaitingForTransaction',
      }));
      if (hash) {
        const txReceipt = await waitForTransactionReceipt(config, { hash });
        queryClient.invalidateQueries();
        setSwapState((state) => ({
          ...state,
          isApprovalLoading: false,
          status: 'approvalTransactionSuccess',
        }));
        onApproveSuccess?.({
          ...state,
          txReceipt: txReceipt as unknown as TransactionReceipt,
          trackId,
          notifId,
        });
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
        setSwapState((state) => ({
          ...state,
          status: 'approvalTransactionRejected',
        }));
        onApproveReject?.({ ...state, trackId, notifId });
        trackEvent?.({
          name: 'approve_rejected',
          approval_token: tokenIn.symbol,
        });
      } else {
        setSwapState((state) => ({
          ...state,
          status: 'approvalTransactionFailure',
        }));
        onApproveFailure?.({
          ...state,
          error: error as Error,
          trackId,
          notifId,
        });
        trackEvent?.({
          name: 'approve_failed',
          approval_token: tokenIn.symbol,
          approve_error: formatError(error),
        });
      }
    }
  }, [
    address,
    amountIn,
    config,
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
  ]);
};

export const useHandleSwap = () => {
  const config = useConfig();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { value: slippage } = useSlippage();
  const [state, setSwapState] = useSwapState();
  const {
    amountIn,
    amountOut,
    selectedSwapRoute,
    tokenIn,
    tokenOut,
    swapActions,
    trackEvent,
    onSwapStart,
    onSwapSigned,
    onSwapFailure,
    onSwapReject,
    onSwapSuccess,
  } = state;

  return useCallback(async () => {
    if (!selectedSwapRoute || !address) {
      return;
    }

    setSwapState((state) => ({
      ...state,
      isSwapWaitingForSignature: true,
      status: 'swapWaitingForSignature',
    }));

    const trackId = onSwapStart?.(state);
    trackEvent?.({
      name: 'swap_started',
      swap_route: selectedSwapRoute.action,
      swap_token: tokenIn.symbol,
      swap_to: tokenOut.symbol,
      swap_amount: amountIn,
    });
    let notifId;

    try {
      const hash = await swapActions[selectedSwapRoute.action].swap(
        { config, queryClient },
        {
          tokenIn,
          tokenOut,
          amountIn,
          estimatedRoute: selectedSwapRoute,
          slippage,
          amountOut,
        },
      );
      notifId = onSwapSigned?.({ ...state, trackId });
      setSwapState((state) => ({
        ...state,
        isSwapWaitingForSignature: false,
        isSwapLoading: true,
        status: 'swapWaitingForTransaction',
      }));
      if (hash) {
        const txReceipt = await waitForTransactionReceipt(config, { hash });
        setSwapState((state) => ({
          ...state,
          isSwapLoading: false,
          status: 'swapTransactionSuccess',
        }));
        onSwapSuccess?.({
          ...state,
          txReceipt: txReceipt as unknown as TransactionReceipt,
          trackId,
          notifId,
        });
        trackEvent?.({
          name: 'swap_complete',
          swap_route: selectedSwapRoute.action,
          swap_token: tokenIn.symbol,
          swap_to: tokenOut.symbol,
          swap_amount: amountIn,
          swap_data: `${formatUnits(amountIn, tokenIn.decimals)} ${tokenIn.symbol} -> ${formatUnits(amountOut, tokenOut.decimals)} ${tokenOut.symbol} with ${selectedSwapRoute.action}`,
        });
        queryClient.invalidateQueries();
        setSwapState((state) => ({
          ...state,
          amountIn: 0n,
          amountOut: 0n,
          estimatedSwapRoutes: [],
          selectedSwapRoute: null,
        }));
      }
    } catch (error) {
      setSwapState((state) => ({
        ...state,
        isSwapWaitingForSignature: false,
        isSwapLoading: false,
      }));
      if (isUserRejected(error)) {
        setSwapState((state) => ({
          ...state,
          status: 'swapTransactionRejected',
        }));
        onSwapReject?.({ ...state, trackId, notifId });
        trackEvent?.({
          name: 'swap_rejected',
          swap_token: tokenIn.symbol,
          swap_amount: amountIn,
          swap_to: tokenOut.symbol,
          swap_route: selectedSwapRoute.action,
        });
      } else {
        setSwapState((state) => ({
          ...state,
          status: 'swapTransactionFailure',
        }));
        onSwapFailure?.({ ...state, error: error as Error, trackId, notifId });
        trackEvent?.({
          name: 'swap_failed',
          swap_token: tokenIn.symbol,
          swap_amount: amountIn,
          swap_to: tokenOut.symbol,
          swap_route: selectedSwapRoute.action,
          swap_error: formatError(error),
        });
      }
    }
  }, [
    address,
    amountIn,
    amountOut,
    config,
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
  ]);
};

export const useSwapperPrices = (currency?: SupportedCurrency) => {
  const [{ swapRoutes }] = useSwapState();
  const tokensIn = getAllAvailableTokens(swapRoutes, 'tokenIn');
  const tokensOut = getAllAvailableTokens(swapRoutes, 'tokenOut');
  const keys = uniq([
    ...tokensIn.map((t) => getTokenPriceKey(t, currency)),
    ...tokensOut.map((t) => getTokenPriceKey(t, currency)),
  ]);

  return useTokenPrices(keys);
};

export const useSwapperTargetChainId = () => {
  const { chainId } = useAccount();
  const [{ swapRoutes }] = useSwapState();

  const available = getAllAvailableChainIds(swapRoutes);

  return available.includes(chainId ?? mainnet.id) ? chainId : available[0];
};
