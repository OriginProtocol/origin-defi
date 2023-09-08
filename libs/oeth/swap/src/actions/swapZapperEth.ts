import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { formatUnits } from 'viem';

import type {
  EstimateAmount,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';

const estimateAmount: EstimateAmount = async (
  _tokenIn,
  _tokenOut,
  amountIn,
) => {
  return amountIn;
};

const estimateGas: EstimateGas = async (
  _tokenIn,
  _tokenOut,
  amountIn,
  _slippage,
  _amountOut,
) => {
  let gasEstimate = 200000n;

  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return gasEstimate;
  }

  const publicClient = getPublicClient();

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OETHZapper.address,
      abi: contracts.mainnet.OETHZapper.abi,
      functionName: 'deposit',
      value: amountIn,
      account: address,
    });
  } catch {}

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async (
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
) => {
  if (amountIn === 0n) {
    return { ...route, estimatedAmount: 0n, gas: 0n, rate: 0 };
  }

  const [estimatedAmount, gas] = await Promise.all([
    estimateAmount(tokenIn, tokenOut, amountIn),
    estimateGas(tokenIn, tokenOut, amountIn, slippage),
  ]);

  return {
    ...route,
    estimatedAmount,
    gas,
    rate:
      +formatUnits(amountIn, tokenIn.decimals) /
      +formatUnits(estimatedAmount, tokenOut.decimals),
  };
};

const swap: Swap = async (
  _tokenIn,
  _tokenOut,
  amountIn,
  _route,
  _slippage,
  _amountOut,
) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  try {
    const { request } = await prepareWriteContract({
      address: contracts.mainnet.OETHZapper.address,
      abi: contracts.mainnet.OETHZapper.abi,
      functionName: 'deposit',
      value: amountIn,
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({ hash });

    // TODO trigger notification
    console.log('swap zapper eth done!');
  } catch (e) {
    // TODO trigger notification
    console.error(`swap zapper eth error!\n${e.message}`);
  }
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  swap,
};
