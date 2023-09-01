import curve from '@curvefi/api';
import { isNilOrEmpty } from '@origin/shared/utils';

import { getAvailableRoutes } from '../utils';

import type { SwapApi, SwapState } from '../types';

const ETHOETHCurvePool = 'factory-v2-298';
const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const estimateAmount = async ({ tokenIn, tokenOut, amountIn }: SwapState) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const bals = await curve.router.getBestRouteAndOutput(
    tokenIn.address ?? ETH,
    tokenOut.address ?? ETH,
    amountIn.toString(),
  );

  console.groupCollapsed('Curve');
  console.log(curve.getPool(ETHOETHCurvePool));
  console.log(bals);
  console.groupEnd();

  return amountIn;
};

const estimateRoutes = async ({ tokenIn, tokenOut, amountIn }: SwapState) => {
  if (amountIn === 0n) {
    return [];
  }

  return getAvailableRoutes(tokenIn, tokenOut);
};

const swap = async ({ tokenIn, tokenOut, amountIn, swapRoute }: SwapState) => {
  if (amountIn === 0n || isNilOrEmpty(swapRoute)) {
    return;
  }
};

export default {
  estimateAmount,
  estimateRoutes,
  swap,
} as Partial<SwapApi>;
