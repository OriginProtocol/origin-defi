import type { EstimateAmount } from '../types';

const estimateAmount: EstimateAmount = async (tokenIn, tokenOut, amountIn) => {
  if (amountIn === 0n) {
    return 0n;
  }

  return amountIn * 2n;
};

export default {
  estimateAmount,
};
