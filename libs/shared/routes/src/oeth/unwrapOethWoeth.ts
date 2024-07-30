import { tokens, whales } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import {
  getAccount,
  getPublicClient,
  readContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async (config, { amountIn }) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract(config, {
    address: tokens.mainnet.wOETH.address,
    abi: tokens.mainnet.wOETH.abi,
    functionName: 'convertToAssets',
    args: [amountIn],
    chainId: tokens.mainnet.wOETH.chainId,
  });

  return data as unknown as bigint;
};

const estimateGas: EstimateGas = async (config, { amountIn }) => {
  let gasEstimate = 0n;

  const publicClient = getPublicClient(config, {
    chainId: tokens.mainnet.wOETH.chainId,
  });

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  if (address) {
    try {
      gasEstimate =
        (await publicClient?.estimateContractGas({
          address: tokens.mainnet.wOETH.address,
          abi: tokens.mainnet.wOETH.abi,
          functionName: 'redeem',
          args: [amountIn, address, address],
          account: address,
        })) ?? 0n;

      return gasEstimate;
    } catch {}
  }

  try {
    gasEstimate =
      (await publicClient?.estimateContractGas({
        address: tokens.mainnet.wOETH.address,
        abi: tokens.mainnet.wOETH.abi,
        functionName: 'redeem',
        args: [amountIn, whales.mainnet.wOETH, whales.mainnet.wOETH],
        account: whales.mainnet.wOETH,
      })) ?? 21000n;
  } catch {
    gasEstimate = 21000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async () => {
  // Unwrap wOETH does not require approval
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  // Unwrap wOETH does not require approval
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
      estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
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
  // Unwrap wOETH does not require approval
  return null;
};

const swap: Swap = async (config, { amountIn }) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address) {
    return null;
  }

  const { request } = await simulateContractWithTxTracker(config, {
    address: tokens.mainnet.wOETH.address,
    abi: tokens.mainnet.wOETH.abi,
    functionName: 'redeem',
    args: [amountIn, address, address],
    chainId: tokens.mainnet.wOETH.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const unwrapOethWoeth = {
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
