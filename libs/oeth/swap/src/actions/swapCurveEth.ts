import { contracts } from '@origin/shared/contracts';
import {
  ETH_ADDRESS_CURVE,
  isNilOrEmpty,
  subtractSlippage,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
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

const estimateAmount: EstimateAmount = async ({
  tokenIn,
  tokenOut,
  amountIn,
  curve,
}) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const amountOut = await readContract({
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_amount',
    args: [
      contracts.mainnet.OETHCurvePool.address,
      tokenIn.address ?? ETH_ADDRESS_CURVE,
      tokenOut.address ?? ETH_ADDRESS_CURVE,
      amountIn,
    ],
  });

  return amountOut as unknown as bigint;
};

const estimateGas: EstimateGas = async ({
  tokenIn,
  tokenOut,
  amountIn,
  curve,
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
      ...(isNilOrEmpty(tokenIn.address) && { value: amountIn }),
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

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
  curve,
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
      curve,
    }),
    allowance(),
    estimateApprovalGas(),
  ]);
  const gas = await estimateGas({
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

const approve: Approve = async () => {
  // ETH doesn't need approval
  return null;
};

const swap: Swap = async ({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
  curve,
}) => {
  if (amountIn === 0n) {
    return null;
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const estimatedGas = await estimateGas({
    amountIn,
    slippage,
    tokenIn,
    tokenOut,
    amountOut,
    curve,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await prepareWriteContract({
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
