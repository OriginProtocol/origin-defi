import { tokens, whales } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits } from 'viem';
import { base, mainnet } from 'viem/chains';

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

const wrappedTokens = {
  [mainnet.id.toString()]: tokens.mainnet.wOETH,
  [base.id.toString()]: tokens.base.wsuperOETHb,
};

const whale = {
  [mainnet.id.toString()]: whales.mainnet.OETH,
  [base.id.toString()]: whales.base.superOETHb,
};

const estimateAmount: EstimateAmount = async (
  { config },
  { amountIn, tokenIn },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract(config, {
    address: wrappedTokens[tokenIn.chainId].address,
    abi: wrappedTokens[tokenIn.chainId].abi,
    functionName: 'convertToShares',
    args: [amountIn],
    chainId: wrappedTokens[tokenIn.chainId].chainId,
  });

  return data as unknown as bigint;
};

const estimateGas: EstimateGas = async ({ config }, { amountIn, tokenIn }) => {
  let gasEstimate = 0n;

  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  if (address) {
    try {
      gasEstimate =
        (await publicClient?.estimateContractGas({
          address: wrappedTokens[tokenIn.chainId].address,
          abi: wrappedTokens[tokenIn.chainId].abi,
          functionName: 'deposit',
          args: [amountIn, address],
          account: address,
        })) ?? 0n;

      return gasEstimate;
    } catch {}
  }

  try {
    if (publicClient) {
      gasEstimate = await publicClient.estimateContractGas({
        address: wrappedTokens[tokenIn.chainId].address,
        abi: wrappedTokens[tokenIn.chainId].abi,
        functionName: 'deposit',
        args: [amountIn, whale[tokenIn.chainId]],
        account: whale[tokenIn.chainId],
      });
    }
  } catch {
    gasEstimate = 21000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, wrappedTokens[tokenIn.chainId].address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);

  if (amountIn === 0n || !address || !tokenIn?.address) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  try {
    if (publicClient) {
      approvalEstimate = await publicClient?.estimateContractGas({
        address: tokenIn.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [wrappedTokens[tokenIn.chainId].address, amountIn],
        account: address,
      });
    }
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

const approve: Approve = async ({ config }, { tokenIn, amountIn }) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [wrappedTokens[tokenIn.chainId].address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`Wrap OETH is not approved`);
  }

  const { request } = await simulateContractWithTxTracker(config, {
    address: wrappedTokens[tokenIn.chainId].address,
    abi: wrappedTokens[tokenIn.chainId].abi,
    functionName: 'deposit',
    args: [amountIn, address],
    chainId: wrappedTokens[tokenIn.chainId].chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const wrapOethWoeth = {
  ...defaultRoute,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
