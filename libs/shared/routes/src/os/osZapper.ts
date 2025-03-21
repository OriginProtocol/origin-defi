import { contracts } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';

import { GAS_BUFFER } from '../constants';
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

const estimateAmount: EstimateAmount = async (config, { amountIn }) => {
  return amountIn;
};

const estimateGas: EstimateGas = async ({ config }, { amountIn }) => {
  let gasEstimate = 200000n;

  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, {
    chainId: contracts.sonic.osZapper.chainId,
  });

  if (amountIn === 0n || !address || !publicClient) {
    return gasEstimate;
  }

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.sonic.osZapper.address,
      abi: contracts.sonic.osZapper.abi,
      functionName: 'deposit',
      value: amountIn,
      account: address,
    });
  } catch {}

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (!address) {
    return 0n;
  }

  if (!tokenIn?.address || !tokenOut?.address) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.sonic.osZapper.address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (
    amountIn === 0n ||
    !address ||
    !tokenIn?.address ||
    !tokenOut?.address ||
    !publicClient
  ) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.sonic.osZapper.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
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

const approve: Approve = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  if (!tokenIn?.address || !tokenOut?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.sonic.osZapper.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, estimatedRoute },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const estimatedGas =
    estimatedRoute?.gas ??
    (await estimateGas(
      { config, queryClient },
      {
        tokenIn,
        tokenOut,
        amountIn,
        slippage,
      },
    ));
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.sonic.osZapper.address,
    abi: contracts.sonic.osZapper.abi,
    functionName: 'deposit',
    value: amountIn,
    gas,
    chainId: contracts.sonic.osZapper.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const osZapper = {
  ...defaultRoute,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
