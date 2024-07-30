import { tokens, whales } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import {
  getAccount,
  getPublicClient,
  readContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async ({ config }, { amountIn }) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract(config, {
    address: tokens.mainnet.wOUSD.address,
    abi: tokens.mainnet.wOUSD.abi,
    functionName: 'convertToAssets',
    args: [amountIn],
    chainId: tokens.mainnet.wOUSD.chainId,
  });

  return data;
};

const estimateGas: EstimateGas = async ({ config }, { amountIn }) => {
  let gasEstimate = 0n;

  const publicClient = getPublicClient(config, {
    chainId: tokens.mainnet.wOUSD.chainId,
  });

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  if (address) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: tokens.mainnet.wOUSD.address,
        abi: tokens.mainnet.wOUSD.abi,
        functionName: 'redeem',
        args: [amountIn, address, address],
        account: address,
      });

      return gasEstimate;
    } catch {}
  }

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: tokens.mainnet.wOUSD.address,
      abi: tokens.mainnet.wOUSD.abi,
      functionName: 'redeem',
      args: [amountIn, whales.mainnet.wOUSD, whales.mainnet.wOUSD],
      account: whales.mainnet.wOUSD,
    });
  } catch {
    gasEstimate = 21000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async () => {
  // Unwrap wOUSD does not require approval
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  // Unwrap wOUSD does not require approval
  return 0n;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route, slippage },
) => {
  if (amountIn === 0n) {
    return {
      ...route,
      estimatedAmount: 0n,
      gas: 0n,
      rate: 0,
      allowanceAmount: 0n,
      approvalGas: 0n,
    };
  }

  const [estimatedAmount, gas, allowanceAmount, approvalGas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn }),
      estimateGas(config, { tokenIn, tokenOut, amountIn, slippage }),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { tokenIn, tokenOut, amountIn }),
    ]);

  return {
    ...route,
    estimatedAmount,
    gas,
    approvalGas,
    allowanceAmount,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const approve: Approve = async () => {
  // Unwrap wOUSD does not require approval
  return null;
};

const swap: Swap = async ({ config }, { amountIn }) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address) {
    return null;
  }

  const { request } = await simulateContractWithTxTracker(config, {
    address: tokens.mainnet.wOUSD.address,
    abi: tokens.mainnet.wOUSD.abi,
    functionName: 'redeem',
    args: [amountIn, address, address],
    chainId: tokens.mainnet.wOUSD.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const unwrapOusdWousd = {
  ...defaultRoute,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
