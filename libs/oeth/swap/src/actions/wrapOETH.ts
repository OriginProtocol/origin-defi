import { contracts, whales } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { getAccount, getPublicClient, readContract } from '@wagmi/core';

import type { EstimateAmount, EstimateGas, EstimateRoute } from '../types';

const estimateAmount: EstimateAmount = async (
  _tokenIn,
  _tokenOut,
  amountIn,
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract({
    address: contracts.mainnet.WOETH.address,
    abi: contracts.mainnet.WOETH.abi,
    functionName: 'convertToShares',
    args: [amountIn],
  });

  return data;
};

const estimateGas: EstimateGas = async (_tokenIn, _tokenOut, amountIn) => {
  let gasEstimate = 0n;
  let isError = false;

  const publicClient = getPublicClient();

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const { address } = getAccount();

  if (!isNilOrEmpty(address)) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.WOETH.address,
        abi: contracts.mainnet.WOETH.abi,
        functionName: 'deposit',
        args: [amountIn, address],
        account: address,
      });
    } catch {
      isError = true;
    }
  }

  if (isError) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.WOETH.address,
        abi: contracts.mainnet.WOETH.abi,
        functionName: 'deposit',
        args: [amountIn, whales.mainnet.OETH],
        account: whales.mainnet.OETH,
      });
    } catch {}
  }

  return gasEstimate;
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

  const [estimatedAmount, gas] = await Promise.all([
    estimateAmount(tokenIn, tokenOut, amountIn),
    estimateGas(tokenIn, tokenOut, amountIn),
  ]);

  return { ...route, estimatedAmount, gas, rate: 0 };
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
};
