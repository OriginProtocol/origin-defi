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
  console.log('Amount estimation not implemented');

  return amountIn;
};

const estimateGas: EstimateGas = async (
  _tokenIn,
  _tokenOut,
  _amountIn,
  _slippage,
) => {
  console.log('Gas estimation not implemented');

  return 0n;
};

const estimateRoute: EstimateRoute = async (
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
) => {
  if (amountIn === 0n) {
    return { ...route, estimatedAmount: 0n, gas: 0n, rate: 0 };
  }

  const [estimatedAmount, gas] = await Promise.all([
    estimateAmount(tokenIn, tokenOut, amountIn),
    estimateGas(tokenIn, tokenOut, amountIn, slippage),
  ]);

  return { ...route, estimatedAmount, gas, rate: 0 };
};

const swap: Swap = async (
  _tokenIn,
  _tokenOut,
  _amountIn,
  _route,
  _slippage,
) => {
  console.log('Route swap operation not implemented');
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  swap,
};
