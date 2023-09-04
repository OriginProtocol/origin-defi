import { useCallback, useMemo } from 'react';

import { isNilOrEmpty } from '@origin/shared/utils';
import { produce } from 'immer';

import { useSwapState } from './state';
import {
  getAllAvailableTokens,
  getAvailableRoutes,
  getAvailableTokensForSource,
} from './utils';

import type { Token } from '@origin/shared/contracts';

import type { TokenSource } from './types';

export const useHandleAmountInChange = () => {
  const [, setSwapState] = useSwapState();

  return useCallback(
    (amount: bigint) => {
      setSwapState(
        produce((state) => {
          state.amountIn = amount;
          state.amountOut = 0n;
          state.isAmountOutLoading = true;
          state.isPriceOutLoading = true;
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
          // TODO compute best route
          state.swapRoute = getAvailableRoutes(
            state.tokenIn,
            state.tokenOut,
          )[0];
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
      produce((draft) => {
        draft.amountIn = 0n;
        draft.amountOut = 0n;
        const oldTokenOut = draft.tokenOut;
        draft.tokenOut = draft.tokenIn;
        draft.tokenIn = oldTokenOut;
      }),
    );
  }, [setSwapState]);
};

export const useHandleSwap = () => {
  const [{ swapRoute }] = useSwapState();

  return useCallback(async () => {
    if (isNilOrEmpty(swapRoute)) {
      return;
    }
  }, [swapRoute]);
};
