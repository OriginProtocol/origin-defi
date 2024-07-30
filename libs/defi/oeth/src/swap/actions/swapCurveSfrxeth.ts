import { contracts, tokens } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import {
  ETH_ADDRESS_CURVE,
  isNilOrEmpty,
  subPercentage,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits } from 'viem';

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

const curveConfig = {
  routes: [
    tokens.mainnet.OETH.address,
    contracts.mainnet.OETHCurvePool.address,
    ETH_ADDRESS_CURVE,
    '0xa1f8a6807c402e4a15ef4eba36528a3fed24e577',
    tokens.mainnet.frxETH.address,
    tokens.mainnet.sfrxETH.address,
    tokens.mainnet.sfrxETH.address,
    '0x0000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000000',
    '0x0000000000000000000000000000000000000000',
  ],
  params: [
    [1n, 0n, 1n, 1n, 2n],
    [0n, 1n, 1n, 1n, 2n],
    [0n, 0n, 8n, 0n, 0n],
    [0n, 0n, 0n, 0n, 0n],
    [0n, 0n, 0n, 0n, 0n],
  ],
} as const;

const estimateAmount: EstimateAmount = async (config, { amountIn }) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const amountOut = await readContract(config, {
    address: contracts.mainnet.CurveRouter.address,
    abi: contracts.mainnet.CurveRouter.abi,
    functionName: 'get_dy',
    args: [curveConfig.routes, curveConfig.params, amountIn],
    chainId: contracts.mainnet.CurveRouter.chainId,
  });

  return amountOut as unknown as bigint;
};

const estimateGas: EstimateGas = async (
  config,
  { tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, {
    chainId: contracts.mainnet.CurveRouter.chainId,
  });

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.CurveRouter.address,
      abi: contracts.mainnet.CurveRouter.abi,
      functionName: 'exchange',
      args: [curveConfig.routes, curveConfig.params, amountIn, minAmountOut[0]],
      account: address ?? ETH_ADDRESS_CURVE,
    });
  } catch (e) {
    gasEstimate = 350000n;
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
    args: [address, contracts.mainnet.CurveRouter.address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
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
      args: [contracts.mainnet.CurveRouter.address, amountIn],
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

  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount(config, { tokenIn, tokenOut, amountIn }),
    allowance(config, { tokenIn, tokenOut }),
    estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(config, {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut: estimatedAmount,
    slippage,
  });

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
    args: [contracts.mainnet.CurveRouter.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Swap curve is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const estimatedGas = await estimateGas(config, {
    amountIn,
    slippage,
    tokenIn,
    tokenOut,
    amountOut,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.CurveRouter.address,
    abi: contracts.mainnet.CurveRouter.abi,
    functionName: 'exchange',
    args: [curveConfig.routes, curveConfig.params, amountIn, minAmountOut[0]],
    account: address,
    gas,
    chainId: contracts.mainnet.CurveRouter.chainId,
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
