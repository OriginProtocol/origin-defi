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
    functionName: 'convertToShares',
    args: [amountIn],
  });

  return data as unknown as bigint;
};

const estimateGas: EstimateGas = async (config, { amountIn }) => {
  let gasEstimate = 0n;

  const publicClient = getPublicClient(config);

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
        address: tokens.mainnet.wOETH.address,
        abi: tokens.mainnet.wOETH.abi,
        functionName: 'deposit',
        args: [amountIn, whales.mainnet.OETH],
        account: whales.mainnet.OETH,
      });
    }
  } catch {
    gasEstimate = 21000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async (config, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, tokens.mainnet.wOETH.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);

  if (amountIn === 0n || !address || !tokenIn?.address) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config);

  try {
    if (publicClient) {
      approvalEstimate = await publicClient?.estimateContractGas({
        address: tokenIn.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [tokens.mainnet.wOETH.address, amountIn],
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
      estimateAmount(config, { tokenIn, tokenOut, amountIn, slippage }),
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

const approve: Approve = async (config, { tokenIn, amountIn }) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [tokens.mainnet.wOETH.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (config, { tokenIn, tokenOut, amountIn }) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Wrap OETH is not approved`);
  }

  const { request } = await simulateContractWithTxTracker(config, {
    address: tokens.mainnet.wOETH.address,
    abi: tokens.mainnet.wOETH.abi,
    functionName: 'deposit',
    args: [amountIn, address],
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
