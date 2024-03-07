import { contracts } from '@origin/shared/contracts';
import { getReferrerId } from '@origin/shared/providers';
import { isNilOrEmpty, subtractSlippage } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256, parseEther } from 'viem';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async (config) => {
  const publicClient = getPublicClient(config);

  if (!publicClient) {
    return false;
  }

  try {
    await publicClient.simulateContract({
      address: contracts.mainnet.PrimeETHZapper.address,
      abi: contracts.mainnet.PrimeETHZapper.abi,
      functionName: 'deposit',
      args: [0n, ''],
      value: parseEther('1'),
    });

    return true;
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (config, { amountIn }) => {
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !publicClient) {
    return 0n;
  }

  const estimate = await publicClient.simulateContract({
    address: contracts.mainnet.PrimeETHZapper.address,
    abi: contracts.mainnet.PrimeETHZapper.abi,
    functionName: 'deposit',
    args: [0n, ''],
    value: amountIn,
  });

  return estimate?.result;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route, slippage },
) => {
  const [estimatedAmount, allowanceAmount] = await Promise.all([
    estimateAmount(config, { tokenIn, tokenOut, amountIn }),
    allowance(config, { tokenIn, tokenOut }),
  ]);

  return {
    ...route,
    estimatedAmount,
    allowanceAmount,
    approvalGas: 0n,
    gas: 0n,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const allowance: Allowance = async (config, { tokenIn }) => {
  return maxUint256;
};

const approve: Approve = async (config, { tokenIn, amountIn }) => {
  return null;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);
  const referrerId = getReferrerId();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const { request } = await simulateContract(config, {
    address: contracts.mainnet.PrimeETHZapper.address,
    abi: contracts.mainnet.PrimeETHZapper.abi,
    functionName: 'deposit',
    args: [minAmountOut, referrerId ?? ''],
    value: amountIn,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export default {
  isRouteAvailable,
  estimateAmount,
  estimateRoute,
  allowance,
  approve,
  swap,
};
