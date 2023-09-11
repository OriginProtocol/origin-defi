import { contracts } from '@origin/shared/contracts';
import { ETH_ADDRESS_CURVE, isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { formatUnits, isAddressEqual, parseUnits } from 'viem';

import { curveRoutes } from './curveRoutes';

import type {
  EstimateAmount,
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

  // ETH swap
  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    const amountOut = await readContract({
      address: curve.CurveRegistryExchange.address,
      abi: curve.CurveRegistryExchange.abi,
      functionName: 'get_exchange_amount',
      args: [
        contracts.mainnet.curveOethPool.address,
        tokenIn.address ?? ETH_ADDRESS_CURVE,
        tokenOut.address ?? ETH_ADDRESS_CURVE,
        amountIn,
      ],
    });

    return amountOut as unknown as bigint;
  }

  const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut?.symbol];

  if (isNilOrEmpty(curveConfig)) {
    // TODO return or throw
    console.error('No curve route found, verify exchange mapping');
  }

  console.log(curveConfig);

  const amountOut = await readContract({
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_multiple_amount',
    args: [curveConfig.routes, curveConfig.params, amountIn],
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

  // ETH swap
  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.curveOethPool.address,
        abi: contracts.mainnet.curveOethPool.abi,
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
        ...(isNilOrEmpty(tokenOut.address) && { value: amountIn }),
        account: address ?? ETH_ADDRESS_CURVE,
      });

      return gasEstimate;
    } catch (e) {
      console.error(
        `swap curve OETHPool gas estimate error, returning fix estimate!\n${e.message}`,
      );

      return 180000n;
    }
  }

  try {
    const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut?.symbol];

    if (isNilOrEmpty(curveConfig)) {
      // TODO return or throw
      console.error('No curve route found, verify exchange mapping');
    }

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
    });
  } catch (e) {
    console.error(
      `swap curve exchange multiple gas estimate error, returning fix estimate! \n${e.message}`,
    );

    return 350000n;
  }

  return gasEstimate;
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
    return { ...route, estimatedAmount: 0n, gas: 0n, rate: 0 };
  }

  const estimatedAmount = await estimateAmount({
    tokenIn,
    tokenOut,
    amountIn,
    curve,
  });
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
    rate:
      +formatUnits(amountIn, tokenIn.decimals) /
      +formatUnits(estimatedAmount, tokenOut.decimals),
  };
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
    return;
  }

  const minAmountOut = parseUnits(
    (
      +formatUnits(amountOut, tokenOut.decimals) -
      +formatUnits(amountOut, tokenOut.decimals) * slippage
    ).toString(),
    tokenOut.decimals,
  );

  // ETH swap
  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    try {
      const { request } = await prepareWriteContract({
        address: contracts.mainnet.curveOethPool.address,
        abi: contracts.mainnet.curveOethPool.abi,
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
        ...(isNilOrEmpty(tokenOut.address) && { value: amountIn }),
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });

      // TODO trigger notification
      console.log('swap curve OETHPool done!');
      return;
    } catch (e) {
      // TODO trigger notification
      console.error(`swap curve OETHPool error!\n${e.message}`);
      return;
    }
  }

  try {
    const curveConfig = curveRoutes[tokenIn.symbol]?.[tokenOut?.symbol];

    if (isNilOrEmpty(curveConfig)) {
      // TODO return or throw
      console.error('No curve route found, verify exchange mapping');
    }

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
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({ hash });

    // TODO trigger notification
    console.log('swap curve exchange multiple done!');
  } catch (e) {
    console.error(`swap curve exchange multiple error!\n${e.message}`);
  }
};

export default {
  estimateAmount,
  estimateRoute,
  swap,
};
