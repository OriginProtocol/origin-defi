import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, substractSlippage } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { encodePacked, formatUnits } from 'viem';

import { GAS_BUFFER } from '../constants';

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
      [tokens.mainnet.DAI.symbol]: encodePacked(
        ['address', 'uint24', 'address', 'uint24', 'address'],
        [
          tokens.mainnet.OUSD.address,
          500,
          tokens.mainnet.USDT.address,
          500,
          tokens.mainnet.DAI.address,
        ],
      ),
      [tokens.mainnet.USDC.symbol]: encodePacked(
        ['address', 'uint24', 'address', 'uint24', 'address'],
        [
          tokens.mainnet.OUSD.address,
          500,
          tokens.mainnet.USDT.address,
          100,
          tokens.mainnet.USDC.address,
        ],
      ),
    }[tokenOut.symbol];
  } else if (tokenOut.symbol === tokens.mainnet.OUSD.symbol) {
    return {
      [tokens.mainnet.DAI.symbol]: encodePacked(
        ['address', 'uint24', 'address', 'uint24', 'address'],
        [
          tokens.mainnet.DAI.address,
          500,
          tokens.mainnet.USDT.address,
          500,
          tokens.mainnet.OUSD.address,
        ],
      ),
      [tokens.mainnet.USDC.symbol]: encodePacked(
        ['address', 'uint24', 'address', 'uint24', 'address'],
        [
          tokens.mainnet.USDC.address,
          100,
          tokens.mainnet.USDT.address,
          500,
          tokens.mainnet.OUSD.address,
        ],
      ),
    }[tokenIn.symbol];
  }
};

const isRouteAvailable: IsRouteAvailable = async () => true;

const estimateAmount: EstimateAmount = async ({
  amountIn,
  tokenIn,
  tokenOut,
}) => {
  if (amountIn === 0n) {
    return 0n;
  }

  let estimate = 0n;
  const publicClient = getPublicClient();

  if ([tokenIn.symbol, tokenOut.symbol].includes(tokens.mainnet.USDT.symbol)) {
    estimate = (
      await publicClient.simulateContract({
        address: contracts.mainnet.uniswapV3Quoter.address,
        abi: contracts.mainnet.uniswapV3Quoter.abi,
        functionName: 'quoteExactInputSingle',
        args: [tokenIn.address, tokenOut.address, 500, amountIn, 0n],
      })
    )?.result;
  } else {
    estimate = (
      await publicClient.simulateContract({
        address: contracts.mainnet.uniswapV3Quoter.address,
        abi: contracts.mainnet.uniswapV3Quoter.abi,
        functionName: 'quoteExactInput',
        args: [getPath(tokenIn, tokenOut), amountIn],
      })
    )?.result;
  }

  return estimate;
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
  const minAmountOut = substractSlippage(
    amountOut,
    tokenOut.decimals,
    slippage,
  );

  try {
    if (
      [tokenIn.symbol, tokenOut.symbol].includes(tokens.mainnet.USDT.symbol)
    ) {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.uniswapV3Router.address,
        abi: contracts.mainnet.uniswapV3Router.abi,
        functionName: 'exactInputSingle',
        args: [
          {
            tokenIn: tokenIn.address,
            tokenOut: tokenOut.address,
            amountIn: amountIn,
            amountOutMinimum: minAmountOut,
            deadline: BigInt(Date.now() + 2 * 60 * 1000),
            fee: 500,
            recipient: address,
            sqrtPriceLimitX96: 0n,
          },
        ],
      });
    } else {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.uniswapV3Router.address,
        abi: contracts.mainnet.uniswapV3Router.abi,
        functionName: 'exactInput',
        args: [
          {
            path: getPath(tokenIn, tokenOut),
            amountIn: amountIn,
            amountOutMinimum: minAmountOut,
            deadline: BigInt(Date.now() + 2 * 60 * 1000),
            recipient: address,
          },
        ],
      });
    }
  } catch {
    gasEstimate = 165000n;
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
    args: [address, contracts.mainnet.uniswapV3Router.address],
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
      args: [contracts.mainnet.uniswapV3Router.address, amountIn],
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
    args: [contracts.mainnet.uniswapV3Router.address, amountIn],
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
    throw new Error(`Uniswap V3 is not approved`);
  }

  const minAmountOut = substractSlippage(
    amountOut,
    tokenOut.decimals,
    slippage,
  );

  const estimatedGas = await estimateGas({
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    slippage,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  let txHash;
  if ([tokenIn.symbol, tokenOut.symbol].includes(tokens.mainnet.USDT.symbol)) {
    const { request } = await prepareWriteContract({
      address: contracts.mainnet.uniswapV3Router.address,
      abi: contracts.mainnet.uniswapV3Router.abi,
      functionName: 'exactInputSingle',
      args: [
        {
          tokenIn: tokenIn.address,
          tokenOut: tokenOut.address,
          amountIn: amountIn,
          amountOutMinimum: minAmountOut,
          deadline: BigInt(Date.now() + 2 * 60 * 1000),
          fee: 500,
          recipient: address,
          sqrtPriceLimitX96: 0n,
        },
      ],
      gas,
    });
    const { hash } = await writeContract(request);
    txHash = hash;
  } else {
    const { request } = await prepareWriteContract({
      address: contracts.mainnet.uniswapV3Router.address,
      abi: contracts.mainnet.uniswapV3Router.abi,
      functionName: 'exactInput',
      args: [
        {
          path: getPath(tokenIn, tokenOut),
          amountIn: amountIn,
          amountOutMinimum: minAmountOut,
          deadline: BigInt(Date.now() + 2 * 60 * 1000),
          recipient: address,
        },
      ],
      gas,
    });
    const { hash } = await writeContract(request);
    txHash = hash;
  }

  return txHash;
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
