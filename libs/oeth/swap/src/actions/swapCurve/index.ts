import { queryClient } from '@origin/oeth/shared';
import {
  isNativeCurrency,
  simulateContractWithTxTracker,
  useCurve,
} from '@origin/shared/providers';
import {
  ETH_ADDRESS_CURVE,
  isNilOrEmpty,
  subtractSlippage,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { path } from 'ramda';
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
  { tokenIn, tokenOut, amountIn },
) => {
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(config),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
  if (amountIn === 0n || isNilOrEmpty(curve?.CurveRegistryExchange)) {
    return 0n;
  }

  const curveConfig = path<{ routes: unknown[]; swapParams: unknown[] }>(
    [tokenIn.symbol, tokenOut.symbol],
    curveRoutes,
  );

  if (!curveConfig) {
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
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const curveConfig = path<{ routes: unknown[]; swapParams: unknown[] }>(
    [tokenIn.symbol, tokenOut.symbol],
    curveRoutes,
  );

  if (!curveConfig) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(config),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

  const isTokenInNative = isNativeCurrency(config, tokenIn);

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
      ...(isTokenInNative && { value: amountIn }),
    });
  } catch (e) {
    gasEstimate = 350000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async (config, { tokenIn }) => {
  const { address } = getAccount(config);
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(config),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

  if (!address || isNilOrEmpty(curve?.CurveRegistryExchange)) {
    return 0n;
  }

  if (!tokenIn?.address) {
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
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !address || !publicClient) {
    return approvalEstimate;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(config),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address ?? ZERO_ADDRESS,
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
    estimateAmount(config, {
      tokenIn,
      tokenOut,
      amountIn,
      slippage,
    }),
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
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(config),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
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
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(config),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Swap curve is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const curveConfig = path<{ routes: unknown[]; swapParams: unknown[] }>(
    [tokenIn.symbol, tokenOut?.symbol],
    curveRoutes,
  );

  if (!curveConfig) {
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
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const isTokenInNative = isNativeCurrency(config, tokenIn);

  const { request } = await simulateContractWithTxTracker(config, {
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'exchange_multiple',
    args: [curveConfig.routes, curveConfig.swapParams, amountIn, minAmountOut],
    gas,
    ...(isTokenInNative && { value: amountIn }),
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
