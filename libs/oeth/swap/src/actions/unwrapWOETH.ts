import { contracts, whales } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
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
} from '../types';

const estimateAmount: EstimateAmount = async ({ amountIn }) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract({
    address: contracts.mainnet.WOETH.address,
    abi: contracts.mainnet.WOETH.abi,
    functionName: 'convertToAssets',
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
        functionName: 'redeem',
        args: [amountIn, address, address],
        account: address,
      });

      return gasEstimate;
    } catch {}
  }

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.WOETH.address,
      abi: contracts.mainnet.WOETH.abi,
      functionName: 'redeem',
      args: [amountIn, whales.mainnet.WOETH, whales.mainnet.WOETH],
      account: whales.mainnet.WOETH,
    });
  } catch {
    console.log(`Unwrap WOETH uses fix gas estimate: 0`);
  }

  return gasEstimate;
};

const allowance: Allowance = async () => {
  // Unwrap WOETH does not require approval
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  // Unwrap WOETH does not require approval
  console.log(`Unwrap WOETH uses fix gas estimate: 0`);
  return 0n;
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
      allowance(),
      estimateApprovalGas(),
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
  // Unwrap WOETH does not require approval
  return null;
};

const swap: Swap = async ({ amountIn }) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const { request } = await prepareWriteContract({
    address: contracts.mainnet.WOETH.address,
    abi: contracts.mainnet.WOETH.abi,
    functionName: 'redeem',
    args: [amountIn, address, address],
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
