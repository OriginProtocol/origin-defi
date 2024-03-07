import { contracts, tokens } from '@origin/shared/contracts';
import { simulateContractWithReferral } from '@origin/shared/providers';
import { subtractSlippage, ZERO_ADDRESS } from '@origin/shared/utils';
import { getAccount, getPublicClient, writeContract } from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

import type {
  Allowance,
  EstimateAmount,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async (
  config,
  { amountIn, tokenOut },
) => {
  let estimate = 0n;
  const publicClient = getPublicClient(config);
  if (amountIn === 0n || !tokenOut?.address || !publicClient) {
    return estimate;
  }

  estimate = (
    await publicClient.simulateContract({
      address: contracts.mainnet.uniswapV3Quoter.address,
      abi: contracts.mainnet.uniswapV3Quoter.abi,
      functionName: 'quoteExactInputSingle',
      args: [tokens.mainnet.WETH.address, tokenOut.address, 500, amountIn, 0n],
    })
  )?.result;

  return estimate;
};

const estimateGas: EstimateGas = async (
  config,
  { tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !publicClient || !tokenOut?.address) {
    return gasEstimate;
  }

  const { address } = getAccount(config);
  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.uniswapV3Router.address,
      abi: contracts.mainnet.uniswapV3Router.abi,
      functionName: 'exactInputSingle',
      value: amountIn,
      args: [
        {
          tokenIn: tokens.mainnet.WETH.address,
          tokenOut: tokenOut.address,
          amountIn,
          amountOutMinimum: minAmountOut,
          deadline: BigInt(Date.now() + 2 * 60 * 1000),
          fee: 500,
          recipient: address ?? ZERO_ADDRESS,
          sqrtPriceLimitX96: 0n,
        },
      ],
    });
  } catch {
    gasEstimate = 165000n;
  }

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route },
) => {
  const [estimatedAmount, allowanceAmount] = await Promise.all([
    estimateAmount(config, { tokenIn, tokenOut, amountIn }),
    allowance(config, { tokenIn, tokenOut }),
  ]);

  return {
    ...route,
    estimatedAmount,
    allowanceAmount,
    approvalGas: 0n,
    gas: 0n,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const allowance: Allowance = async () => {
  return maxUint256;
};

const swap: Swap = async (
  config,
  { tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address) {
    return null;
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const { request } = await simulateContractWithReferral(config, {
    address: contracts.mainnet.uniswapV3Router.address,
    abi: contracts.mainnet.uniswapV3Router.abi,
    functionName: 'exactInputSingle',
    value: amountIn,
    account: address,
    args: [
      {
        tokenIn: tokens.mainnet.WETH.address,
        tokenOut: tokenOut.address,
        amountIn,
        amountOutMinimum: minAmountOut,
        deadline: BigInt(Date.now() + 2 * 60 * 1000),
        fee: 500,
        recipient: address,
        sqrtPriceLimitX96: 0n,
      },
    ],
  });
  const hash = await writeContract(config, request);

  return hash;
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  swap,
};
