import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { readContract } from '@wagmi/core';
import { readContracts } from 'wagmi';

import type { SwapApi, SwapState } from '../types';

const estimateAmount = async ({ tokenIn, tokenOut, amountIn }: SwapState) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract({
    address: contracts.mainnet.vault.address,
    abi: contracts.mainnet.vault.abi,
    functionName: 'priceUnitMint',
    args: [tokenOut.address ?? tokens.mainnet.WETH.address],
  });

  console.log(data);

  return amountIn;
};

const estimateRoutes = async ({ tokenIn, tokenOut, amountIn }: SwapState) => {
  if (amountIn === 0n) {
    return [];
  }

  const data = await readContracts({
    contracts: [
      {
        address: contracts.mainnet.vault.address,
        abi: contracts.mainnet.vault.abi,
        functionName: 'priceUnitMint',
        args: [tokenOut.address],
      },
    ],
  });

  console.log(data);

  return [];
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
