import { contracts, tokens, whales } from '@origin/shared/contracts';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits } from 'viem';

import { GAS_BUFFER } from '../constants';
import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';
import type { EstimateAmount } from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async ({ config }, { amountIn }) => {
  const res = await readContract(config, {
    address: contracts.mainnet.ARMstETHWETHPool.address,
    abi: contracts.mainnet.ARMstETHWETHPool.abi,
    functionName: 'previewDeposit',
    args: [amountIn],
  });

  return res;
};

const estimateGas: EstimateGas = async ({ config }, { tokenIn, amountIn }) => {
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, {
    chainId: contracts.mainnet.ARMstETHWETHPool.chainId,
  });

  if (amountIn === 0n || !publicClient || !tokenIn?.address) {
    return 0n;
  }

  let requestGasEstimate = 0n;
  try {
    requestGasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.ARMstETHWETHPool.address,
      abi: contracts.mainnet.ARMstETHWETHPool.abi,
      functionName: 'deposit',
      args: [amountIn],
      account: address ?? whales[tokens.mainnet.WETH.id],
    });
  } catch {
    requestGasEstimate = 161_000n;
  }

  return requestGasEstimate;
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
    args: [address, contracts.mainnet.ARMstETHWETHPool.address],
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
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (amountIn === 0n || !address || !tokenIn?.address || !publicClient) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [contracts.mainnet.ARMstETHWETHPool.address, amountIn],
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

  const [estimatedAmount, allowanceAmount, approvalGas, gas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn }),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
      estimateGas(config, { tokenIn, amountIn, tokenOut, slippage }),
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
    args: [contracts.mainnet.ARMstETHWETHPool.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address || !tokenIn.address || !tokenOut.address) {
    return null;
  }
  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`ARM Lido pool is not approved`);
  }

  const estimatedGas = await estimateGas(
    { config, queryClient },
    {
      amountIn,
      slippage,
      tokenIn,
      tokenOut,
      amountOut,
    },
  );
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContract(config, {
    address: contracts.mainnet.ARMstETHWETHPool.address,
    abi: contracts.mainnet.ARMstETHWETHPool.abi,
    functionName: 'deposit',
    args: [amountIn],
    gas,
    chainId: contracts.mainnet.ARM.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const depositARMLido = {
  ...defaultRoute,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
