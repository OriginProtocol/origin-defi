import { useCallback, useMemo } from 'react';

import { Box } from '@mui/material';
import {
  ApprovalNotification,
  SwapNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '@origin/oeth/shared';
import { NotificationSnack } from '@origin/shared/components';
import {
  useCurve,
  usePushNotification,
  useSlippage,
} from '@origin/shared/providers';
import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { waitForTransaction } from '@wagmi/core';
import { produce } from 'immer';
import { useIntl } from 'react-intl';
import { useAccount, useQueryClient as useWagmiClient } from 'wagmi';

import { swapActions } from './actions';
import { useSwapState } from './state';
import { getAllAvailableTokens, getAvailableTokensForSource } from './utils';

import type { Token } from '@origin/shared/contracts';

import type { EstimatedSwapRoute, SwapRoute, TokenSource } from './types';

export const useHandleAmountInChange = () => {
  const [, setSwapState] = useSwapState();

  return useCallback(
    (amount: bigint) => {
      setSwapState(
        produce((state) => {
          if (state.amountIn !== amount) {
            state.amountIn = amount;
            state.isSwapRoutesLoading = amount !== 0n;
          }
        }),
      );
    },
    [setSwapState],
  );
};

export const useTokenOptions = () => {
  const [{ tokenIn, tokenOut }] = useSwapState();
  const tokensIn = getAllAvailableTokens('tokenIn');
  const tokensOut = getAllAvailableTokens('tokenOut');
  const availableTokensIn = getAvailableTokensForSource('tokenOut', tokenOut);
  const availableTokensOut = getAvailableTokensForSource('tokenIn', tokenIn);

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
  const [, setSwapState] = useSwapState();

  return useCallback(
    (source: TokenSource, token: Token) => {
      setSwapState(
        produce((state) => {
          if (source === 'tokenIn') {
            state.tokenIn = token;
            const availableTokensOut = getAvailableTokensForSource(
              'tokenIn',
              token,
            );
            const found = availableTokensOut.find(
              (t) => t.symbol === state.tokenOut.symbol,
            );
            if (isNilOrEmpty(found)) {
              state.tokenOut = availableTokensOut[0];
            }
          } else {
            state.tokenOut = token;
            const availableTokensIn = getAvailableTokensForSource(
              'tokenOut',
              token,
            );
            const found = availableTokensIn.find(
              (t) => t.symbol === state.tokenIn.symbol,
            );
            if (isNilOrEmpty(found)) {
              state.tokenIn = availableTokensIn[0];
            }
          }
          state.amountIn = 0n;
          state.amountOut = 0n;
          state.swapRoutes = [];
          state.selectedSwapRoute = null;
        }),
      );
    },
    [setSwapState],
  );
};

export const useHandleTokenFlip = () => {
  const [, setSwapState] = useSwapState();

  return useCallback(() => {
    setSwapState(
      produce((state) => {
        state.amountIn = 0n;
        state.amountOut = 0n;
        const oldTokenOut = state.tokenOut;
        state.tokenOut = state.tokenIn;
        state.tokenIn = oldTokenOut;
        state.swapRoutes = [];
        state.selectedSwapRoute = null;
      }),
    );
  }, [setSwapState]);
};

export const useHandleSelectSwapRoute = () => {
  const [, setSwapState] = useSwapState();

  return useCallback(
    (route: EstimatedSwapRoute) => {
      setSwapState(
        produce((state) => {
          state.selectedSwapRoute = route;
          state.amountOut = route.estimatedAmount;
        }),
      );
    },
    [setSwapState],
  );
};

export const useSwapRouteAllowance = (route: SwapRoute) => {
  const curve = useCurve();

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
          curve,
        });
      } catch {}

      return res;
    },
    enabled: !isNilOrEmpty(route),
    placeholderData: 0n,
  });
};

