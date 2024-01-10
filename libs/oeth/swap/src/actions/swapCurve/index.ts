import { simulateContractWithTxTracker } from '@origin/shared/providers';
import {
  ETH_ADDRESS_CURVE,
  isNilOrEmpty,
  subtractSlippage,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';

import { GAS_BUFFER } from '../../constants';
import { curveRoutes } from './curveRoutes';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async (
  config,
  { tokenIn, tokenOut, amountIn, curve },
) => {
  if (amountIn === 0n || isNilOrEmpty(curve?.CurveRegistryExchange)) {
    return 0n;
  }

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut.symbol];

  if (isNilOrEmpty(curveConfig)) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const amountOut = await readContract(config, {
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_multiple_amount',
    args: [curveConfig.routes, curveConfig.swapParams, amountIn],
  });

  return amountOut as unknown as bigint;
};

const estimateGas: EstimateGas = async (
  config,
  { tokenIn, tokenOut, amountIn, curve, amountOut, slippage },
) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const publicClient = getPublicClient(config);
  const { address } = getAccount(config);

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut.symbol];

  if (isNilOrEmpty(curveConfig)) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: curve.CurveRegistryExchange.address,
      abi: curve.CurveRegistryExchange.abi,
      functionName: 'exchange_multiple',
      args: [
        curveConfig.routes,
        curveConfig.swapParams,
        amountIn,
        minAmountOut,
      ],
      account: address ?? ETH_ADDRESS_CURVE,
      ...(isNilOrEmpty(tokenIn.address) && { value: amountIn }),
    });
  } catch (e) {
    gasEstimate = 350000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async (config, { tokenIn, tokenOut, curve }) => {
  const { address } = getAccount(config);

  if (isNilOrEmpty(address) || isNilOrEmpty(curve?.CurveRegistryExchange)) {
    return 0n;
  }

  if (isNilOrEmpty(tokenIn.address)) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, curve.CurveRegistryExchange.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn, curve },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config);

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [curve.CurveRegistryExchange.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route, slippage, curve },
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
    estimateAmount(config, {
      tokenIn,
      tokenOut,
      amountIn,
      curve,
    }),
    allowance(config, { tokenIn, tokenOut, curve }),
    estimateApprovalGas(config, { amountIn, tokenIn, tokenOut, curve }),
  ]);
  const gas = await estimateGas(config, {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut: estimatedAmount,
    slippage,
    curve,
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

const approve: Approve = async (
  config,
  { tokenIn, tokenOut, amountIn, curve },
) => {
  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [curve.CurveRegistryExchange.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage, curve },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut, curve });

  if (approved < amountIn) {
    throw new Error(`Swap curve is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut?.symbol];

  if (isNilOrEmpty(curveConfig)) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const estimatedGas = await estimateGas(config, {
    amountIn,
    slippage,
    tokenIn,
    tokenOut,
    amountOut,
    curve,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'exchange_multiple',
    args: [curveConfig.routes, curveConfig.swapParams, amountIn, minAmountOut],
    gas,
    ...(isNilOrEmpty(tokenIn.address) && { value: amountIn }),
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
