import { queryClient } from '@origin/oeth/shared';
import {
  prepareWriteContractWithTxTracker,
  useCurve,
} from '@origin/shared/providers';
import {
  ETH_ADDRESS_CURVE,
  isNilOrEmpty,
  subtractSlippage,
} from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

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

const estimateAmount: EstimateAmount = async ({
  tokenIn,
  tokenOut,
  amountIn,
}) => {
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
  if (amountIn === 0n || isNilOrEmpty(curve?.CurveRegistryExchange)) {
    return 0n;
  }

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut.symbol];

  if (isNilOrEmpty(curveConfig)) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const amountOut = await readContract({
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_multiple_amount',
    args: [curveConfig.routes, curveConfig.swapParams, amountIn],
  });

  return amountOut as unknown as bigint;
};

const estimateGas: EstimateGas = async ({
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
  const { address } = getAccount();

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut.symbol];

  if (isNilOrEmpty(curveConfig)) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

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

const allowance: Allowance = async ({ tokenIn, tokenOut }) => {
  const { address } = getAccount();
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

  if (isNilOrEmpty(address) || isNilOrEmpty(curve?.CurveRegistryExchange)) {
    return 0n;
  }

  if (isNilOrEmpty(tokenIn.address)) {
    return maxUint256;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, curve.CurveRegistryExchange.address],
  });

  return allowance;
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
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [curve.CurveRegistryExchange.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
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

  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount({
      tokenIn,
      tokenOut,
      amountIn,
    }),
    allowance({ tokenIn, tokenOut }),
    estimateApprovalGas({ amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas({
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

const approve: Approve = async ({ tokenIn, tokenOut, amountIn }) => {
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
  const { request } = await prepareWriteContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [curve.CurveRegistryExchange.address, amountIn],
  });
  const { hash } = await writeContract(request);

  return hash;
};

const swap: Swap = async ({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
}) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
  const approved = await allowance({ tokenIn, tokenOut });

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

  const estimatedGas = await estimateGas({
    amountIn,
    slippage,
    tokenIn,
    tokenOut,
    amountOut,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await prepareWriteContractWithTxTracker({
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'exchange_multiple',
    args: [curveConfig.routes, curveConfig.swapParams, amountIn, minAmountOut],
    gas,
    ...(isNilOrEmpty(tokenIn.address) && { value: amountIn }),
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
