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

const estimateGas: EstimateGas = async (config, { amountIn }) => {
  let gasEstimate = 200000n;

  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return gasEstimate;
  }

  const publicClient = getPublicClient(config);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OETHZapper.address,
      abi: contracts.mainnet.OETHZapper.abi,
      functionName: 'deposit',
      value: amountIn,
      account: address,
    });
  } catch {}

  return gasEstimate;
};

const allowance: Allowance = async (config, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHZapper.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, tokenOut, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);

  if (
    amountIn === 0n ||
    isNilOrEmpty(address) ||
    isNilOrEmpty(tokenIn.address) ||
    isNilOrEmpty(tokenOut.address)
  ) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config);

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [contracts.mainnet.OETHZapper.address, amountIn],
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
  config,
  { tokenIn, tokenOut, amountIn, curve },
) => {
  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contracts.mainnet.OETHZapper.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Swap zapper is not approved`);
  }

  const estimatedGas = await estimateGas(config, {
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.OETHZapper.address,
    abi: contracts.mainnet.OETHZapper.abi,
    functionName: 'deposit',
    value: amountIn,
    gas,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
