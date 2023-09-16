import { useCallback, useMemo } from 'react';

import { useCurve, usePushNotification } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useIntl } from 'react-intl';

import { swapActions } from './actions';
import { useSwapState } from './state';
import { getAllAvailableTokens, getAvailableTokensForSource } from './utils';

import type { Token } from '@origin/shared/contracts';

import type { EstimatedSwapRoute, TokenSource } from './types';

export const useHandleAmountInChange = () => {
  const [, setSwapState] = useSwapState();

  return useCallback(
    (amount: bigint) => {
      setSwapState(
        produce((state) => {
          state.amountIn = amount;
          state.isSwapRoutesLoading = amount !== 0n;
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

export const useSelectedSwapRouteAllowance = () => {
  const [{ selectedSwapRoute }] = useSwapState();
  const curve = useCurve();

  return useQuery({
    queryKey: [
      'allowance',
      selectedSwapRoute?.tokenIn.symbol,
      selectedSwapRoute?.tokenOut.symbol,
      selectedSwapRoute?.action,
    ],
    queryFn: () =>
      swapActions[selectedSwapRoute.action].allowance({
        tokenIn: selectedSwapRoute.tokenIn,
        tokenOut: selectedSwapRoute.tokenOut,
        curve,
      }),
    enabled: !isNilOrEmpty(selectedSwapRoute),
    placeholderData: 0n,
  });
};

export const useHandleSlippageChange = () => {
  const [, setSwapState] = useSwapState();

  return useCallback(
    (value: number) => {
      setSwapState(
        produce((state) => {
          state.slippage = value;
        }),
      );
    },
    [setSwapState],
  );
};

export const useHandleApprove = () => {
  const intl = useIntl();
  const curve = useCurve();
  const queryClient = useQueryClient();
  const pushNotification = usePushNotification();
  const [{ amountIn, selectedSwapRoute, tokenIn, tokenOut }, setSwapState] =
    useSwapState();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute)) {
      return;
    }

    setSwapState(
      produce((draft) => {
        draft.isApprovalLoading = true;
      }),
    );
    await swapActions[selectedSwapRoute.action].approve({
      tokenIn,
      tokenOut,
      amountIn,
      curve,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'allowance',
            selectedSwapRoute?.tokenIn.symbol,
            selectedSwapRoute?.tokenOut.symbol,
            selectedSwapRoute?.action,
          ],
        });
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Approval complete' }),
          severity: 'success',
        });
        setSwapState(
          produce((draft) => {
            draft.isApprovalLoading = false;
          }),
        );
      },
      onError: () => {
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Approval failed' }),
          severity: 'error',
        });
        setSwapState(
          produce((draft) => {
            draft.isApprovalLoading = false;
          }),
        );
      },
      onReject: () => {
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Approval cancelled' }),
          severity: 'info',
        });
        setSwapState(
          produce((draft) => {
            draft.isApprovalLoading = false;
          }),
        );
      },
    });
  }, [
    amountIn,
    curve,
    intl,
    pushNotification,
    queryClient,
    selectedSwapRoute,
    setSwapState,
    tokenIn,
    tokenOut,
  ]);
};

export const useHandleSwap = () => {
  const intl = useIntl();
  const curve = useCurve();
  const queryClient = useQueryClient();
  const pushNotification = usePushNotification();
  const [
    { amountIn, amountOut, selectedSwapRoute, slippage, tokenIn, tokenOut },
    setSwapState,
  ] = useSwapState();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute)) {
      return;
    }

    setSwapState(
      produce((draft) => {
        draft.isSwapLoading = true;
      }),
    );
    await swapActions[selectedSwapRoute.action].swap({
      tokenIn,
      tokenOut,
      amountIn,
      estimatedRoute: selectedSwapRoute,
      slippage,
      amountOut,
      curve,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'allowance',
            selectedSwapRoute?.tokenIn.symbol,
            selectedSwapRoute?.tokenOut.symbol,
            selectedSwapRoute?.action,
          ],
        });
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Swap complete' }),
          severity: 'success',
        });
        setSwapState(
          produce((draft) => {
            draft.isSwapLoading = false;
          }),
        );
      },
      onError: () => {
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Swap failed' }),
          severity: 'error',
        });
        setSwapState(
          produce((draft) => {
            draft.isSwapLoading = false;
          }),
        );
      },
      onReject: () => {
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Swap cancelled' }),
          severity: 'info',
        });
        setSwapState(
          produce((draft) => {
            draft.isSwapLoading = false;
          }),
        );
      },
    });
  }, [
    amountIn,
    amountOut,
    curve,
    intl,
    pushNotification,
    queryClient,
    selectedSwapRoute,
    setSwapState,
    slippage,
    tokenIn,
    tokenOut,
  ]);
};
