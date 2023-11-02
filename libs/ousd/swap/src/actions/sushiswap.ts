import { contracts, tokens } from '@origin/shared/contracts';
import { addRatio, isNilOrEmpty } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { last } from 'ramda';
import { formatUnits } from 'viem';

import { GAS_BUFFER, MAX_PRICE } from '../constants';

import type { Token } from '@origin/shared/contracts';
import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const getPath = (tokenIn: Token, tokenOut: Token) => {
  if (tokenIn.symbol === tokens.mainnet.OUSD.symbol) {
    return {
      [tokens.mainnet.DAI.symbol]: [
        tokens.mainnet.OUSD.address,
        tokens.mainnet.USDT.address,
        tokens.mainnet.DAI.address,
      ] as const,
      [tokens.mainnet.USDT.symbol]: [
        tokens.mainnet.OUSD.address,
        tokens.mainnet.USDT.address,
      ] as const,
      [tokens.mainnet.USDC.symbol]: [
        tokens.mainnet.OUSD.address,
        tokens.mainnet.USDT.address,
        tokens.mainnet.USDC.address,
      ] as const,
    }[tokenOut.symbol];
  } else if (tokenOut.symbol === tokens.mainnet.OUSD.symbol) {
    return {
      [tokens.mainnet.DAI.symbol]: [
        tokens.mainnet.DAI.address,
        tokens.mainnet.USDT.address,
        tokens.mainnet.OUSD.address,
      ] as const,
      [tokens.mainnet.USDT.symbol]: [
        tokens.mainnet.USDT.address,
        tokens.mainnet.OUSD.address,
      ] as const,
      [tokens.mainnet.USDC.symbol]: [
        tokens.mainnet.USDC.address,
        tokens.mainnet.USDT.address,
        tokens.mainnet.OUSD.address,
      ] as const,
    }[tokenIn.symbol];
  }
};

const isRouteAvailable: IsRouteAvailable = async ({
  amountIn,
  tokenIn,
  tokenOut,
}) => {
  try {
    const estimate = await readContract({
      address: contracts.mainnet.sushiswapRouter.address,
      abi: contracts.mainnet.sushiswapRouter.abi,
      functionName: 'getAmountsOut',
      args: [amountIn, getPath(tokenIn, tokenOut)],
    });

    return (
      +formatUnits(amountIn, tokenIn.decimals) /
        +formatUnits(last(estimate), tokenOut.decimals) <
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

  const estimate = await readContract({
    address: contracts.mainnet.sushiswapRouter.address,
    abi: contracts.mainnet.sushiswapRouter.abi,
    functionName: 'getAmountsOut',
    args: [amountIn, getPath(tokenIn, tokenOut)],
  });

  return last(estimate);
};

const estimateGas = async ({
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
  const minAmountOut = addRatio(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.sushiswapRouter.address,
      abi: contracts.mainnet.sushiswapRouter.abi,
      functionName: 'swapExactTokensForTokens',
      args: [
        amountIn,
        minAmountOut,
        getPath(tokenIn, tokenOut),
        address,
        BigInt(Date.now() + 2 * 60 * 1000),
      ],
      account: address,
    });
  } catch {
    gasEstimate =
      tokenIn.symbol === tokens.mainnet.USDT.symbol ||
      tokenOut.symbol === tokens.mainnet.USDT.symbol
        ? 175000n
        : 230000n;
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
    args: [address, contracts.mainnet.sushiswapRouter.address],
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
      args: [contracts.mainnet.sushiswapRouter.address, amountIn],
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
    args: [contracts.mainnet.sushiswapRouter.address, amountIn],
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
    throw new Error(`SushiSwap is not approved`);
  }

  const minAmountOut = addRatio(amountOut, tokenOut.decimals, slippage);

  const estimatedGas = await estimateGas({
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    slippage,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await prepareWriteContract({
    address: contracts.mainnet.sushiswapRouter.address,
    abi: contracts.mainnet.sushiswapRouter.abi,
    functionName: 'swapExactTokensForTokens',
    args: [
      amountIn,
      minAmountOut,
      getPath(tokenIn, tokenOut),
      address,
      BigInt(Date.now() + 2 * 60 * 1000),
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