export const useHandleApprove = () => {
  const intl = useIntl();
  const { address } = useAccount();
  const curve = useCurve();
  const queryClient = useQueryClient();
  const wagmiClient = useWagmiClient();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const [
    { amountIn, amountOut, selectedSwapRoute, tokenIn, tokenOut },
    setSwapState,
  ] = useSwapState();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute) || isNilOrEmpty(address)) {
      return;
    }

    setSwapState(
      produce((draft) => {
        draft.isApprovalWaitingForSignature = true;
      }),
    );
    const activity = pushActivity({
      tokenIn,
      tokenOut,
      type: 'approval',
      status: 'pending',
      amountIn,
      amountOut,
    });
    try {
      const hash = await swapActions[selectedSwapRoute.action].approve({
        tokenIn,
        tokenOut,
        amountIn,
        curve,
      });
      setSwapState(
        produce((draft) => {
          draft.isApprovalWaitingForSignature = false;
          draft.isApprovalLoading = true;
        }),
      );
      if (!isNilOrEmpty(hash)) {
        const txReceipt = await waitForTransaction({ hash });
        wagmiClient.invalidateQueries({
          queryKey: ['swap_balance'],
        });
        queryClient.invalidateQueries({
          queryKey: ['swap_allowance'],
        });
        updateActivity({ ...activity, status: 'success', txReceipt });
        pushNotification({
          content: (
            <ApprovalNotification
              {...activity}
              status="success"
              txReceipt={txReceipt}
            />
          ),
        });
        setSwapState(
          produce((draft) => {
            draft.isApprovalLoading = false;
          }),
        );
      }
    } catch (error) {
      setSwapState(
        produce((draft) => {
          draft.isApprovalWaitingForSignature = false;
          draft.isApprovalLoading = false;
        }),
      );
      if (isUserRejected(error)) {
        deleteActivity(activity.id);
        pushNotification({
          content: (
            <NotificationSnack
              icon={<Box component="img" src="/images/warn.png" />}
              title={intl.formatMessage({
                defaultMessage: 'Operation Cancelled',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'User rejected operation',
              })}
            />
          ),
        });
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: error?.shortMessage ?? error.message,
        });
        pushNotification({
          content: (
            <ApprovalNotification
              {...activity}
              status="error"
              error={error?.shortMessage ?? error.message}
            />
          ),
        });
      }
    }
  }, [
    address,
    amountIn,
    amountOut,
    curve,
    deleteActivity,
    intl,
    pushActivity,
    pushNotification,
    queryClient,
    selectedSwapRoute,
    setSwapState,
    tokenIn,
    tokenOut,
    updateActivity,
    wagmiClient,
  ]);
};

export const useHandleSwap = () => {
  const intl = useIntl();
  const { value: slippage } = useSlippage();
  const { address } = useAccount();
  const curve = useCurve();
  const queryClient = useQueryClient();
  const wagmiClient = useWagmiClient();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const [
    { amountIn, amountOut, selectedSwapRoute, tokenIn, tokenOut },
    setSwapState,
  ] = useSwapState();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute) || isNilOrEmpty(address)) {
      return;
    }

    const activity = pushActivity({
      tokenIn,
      tokenOut,
      type: 'swap',
      status: 'pending',
      amountIn,
      amountOut,
    });
    setSwapState(
      produce((draft) => {
        draft.isSwapWaitingForSignature = true;
      }),
    );
    try {
      const hash = await swapActions[selectedSwapRoute.action].swap({
        tokenIn,
        tokenOut,
        amountIn,
        estimatedRoute: selectedSwapRoute,
        slippage,
        amountOut,
        curve,
      });
      setSwapState(
        produce((draft) => {
          draft.isSwapWaitingForSignature = false;
          draft.isSwapLoading = true;
        }),
      );
      if (!isNilOrEmpty(hash)) {
        const txReceipt = await waitForTransaction({ hash });
        wagmiClient.invalidateQueries({
          queryKey: ['swap_balance'],
        });
        queryClient.invalidateQueries({
          queryKey: ['swap_allowance'],
        });
        setSwapState(
          produce((draft) => {
            draft.isSwapLoading = false;
          }),
        );
        pushNotification({
          content: (
            <SwapNotification
              {...activity}
              status="success"
              txReceipt={txReceipt}
            />
          ),
        });
        updateActivity({ ...activity, status: 'success', txReceipt });
      }
    } catch (error) {
      setSwapState(
        produce((draft) => {
          draft.isSwapWaitingForSignature = false;
          draft.isSwapLoading = false;
        }),
      );
      if (isUserRejected(error)) {
        deleteActivity(activity.id);
        pushNotification({
          content: (
            <NotificationSnack
              icon={<Box component="img" src="/images/warn.png" />}
              title={intl.formatMessage({
                defaultMessage: 'Operation Cancelled',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'User rejected operation',
              })}
            />
          ),
        });
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: error.shortMessage,
        });
        pushNotification({
          content: (
            <SwapNotification
              {...activity}
              status="error"
              error={error.shortMessage}
            />
          ),
        });
      }
    }
  }, [
    address,
    amountIn,
    amountOut,
    curve,
    deleteActivity,
    intl,
    pushActivity,
    pushNotification,
    queryClient,
    selectedSwapRoute,
    setSwapState,
    slippage,
    tokenIn,
    tokenOut,
    updateActivity,
    wagmiClient,
  ]);
};
