/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { queryClient } from '@origin/prime/shared';
import { contracts } from '@origin/shared/contracts';
import { prepareWriteContractWithTxTracker } from '@origin/shared/providers';
import { isNilOrEmpty, subtractSlippage } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  readContracts,
  writeContract,
} from '@wagmi/core';
import { formatUnits } from 'viem';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async ({
  amountIn,
  tokenIn,
  tokenOut,
}) => {
  const [primeETHPrice, assetPrice] = await queryClient.fetchQuery({
    queryKey: ['asset-price', tokenOut.address],
    queryFn: () =>
      readContracts({
        contracts: [
          {
            address: contracts.mainnet.lrtOracle.address,
            abi: contracts.mainnet.lrtOracle.abi,
            functionName: 'primeETHPrice',
          },
          {
            address: contracts.mainnet.lrtOracle.address,
            abi: contracts.mainnet.lrtOracle.abi,
            functionName: 'getAssetPrice',
            args: [tokenIn.address],
          },
        ],
      }),
    staleTime: 60e3,
  });

  return ((assetPrice.result ?? 1n) * amountIn) / (primeETHPrice.result ?? 1n);
};

const estimateGas = async ({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
}) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const publicClient = getPublicClient();
  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.lrtDepositPool.address,
      abi: contracts.mainnet.lrtDepositPool.abi,
      functionName: 'depositAsset',
      args: [tokenIn.address, amountIn, minAmountOut, 'Origin'],
    });
  } catch {}

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
}) => {
  const [estimatedAmount, allowanceAmount] = await Promise.all([
    estimateAmount({ tokenIn, tokenOut, amountIn }),
    allowance({ tokenIn, tokenOut }),
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

const allowance: Allowance = async ({ tokenIn }) => {
  const { address } = getAccount();

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await queryClient.fetchQuery({
    queryKey: ['allowance', tokenIn.symbol],
    queryFn: () =>
      readContract({
        address: tokenIn.address,
        abi: tokenIn.abi,
        functionName: 'allowance',
        args: [address, contracts.mainnet.lrtDepositPool.address],
      }),
    staleTime: 15e3,
  });

  return allowance as unknown as bigint;
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
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.lrtDepositPool, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async ({ tokenIn, tokenOut, amountIn }) => {
  const { request } = await prepareWriteContract({
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.lrtDepositPool.address, amountIn],
  });
  const { hash } = await writeContract(request);

  return hash;
};

const swap: Swap = async ({
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  amountOut,
}) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance({ tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Flipper is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const { request } = await prepareWriteContractWithTxTracker({
    address: contracts.mainnet.lrtDepositPool.address,
    abi: contracts.mainnet.lrtDepositPool.abi,
    functionName: 'depositAsset',
    args: [tokenIn.address, amountIn, minAmountOut, 'Origin'],
  });
  const { hash } = await writeContract(request);

  return hash;
};

export default {
  estimateAmount,
  estimateRoute,
  allowance,
  approve,
  swap,
};
