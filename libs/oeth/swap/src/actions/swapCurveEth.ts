import { queryClient } from '@origin/oeth/shared';
import { contracts } from '@origin/shared/contracts';
import {
  isNativeCurrency,
  simulateContractWithTxTracker,
  useCurve,
} from '@origin/shared/providers';
import { ETH_ADDRESS_CURVE, subtractSlippage } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits, isAddressEqual, maxUint256 } from 'viem';

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

const estimateAmount: EstimateAmount = async (
  config,
  { tokenIn, tokenOut, amountIn },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });
  const amountOut = await readContract(config, {
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_amount',
    args: [
      contracts.mainnet.OETHCurvePool.address,
      tokenIn.address ?? ETH_ADDRESS_CURVE,
      tokenOut.address ?? ETH_ADDRESS_CURVE,
      amountIn,
    ],
    chainId: curve.CurveRegistryExchange.chainId,
  });

  return amountOut as unknown as bigint;
};

const estimateGas: EstimateGas = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config, {
    chainId: contracts.mainnet.OETHCurvePool.chainId,
  });

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });

  const isTokenInNative = isNativeCurrency(tokenIn);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OETHCurvePool.address,
      abi: contracts.mainnet.OETHCurvePool.abi,
      functionName: 'exchange',
      args: [
        BigInt(
          curve.OethPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenIn.address ?? ETH_ADDRESS_CURVE),
          ),
        ),
        BigInt(
          curve.OethPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenOut.address ?? ETH_ADDRESS_CURVE),
          ),
        ),
        amountIn,
        minAmountOut,
      ],
      ...(isTokenInNative && { value: amountIn }),
      account: address ?? ETH_ADDRESS_CURVE,
    });
  } catch (e) {
    gasEstimate = 180000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async () => {
  // ETH doesn't need approval
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  // ETH doesn't need approval
  return 0n;
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
    estimateApprovalGas(config, { tokenIn, tokenOut, amountIn }),
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

const approve: Approve = async () => {
  // ETH doesn't need approval
  return null;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  if (amountIn === 0n) {
    return null;
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });
  const estimatedGas = await estimateGas(config, {
    amountIn,
    slippage,
    tokenIn,
    tokenOut,
    amountOut,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const isTokenInNative = isNativeCurrency(tokenIn);

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.OETHCurvePool.address,
    abi: contracts.mainnet.OETHCurvePool.abi,
    functionName: 'exchange',
    args: [
      BigInt(
        curve.OethPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenIn.address ?? ETH_ADDRESS_CURVE),
        ),
      ),
      BigInt(
        curve.OethPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenOut.address ?? ETH_ADDRESS_CURVE),
        ),
      ),
      amountIn,
      minAmountOut,
    ],
    gas,
    chainId: contracts.mainnet.OETHCurvePool.chainId,
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
