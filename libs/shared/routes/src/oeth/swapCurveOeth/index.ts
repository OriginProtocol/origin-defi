import {
  isNativeCurrency,
  simulateContractWithTxTracker,
  useCurve,
} from '@origin/shared/providers';
import {
  ETH_ADDRESS_CURVE,
  isNilOrEmpty,
  subPercentage,
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
import { defaultRoute } from '../../defaultRoute';
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
  { config, queryClient },
  { tokenIn, tokenOut, amountIn },
) => {
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
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
    chainId: curve.CurveRegistryExchange.chainId,
  });

  return amountOut as unknown as bigint;
};

const estimateGas: EstimateGas = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

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
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });

  const publicClient = getPublicClient(config, {
    chainId: curve.CurveRegistryExchange.chainId,
  });

  if (!publicClient) {
    return gasEstimate;
  }

  const isTokenInNative = isNativeCurrency(tokenIn);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: curve.CurveRegistryExchange.address,
      abi: curve.CurveRegistryExchange.abi,
      functionName: 'exchange_multiple',
      args: [
        curveConfig.routes,
        curveConfig.swapParams,
        amountIn,
        minAmountOut[0],
      ],
      account: address ?? ETH_ADDRESS_CURVE,
      ...(isTokenInNative && { value: amountIn }),
    });
  } catch (e) {
    gasEstimate = 350000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config, queryClient }, { tokenIn }) => {
  const { address } = getAccount(config);
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
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
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config, queryClient },
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (amountIn === 0n || !address || !publicClient) {
    return approvalEstimate;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
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
  client,
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
    estimateAmount(client, { tokenIn, tokenOut, amountIn }),
    allowance(client, { tokenIn, tokenOut }),
    estimateApprovalGas(client, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(client, {
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

const approve: Approve = async (
  { config, queryClient },
  { tokenIn, amountIn },
) => {
  if (!tokenIn?.address) {
    return null;
  }
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });
  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [curve.CurveRegistryExchange.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });
  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`Swap curve is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const curveConfig = path<{ routes: unknown[]; swapParams: unknown[] }>(
    [tokenIn.symbol, tokenOut?.symbol],
    curveRoutes,
  );

  if (!curveConfig) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
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

  const isTokenInNative = isNativeCurrency(tokenIn);

  const { request } = await simulateContractWithTxTracker(config, {
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'exchange_multiple',
    args: [
      curveConfig.routes,
      curveConfig.swapParams,
      amountIn,
      minAmountOut[0],
    ],
    gas,
    chainId: curve.CurveRegistryExchange.chainId,
    ...(isTokenInNative && { value: amountIn }),
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const SwapCurveOeth = {
  ...defaultRoute,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
