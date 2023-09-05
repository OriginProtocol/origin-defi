import { isNilOrEmpty } from '@origin/shared/utils';

import type {
  EstimateAmount,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';

const estimateAmount: EstimateAmount = async (
  _tokenIn,
  _tokenOut,
  amountIn,
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  return amountIn;
};

const estimateGas: EstimateGas = async (_tokenIn, _tokenOut, amountIn) => {
  if (amountIn === 0n) {
    return 0n;
  }

  return 0n;
};

const estimateRoute: EstimateRoute = async (
  tokenIn,
  tokenOut,
  amountIn,
  route,
) => {
  if (amountIn === 0n) {
    return { ...route, estimatedAmount: 0n, gas: 0n, rate: 0 };
  }

  const estimatedAmount = await estimateAmount(tokenIn, tokenOut, amountIn);

  return { ...route, estimatedAmount, gas: 0n, rate: 0 };
};

const swap: Swap = async (_tokenIn, _tokenOut, amountIn, route) => {
  if (amountIn === 0n || isNilOrEmpty(route)) {
    return;
  }
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  swap,
};
