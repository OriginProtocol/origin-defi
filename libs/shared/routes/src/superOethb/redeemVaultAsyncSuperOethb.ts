import { contracts, whales } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';
import type { EstimateAmount } from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async (
  config,
  { tokenIn, amountIn },
) => {
  return true;
};

const estimateAmount: EstimateAmount = async (config, { amountIn }) => {
  return amountIn;
};

const estimateGas: EstimateGas = async ({ config }, { tokenIn, amountIn }) => {
  const publicClient = getPublicClient(config, {
    chainId: contracts.base.superOETHbVault.chainId,
  });

  if (amountIn === 0n || !publicClient || !tokenIn?.address) {
    return 0n;
  }

  let requestGasEstimate = 0n;
  try {
    requestGasEstimate = await publicClient.estimateContractGas({
      address: contracts.base.superOETHbVault.address,
      abi: contracts.base.superOETHbVault.abi,
      functionName: 'requestWithdrawal',
      args: [amountIn],
      account: whales.base.superOETHb,
    });
  } catch {
    requestGasEstimate = 161_000n;
  }

  return requestGasEstimate + 113_010n;
};

const allowance: Allowance = async (config, { tokenIn }) => {
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn },
) => {
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

  const [estimatedAmount, allowanceAmount, approvalGas, gas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn }),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
      estimateGas(config, {
        tokenIn,
        tokenOut,
        amountIn,
        slippage,
      }),
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

const approve: Approve = async (config, { tokenIn, tokenOut, amountIn }) => {
  return null;
};

const swap: Swap = async ({ config }, { amountIn }) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: contracts.base.superOETHbVault.address,
    abi: contracts.base.superOETHbVault.abi,
    functionName: 'requestWithdrawal',
    args: [amountIn],
    chainId: contracts.base.superOETHbVault.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const redeemVaultAsyncSuperOethb = {
  ...defaultRoute,
  isRouteAvailable,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
