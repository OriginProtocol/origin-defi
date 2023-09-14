import { useCallback, useMemo } from 'react';

import { useCurve } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { produce } from 'immer';

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
          state.isAmountOutLoading = amount !== 0n;
          state.isPriceOutLoading = amount !== 0n;
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

export const useHandleApprove = () => {
  const [{ amountIn, selectedSwapRoute, tokenIn, tokenOut }] = useSwapState();
  const curve = useCurve();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute)) {
      return;
    }

    await swapActions[selectedSwapRoute.action].approve({
      tokenIn,
      tokenOut,
      amountIn,
      curve,
    });
  }, [amountIn, curve, selectedSwapRoute, tokenIn, tokenOut]);
};

export const useHandleSwap = () => {
  const [
    { amountIn, amountOut, selectedSwapRoute, slippage, tokenIn, tokenOut },
  ] = useSwapState();
  const curve = useCurve();

  return useCallback(async () => {
    if (isNilOrEmpty(selectedSwapRoute)) {
      return;
    }

    await swapActions[selectedSwapRoute.action].swap({
      tokenIn,
      tokenOut,
      amountIn,
      estimatedRoute: selectedSwapRoute,
      slippage,
      amountOut,
      curve,
    });
  }, [
    amountIn,
    amountOut,
    curve,
    selectedSwapRoute,
    slippage,
    tokenIn,
    tokenOut,
  ]);
};
