import { queryClient } from '@origin/oeth/shared';
import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  readContracts,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';

import { MIX_TOKEN } from '../constants';

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

  const assetsDecimals = await queryClient.fetchQuery({
    queryKey: ['assetsDecimals'],
    queryFn: async () => {
      const assets = await readContract({
        address: contracts.mainnet.OETHVaultCore.address,
        abi: contracts.mainnet.OETHVaultCore.abi,
        functionName: 'getAllAssets',
      });

      const decimals = await readContracts({
        contracts: assets.map((address) => ({
          address,
          abi: erc20ABI,
          functionName: 'decimals',
        })),
      });

      return decimals.map((r) => r.result);
    },
    staleTime: Infinity,
  });

  const split = await readContract({
    address: contracts.mainnet.OETHVaultCore.address,
    abi: contracts.mainnet.OETHVaultCore.abi,
    functionName: 'calculateRedeemOutputs',
    args: [amountIn],
  });

  return split.reduce((acc, curr, i) => {
    if (assetsDecimals[i] !== MIX_TOKEN.decimals) {
      const exp = MIX_TOKEN.decimals - assetsDecimals[i];

      return acc + curr * (10n ^ BigInt(exp));
    }

    return acc + curr;
  }, 0n);
};

const estimateGas: EstimateGas = async (
  _tokenIn,
  tokenOut,
  amountIn,
  slippage,
  amountOut,
) => {
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

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OETHVaultCore.address,
      abi: contracts.mainnet.OETHVaultCore.abi,
      functionName: 'redeem',
      args: [amountIn, minAmountOut],
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

  const estimatedAmount = await estimateAmount(tokenIn, tokenOut, amountIn);
  const gas = await estimateGas(
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
    estimatedAmount,
  );

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
  tokenOut,
  amountIn,
  _route,
  slippage,
  amountOut,
) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const minAmountOut = parseUnits(
    (
      +formatUnits(amountOut, tokenOut.decimals) -
      +formatUnits(amountOut, tokenOut.decimals) * slippage
    ).toString(),
    tokenOut.decimals,
  );

  try {
    const { request } = await prepareWriteContract({
      address: contracts.mainnet.OETHVaultCore.address,
      abi: contracts.mainnet.OETHVaultCore.abi,
      functionName: 'redeem',
      args: [amountIn, minAmountOut],
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({ hash });

    // TODO trigger notification
    console.log('redeem vault done!');
  } catch (e) {
    // TODO trigger notification
    console.error(`redeem vault error!\n${e.message}`);
  }
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  swap,
};
