import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { getAccount, getPublicClient, readContract } from '@wagmi/core';
import { formatUnits } from 'viem';

import type { EstimateGas, EstimateRoute } from '../types';
import type { EstimateAmount } from '../types';

const estimateAmount: EstimateAmount = async (tokenIn, _tokenOut, amountIn) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract({
    address: contracts.mainnet.OETHVaultCore.address,
    abi: contracts.mainnet.OETHVaultCore.abi,
    functionName: 'priceUnitMint',
    args: [tokenIn.address],
  });

  return amountIn * data;
};

const estimateGas: EstimateGas = async (
  _tokenIn,
  _tokenOut,
  amountIn,
  slippage,
) => {
  let gasEstimate = 0n;

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

      return gasEstimate;
    } catch {}
  }

  try {
    gasEstimate = 0n;
  } catch {}

  return gasEstimate;
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

  return {
    ...route,
    estimatedAmount,
    gas,
    rate:
      +formatUnits(amountIn, tokenIn.decimals) /
      +formatUnits(estimatedAmount, tokenOut.decimals),
  };
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
};
