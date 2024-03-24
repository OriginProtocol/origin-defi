import { contracts, tokens } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { subtractSlippage, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
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
  EstimateGas,
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

const isRouteAvailable: IsRouteAvailable = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  const path = getPath(tokenIn, tokenOut);
  try {
    if (path) {
      const estimate = await readContract(config, {
        address: contracts.mainnet.sushiswapRouter.address,
        abi: contracts.mainnet.sushiswapRouter.abi,
        functionName: 'getAmountsOut',
        args: [amountIn, path],
      });

      return (
        +formatUnits(amountIn, tokenIn.decimals) /
          +formatUnits(last(estimate) ?? 1n, tokenOut.decimals) <
        MAX_PRICE
      );
    }
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  const path = getPath(tokenIn, tokenOut);

  if (amountIn === 0n || !path) {
    return 0n;
  }

  const estimate = await readContract(config, {
    address: contracts.mainnet.sushiswapRouter.address,
    abi: contracts.mainnet.sushiswapRouter.abi,
    functionName: 'getAmountsOut',
    args: [amountIn, path],
  });

  return last(estimate) ?? 0n;
};

const estimateGas: EstimateGas = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const { address } = getAccount(config);
  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);
  const path = getPath(tokenIn, tokenOut);

  gasEstimate =
    tokenIn.symbol === tokens.mainnet.USDT.symbol ||
    tokenOut.symbol === tokens.mainnet.USDT.symbol
      ? 175000n
      : 230000n;

  try {
    if (path) {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.sushiswapRouter.address,
        abi: contracts.mainnet.sushiswapRouter.abi,
        functionName: 'swapExactTokensForTokens',
        args: [
          amountIn,
          minAmountOut,
          path,
          address ?? ZERO_ADDRESS,
          BigInt(Date.now() + 2 * 60 * 1000),
        ],
        account: address,
      });
    }
  } catch {}

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, route },
) => {
  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount(config, { tokenIn, tokenOut, amountIn }),
    allowance(config, { tokenIn, tokenOut }),
    estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(config, {
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

const allowance: Allowance = async (config, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.sushiswapRouter.address],
  });

  return allowance as unknown as bigint;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !publicClient || !tokenIn?.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.sushiswapRouter.address, amountIn],
      account: address ?? ZERO_ADDRESS,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async (config, { tokenIn, tokenOut, amountIn }) => {
  if (amountIn === 0n || !tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.sushiswapRouter.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`SushiSwap is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const estimatedGas = await estimateGas(config, {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    slippage,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
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
  const hash = await writeContract(config, request);

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
