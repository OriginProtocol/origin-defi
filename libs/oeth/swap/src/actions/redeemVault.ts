import type { SwapApi, SwapState } from '../types';

const estimateAmount = async ({ tokenIn, tokenOut, amountIn }: SwapState) => {
  if (amountIn === 0n) {
    return 0n;
  }

  return amountIn * 2n;
};

export default {
  estimateAmount,
} as Partial<SwapApi>;
