import curve from '@curvefi/api';
import { isNilOrEmpty } from '@origin/shared/utils';
import { formatUnits, parseUnits } from 'viem';

import { getAvailableRoutes } from '../utils';

import type { SwapApi, SwapState } from '../types';

const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const estimateAmount = async ({ tokenIn, tokenOut, amountIn }: SwapState) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const routes = await curve.router.getBestRouteAndOutput(
    tokenIn?.address ?? ETH,
    tokenOut?.address ?? ETH,
    formatUnits(amountIn, tokenIn.decimals),
  );

  return parseUnits(routes.output, tokenOut.decimals);
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
