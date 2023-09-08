import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  prepareWriteContract,
  readContract,
  readContracts,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';

import type {
  EstimateAmount,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';

const estimateAmount: EstimateAmount = async (_tokenIn, tokenOut, amountIn) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const [previewRedeem, priceUnitMint] = await readContracts({
    contracts: [
      {
        address: tokens.mainnet.sfrxETH.address,
        abi: tokens.mainnet.sfrxETH.abi,
        functionName: 'previewRedeem',
        args: [amountIn],
      },
      {
        address: contracts.mainnet.OETHVaultCore.address,
        abi: contracts.mainnet.OETHVaultCore.abi,
        functionName: 'priceUnitMint',
        args: [tokens.mainnet.frxETH.address],
      },
    ],
  });

  return parseUnits(
    (
      +formatUnits(previewRedeem?.result, tokens.mainnet.frxETH.decimals) *
      +formatUnits(priceUnitMint?.result, tokenOut.decimals)
    ).toString(),
    tokenOut.decimals,
  );
};

const estimateGas: EstimateGas = async (
  _tokenIn,
  _tokenOut,
  amountIn,
  _slippage,
  _amountOut,
) => {
  return 90000n;
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
  tokenIn,
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

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHZapper.address],
  });

  if (allowance < amountIn) {
    try {
      const { request } = await prepareWriteContract({
        address: tokenIn.address,
        abi: erc20ABI,
        functionName: 'approve',
        args: [contracts.mainnet.OETHZapper.address, amountIn],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });

      // TODO trigger notification
      console.log(`swap zapper sfrxEth approval done!`);
    } catch (e) {
      // TODO trigger notification
      console.error(`swap zapper sfrxEth error!\n${e.message}`);
      return;
    }
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
      address: contracts.mainnet.OETHZapper.address,
      abi: contracts.mainnet.OETHZapper.abi,
      functionName: 'depositSFRXETH',
      args: [amountIn, minAmountOut],
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({ hash });

    // TODO trigger notification
    console.log('swap zapper sfrxEth done!');
  } catch (e) {
    // TODO trigger notification
    console.error(`swap zapper sfrxEth error!\n${e.message}`);
  }
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  swap,
};
