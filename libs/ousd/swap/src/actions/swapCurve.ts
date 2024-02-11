import { queryClient } from '@origin/ousd/shared';
import { contracts } from '@origin/shared/contracts';
import {
  prepareWriteContractWithTxTracker,
  useCurve,
} from '@origin/shared/providers';
import {
  isAddressEqual,
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
}) => {
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
  try {
    const estimate = await readContract({
      address: curve.CurveRegistryExchange.address,
      abi: curve.CurveRegistryExchange.abi,
      functionName: 'get_exchange_amount',
      args: [
        contracts.mainnet.OUSDCurveMetaPool.address,
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
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async ({
  amountIn,
  tokenIn,
  tokenOut,
}) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });
  const estimate = await readContract({
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_amount',
    args: [
      contracts.mainnet.OUSDCurveMetaPool.address,
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
}) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const publicClient = getPublicClient();
  const { address } = getAccount();
  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OUSDCurveMetaPool.address,
      abi: contracts.mainnet.OUSDCurveMetaPool.abi,
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
  } catch {
    gasEstimate = 350000n;
  }

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  route,
}) => {
  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount({ tokenIn, tokenOut, amountIn }),
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
    args: [address, contracts.mainnet.OUSDCurveMetaPool.address],
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
      args: [contracts.mainnet.OUSDCurveMetaPool.address, amountIn],
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
    args: [contracts.mainnet.OUSDCurveMetaPool.address, amountIn],
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
}) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance({ tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Curve swap is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const estimatedGas = await estimateGas({
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    slippage,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher,
    staleTime: Infinity,
  });

  const { request } = await prepareWriteContractWithTxTracker({
    address: contracts.mainnet.OUSDCurveMetaPool.address,
    abi: contracts.mainnet.OUSDCurveMetaPool.abi,
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
