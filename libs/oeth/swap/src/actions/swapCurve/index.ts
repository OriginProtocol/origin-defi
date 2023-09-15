import { ETH_ADDRESS_CURVE, isNilOrEmpty } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256, parseUnits } from 'viem';

import { curveRoutes } from './curveRoutes';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../../types';

const estimateAmount: EstimateAmount = async ({
  tokenIn,
  tokenOut,
  amountIn,
  curve,
}) => {
  if (amountIn === 0n || isNilOrEmpty(curve?.CurveRegistryExchange)) {
    return 0n;
  }

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut.symbol];

  if (isNilOrEmpty(curveConfig)) {
    console.error(
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

  const minAmountOut = parseUnits(
    (
      +formatUnits(amountOut, tokenOut.decimals) -
      +formatUnits(amountOut, tokenOut.decimals) * slippage
    ).toString(),
    tokenOut.decimals,
  );

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut.symbol];

  if (isNilOrEmpty(curveConfig)) {
    console.error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );

    return gasEstimate;
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
    console.error(
      `swap curve exchange multiple gas estimate error, returning fix estimate! \n${e.message}`,
    );
    gasEstimate = 350000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ tokenIn, tokenOut, curve }) => {
  const { address } = getAccount();

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
  curve,
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
      abi: erc20ABI,
      functionName: 'approve',
      args: [curve.CurveRegistryExchange.address, amountIn],
      account: address,
    });
  } catch {}

  return approvalEstimate;
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
      approvedAmount: 0n,
      approvalGas: 0n,
    };
  }

  const [estimatedAmount, approvedAmount, approvalGas] = await Promise.all([
    estimateAmount({
      tokenIn,
      tokenOut,
      amountIn,
      curve,
    }),
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
    gas,
    approvalGas,
    approvedAmount,
    rate:
      +formatUnits(amountIn, tokenIn.decimals) /
      +formatUnits(estimatedAmount, tokenOut.decimals),
  };
};

const approve: Approve = async ({
  tokenIn,
  amountIn,
  curve,
  onSuccess,
  onError,
  onReject,
}) => {
  try {
    const { request } = await prepareWriteContract({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [curve.CurveRegistryExchange.address, amountIn],
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log(`swap curve exchange multiple approval done!`);
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`swap curve exchange multiple approval error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Swap Curve approval');
    } else if (onError) {
      await onError('Swap Curve approval');
    }
  }
};

const swap: Swap = async ({
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
  curve,
  onSuccess,
  onError,
  onReject,
}) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const approved = await allowance({ tokenIn, tokenOut, curve });

  if (approved < amountIn) {
    console.error(`swap curve exchange multiple is not approved`);
    if (onError) {
      await onError('swap curve exchange multiple is not approved');
    }
    return;
  }

  const minAmountOut = parseUnits(
    (
      +formatUnits(amountOut, tokenOut.decimals) -
      +formatUnits(amountOut, tokenOut.decimals) * slippage
    ).toString(),
    tokenOut.decimals,
  );

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut?.symbol];

  if (isNilOrEmpty(curveConfig)) {
    console.error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
    if (onError) {
      await onError('No curve route found');
    }
    return;
  }

  try {
    const { request } = await prepareWriteContract({
      address: curve.CurveRegistryExchange.address,
      abi: curve.CurveRegistryExchange.abi,
      functionName: 'exchange_multiple',
      args: [
        curveConfig.routes,
        curveConfig.swapParams,
        amountIn,
        minAmountOut,
      ],
      ...(isNilOrEmpty(tokenIn.address) && { value: amountIn }),
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log('swap curve exchange multiple done!');
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`swap curve exchange multiple error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Swap Curve exchange multiple');
    } else if (onError) {
      await onError('Swap Curve exchange multiple');
    }
  }
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
