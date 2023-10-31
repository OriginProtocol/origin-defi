import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

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

const estimateAmount: EstimateAmount = async ({ amountIn }) => {
  return amountIn;
};

const estimateGas: EstimateGas = async ({ amountIn }) => {
  let gasEstimate = 200000n;

  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return gasEstimate;
  }

  const publicClient = getPublicClient();

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

const allowance: Allowance = async ({ tokenIn, tokenOut }) => {
  const { address } = getAccount();

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    return maxUint256;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHZapper.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async ({
  tokenIn,
  tokenOut,
  amountIn,
}) => {
  let approvalEstimate = 0n;
  const { address } = getAccount();

  if (
    amountIn === 0n ||
    isNilOrEmpty(address) ||
    isNilOrEmpty(tokenIn.address) ||
    isNilOrEmpty(tokenOut.address)
  ) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient();

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [contracts.mainnet.OETHZapper.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
}) => {
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
      estimateAmount({ tokenIn, tokenOut, amountIn }),
      estimateGas({ tokenIn, tokenOut, amountIn, slippage }),
      allowance({ tokenIn, tokenOut }),
      estimateApprovalGas({ tokenIn, tokenOut, amountIn }),
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

const approve: Approve = async ({ tokenIn, tokenOut, amountIn, curve }) => {
  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    return null;
  }

  const gas = await estimateApprovalGas({
    amountIn,
    tokenIn,
    tokenOut,
    curve,
  });

  const { request } = await prepareWriteContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [contracts.mainnet.OETHZapper.address, amountIn],
    gas,
  });
  const { hash } = await writeContract(request);

  return hash;
};

const swap: Swap = async ({ tokenIn, tokenOut, amountIn, slippage }) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance({ tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Swap zapper is not approved`);
  }

  const estimatedGas = await estimateGas({
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await prepareWriteContract({
    address: contracts.mainnet.OETHZapper.address,
    abi: contracts.mainnet.OETHZapper.abi,
    functionName: 'deposit',
    value: amountIn,
    gas,
  });
  const { hash } = await writeContract(request);

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
