import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { readContract } from '@wagmi/core';

import { getAvailableRoutes } from '../utils';

import type { SwapApi, SwapState } from '../types';

const estimateAmount = async ({ amountIn }: SwapState) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract({
    address: contracts.mainnet.WOETH.address,
    abi: contracts.mainnet.WOETH.abi,
    functionName: 'convertToAssets',
    args: [amountIn],
  });

  return data;
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
} as SwapApi;
