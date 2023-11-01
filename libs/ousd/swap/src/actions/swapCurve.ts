import { contracts } from '@origin/shared/contracts';
import { addRatio, isAddressEqual, isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits } from 'viem';

import { GAS_BUFFER, MAX_PRICE } from '../constants';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async ({
  amountIn,
  tokenIn,
  tokenOut,
  curve,
}) => {
  try {
    const estimate = await readContract({
      address: curve.CurveRegistryExchange.address,
      abi: curve.CurveRegistryExchange.abi,
      functionName: 'get_exchange_amount',
      args: [
        contracts.mainnet.CurveOusdMetaPool.address,
        tokenIn.address,
        tokenOut.address,
        amountIn,
      ],
    });
    return (
      +formatUnits(amountIn, tokenIn.decimals) /
        +formatUnits(estimate as unknown as bigint, tokenOut.decimals) <
      MAX_PRICE
    );
  } catch (e) {
    console.log(e);
  }

  return false;
};

const estimateAmount: EstimateAmount = async ({
  amountIn,
  tokenIn,
  tokenOut,
  curve,
}) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const estimate = await readContract({
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_amount',
    args: [
      contracts.mainnet.CurveOusdMetaPool.address,
      tokenIn.address,
      tokenOut.address,
      amountIn,
    ],
  });

  return estimate as unknown as bigint;
};

const estimateGas: EstimateGas = async ({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
  curve,
}) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const publicClient = getPublicClient();
  const { address } = getAccount();
  const minAmountOut = addRatio(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.CurveOusdMetaPool.address,
      abi: contracts.mainnet.CurveOusdMetaPool.abi,
      functionName: 'exchange_underlying',
      args: [
        BigInt(
          curve.OusdMetaPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenIn.address),
          ),
        ),
        BigInt(
          curve.OusdMetaPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenOut.address),
          ),
        ),
        amountIn,
        minAmountOut,
      ],
      account: address,
    });
  } catch {}

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  route,
  curve,
}) => {
  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount({ tokenIn, tokenOut, amountIn, curve }),
    allowance({ tokenIn, tokenOut, curve }),
    estimateApprovalGas({ amountIn, tokenIn, tokenOut, curve }),
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
    allowanceAmount,
    approvalGas,
    gas,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const allowance: Allowance = async ({ tokenIn }) => {
  const { address } = getAccount();

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.CurveOusdMetaPool.address],
  });

  return allowance as unknown as bigint;
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

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.CurveOusdMetaPool.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async ({ tokenIn, tokenOut, amountIn }) => {
  const { request } = await prepareWriteContract({
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.CurveOusdMetaPool.address, amountIn],
  });
  const { hash } = await writeContract(request);

  return hash;
};

const swap: Swap = async ({
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  amountOut,
  curve,
}) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance({ tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Curve swap is not approved`);
  }

  const minAmountOut = addRatio(amountOut, tokenOut.decimals, slippage);

  const estimatedGas = await estimateGas({
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    slippage,
    curve,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await prepareWriteContract({
    address: contracts.mainnet.CurveOusdMetaPool.address,
    abi: contracts.mainnet.CurveOusdMetaPool.abi,
    functionName: 'exchange_underlying',
    args: [
      BigInt(
        curve.OusdMetaPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenIn.address),
        ),
      ),
      BigInt(
        curve.OusdMetaPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenOut.address),
        ),
      ),
      amountIn,
      minAmountOut,
    ],
    account: address,
    gas,
  });
  const { hash } = await writeContract(request);

  return hash;
};

export default {
  isRouteAvailable,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
