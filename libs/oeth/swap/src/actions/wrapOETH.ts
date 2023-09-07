import { contracts, whales } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
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
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract({
    address: contracts.mainnet.WOETH.address,
    abi: contracts.mainnet.WOETH.abi,
    functionName: 'convertToShares',
    args: [amountIn],
  });

  return data;
};

const estimateGas: EstimateGas = async (
  _tokenIn,
  _tokenOut,
  amountIn,
  _slippage,
) => {
  let gasEstimate = 0n;

  const publicClient = getPublicClient();

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const { address } = getAccount();

  if (!isNilOrEmpty(address)) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.WOETH.address,
        abi: contracts.mainnet.WOETH.abi,
        functionName: 'deposit',
        args: [amountIn, address],
        account: address,
      });

      return gasEstimate;
    } catch {}
  }

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.WOETH.address,
      abi: contracts.mainnet.WOETH.abi,
      functionName: 'deposit',
      args: [amountIn, whales.mainnet.OETH],
      account: whales.mainnet.OETH,
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

const swap: Swap = async (_tokenIn, _tokenOut, amountIn, _route) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const allowance = await readContract({
    address: contracts.mainnet.OETH.address,
    abi: contracts.mainnet.OETH.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.WOETH.address],
  });

  if (allowance < amountIn) {
    try {
      const { request } = await prepareWriteContract({
        address: contracts.mainnet.OETH.address,
        abi: contracts.mainnet.OETH.abi,
        functionName: 'approve',
        args: [contracts.mainnet.WOETH.address, amountIn],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });

      // TODO trigger notification
      console.log(`wrap woeth approval done!`);
    } catch (e) {
      // TODO trigger notification
      console.error(`wrap oeth approval error!\n${e.message}`);
      return;
    }
  }

  try {
    const { request } = await prepareWriteContract({
      address: contracts.mainnet.WOETH.address,
      abi: contracts.mainnet.WOETH.abi,
      functionName: 'deposit',
      args: [amountIn, address],
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({ hash });

    // TODO trigger notification
    console.log('wrap oeth done!');
  } catch (e) {
    // TODO trigger notification
    console.error(`wrap oeth error!\n${e.message}`);
  }
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  swap,
};
