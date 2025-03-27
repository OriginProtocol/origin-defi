import { ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  sendTransaction,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';

import { defaultRoute } from '../defaultRoute';
import { openOceanExchangeAddresses } from './constants';
import { getQuoteOptions, getTransactionOptions } from './options';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async (
  client,
  { tokenIn, tokenOut, amountIn },
) => {
  const quote = await client.queryClient.fetchQuery(
    getQuoteOptions(tokenIn, tokenOut, amountIn),
  );

  return quote.code === 200;
};

const estimateAmount: EstimateAmount = async (
  client,
  { tokenIn, tokenOut, amountIn },
) => {
  try {
    const quote = await client.queryClient.fetchQuery(
      getQuoteOptions(tokenIn, tokenOut, amountIn),
    );

    return BigInt(quote?.data?.outAmount ?? 0);
  } catch {}
  return 0n;
};

const estimateRoute: EstimateRoute = async (
  client,
  { tokenIn, tokenOut, amountIn, route },
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

  const quote = await client.queryClient.fetchQuery(
    getQuoteOptions(tokenIn, tokenOut, amountIn),
  );

  const estimatedRoute = {
    ...route,
    estimatedAmount: BigInt(quote?.data?.outAmount ?? 0),
    gas: BigInt(quote?.data?.estimatedGas ?? 0),
    approvalGas: 0n,
    allowanceAmount: 0n,
    rate:
      +formatUnits(BigInt(quote?.data?.outAmount ?? 0), tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };

  const [allowanceAmount, approvalGas] = await Promise.all([
    allowance(client, {
      tokenIn,
      tokenOut,
      estimatedRoute,
    }),
    estimateApprovalGas(client, {
      amountIn,
      tokenIn,
      tokenOut,
      estimatedRoute,
    }),
  ]);

  return {
    ...estimatedRoute,
    allowanceAmount,
    approvalGas,
  };
};

const allowance: Allowance = async ({ config }, { tokenIn }) => {
  const { address } = getAccount(config);
  const spender = openOceanExchangeAddresses[tokenIn.chainId];
  if (!address || !tokenIn.address || !spender) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, spender],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { amountIn, tokenIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const spender = openOceanExchangeAddresses[tokenIn.chainId];
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (
    amountIn === 0n ||
    !address ||
    !publicClient ||
    !tokenIn?.address ||
    !spender
  ) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [spender, amountIn],
      account: address ?? ZERO_ADDRESS,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const approve: Approve = async ({ config }, { tokenIn, amountIn }) => {
  const spender = openOceanExchangeAddresses[tokenIn.chainId];
  if (!tokenIn?.address || !spender) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [spender, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { amountIn, tokenIn, tokenOut, slippage },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address) {
    return null;
  }

  const tx = await queryClient.fetchQuery(
    getTransactionOptions(address, tokenIn, tokenOut, amountIn, slippage),
  );

  const hash = await sendTransaction(config, {
    to: tx.data.to,
    data: tx.data.data,
    chainId: tx.data.chainId,
    gasPrice: BigInt(tx.data.gasPrice),
    value: BigInt(tx.data.value),
    account: address,
  });

  return hash;
};

export const openOcean = {
  ...defaultRoute,
  isRouteAvailable,
  estimateAmount,
  estimateApprovalGas,
  allowance,
  estimateRoute,
  approve,
  swap,
};
