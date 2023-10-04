import { contracts, whales } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits } from 'viem';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';

const estimateAmount: EstimateAmount = async ({ amountIn }) => {
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

const estimateGas: EstimateGas = async ({ amountIn }) => {
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
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.WOETH.address,
      abi: contracts.mainnet.WOETH.abi,
      functionName: 'deposit',
      args: [amountIn, whales.mainnet.OETH],
      account: whales.mainnet.OETH,
    });
  } catch {
    console.log(`Wrap OETH uses fix gas estimate: 0`);
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ tokenIn }) => {
  const { address } = getAccount();

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, contracts.mainnet.WOETH.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async ({
  tokenIn,
  amountIn,
}) => {
  let approvalEstimate = 0n;
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient();

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [contracts.mainnet.WOETH.address, amountIn],
      account: address,
    });
  } catch {
    console.log(`Wrap OETH uses fix approval gas estimate: 0`);
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

const approve: Approve = async ({ tokenIn, amountIn }) => {
  const { request } = await prepareWriteContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [contracts.mainnet.WOETH.address, amountIn],
  });
  const { hash } = await writeContract(request);

  return hash;
};

const swap: Swap = async ({ tokenIn, tokenOut, amountIn }) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance({ tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Wrap OETH is not approved`);
  }

  const { request } = await prepareWriteContract({
    address: contracts.mainnet.WOETH.address,
    abi: contracts.mainnet.WOETH.abi,
    functionName: 'deposit',
    args: [amountIn, address],
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
