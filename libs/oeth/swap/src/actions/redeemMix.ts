import { isNilOrEmpty } from '@origin/shared/utils';

import { getAvailableRoutes } from '../utils';

import type { SwapState } from '../types';

const estimateAmount = async ({
  tokenIn,
  tokenOut,
  amountIn,
}: Pick<SwapState, 'tokenIn' | 'tokenOut' | 'amountIn'>) => {
  if (amountIn === 0n) {
    return 0n;
  }

  return amountIn;
};

const estimateRoutes = async ({
  tokenIn,
  tokenOut,
  amountIn,
}: Pick<SwapState, 'tokenIn' | 'tokenOut' | 'amountIn'>) => {
  if (amountIn === 0n) {
    return;
  }
  return getAvailableRoutes(tokenIn, tokenOut);
};

const swap = async ({
  tokenIn,
  tokenOut,
  amountIn,
  swapRoute,
}: Pick<SwapState, 'tokenIn' | 'tokenOut' | 'amountIn' | 'swapRoute'>) => {
  if (amountIn === 0n || isNilOrEmpty(swapRoute)) {
    return;
  }
};

export default {
  estimateAmount,
  estimateRoutes,
  swap,
};
