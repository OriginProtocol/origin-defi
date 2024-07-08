import { contracts, tokens } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import {
  isNilOrEmpty,
  subPercentage,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { encodePacked, formatUnits } from 'viem';

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
          500,
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
          500,
          tokens.mainnet.USDT.address,
          500,
          tokens.mainnet.OUSD.address,
        ],
      ),
    }[tokenIn.symbol];
  }
};

const isRouteAvailable: IsRouteAvailable = async (
  config,
  { amountIn, tokenIn },
) => {
  return +formatUnits(amountIn, tokenIn.decimals) > 0.000003;
};

const estimateAmount: EstimateAmount = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  let estimate = 0n;
  const publicClient = getPublicClient(config);
  if (
    amountIn === 0n ||
    !publicClient ||
    !tokenIn?.address ||
    !tokenOut?.address
  ) {
    return estimate;
  }

  const path = getPath(tokenIn, tokenOut);

  if ([tokenIn.symbol, tokenOut.symbol].includes(tokens.mainnet.USDT.symbol)) {
    estimate = (
      await publicClient.simulateContract({
        address: contracts.mainnet.uniswapV3Quoter.address,
        abi: contracts.mainnet.uniswapV3Quoter.abi,
        functionName: 'quoteExactInputSingle',
        args: [tokenIn.address, tokenOut.address, 500, amountIn, 0n],
      })
    )?.result;
  } else if (path) {
    estimate = (
      await publicClient.simulateContract({
        address: contracts.mainnet.uniswapV3Quoter.address,
        abi: contracts.mainnet.uniswapV3Quoter.abi,
        functionName: 'quoteExactInput',
        args: [path, amountIn],
      })
    )?.result;
  }

  return estimate;
};

const estimateGas: EstimateGas = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config);

  if (
    amountIn === 0n ||
    !publicClient ||
    !tokenIn?.address ||
    !tokenOut?.address
  ) {
    return gasEstimate;
  }

  const { address } = getAccount(config);
  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );
  const path = getPath(tokenIn, tokenOut);

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
            amountIn,
            amountOutMinimum: minAmountOut[0],
            deadline: BigInt(Date.now() + 2 * 60 * 1000),
            fee: 500,
            recipient: address ?? ZERO_ADDRESS,
            sqrtPriceLimitX96: 0n,
          },
        ],
      });
    } else if (path) {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.mainnet.uniswapV3Router.address,
        abi: contracts.mainnet.uniswapV3Router.abi,
        functionName: 'exactInput',
        args: [
          {
            path,
            amountIn,
            amountOutMinimum: minAmountOut[0],
            deadline: BigInt(Date.now() + 2 * 60 * 1000),
            recipient: address ?? ZERO_ADDRESS,
          },
        ],
      });
    }
  } catch {
    gasEstimate = 165000n;
  }

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
    args: [address, contracts.mainnet.uniswapV3Router.address],
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
      args: [contracts.mainnet.uniswapV3Router.address, amountIn],
      account: address ?? ZERO_ADDRESS,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async (config, { tokenIn, tokenOut, amountIn }) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.uniswapV3Router.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Uniswap V3 is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  let txHash;
  if ([tokenIn.symbol, tokenOut.symbol].includes(tokens.mainnet.USDT.symbol)) {
    const { request } = await simulateContractWithTxTracker(config, {
      address: contracts.mainnet.uniswapV3Router.address,
      abi: contracts.mainnet.uniswapV3Router.abi,
      functionName: 'exactInputSingle',
      args: [
        {
          tokenIn: tokenIn.address,
          tokenOut: tokenOut.address,
          amountIn: amountIn,
          amountOutMinimum: minAmountOut[0],
          deadline: BigInt(Date.now() + 2 * 60 * 1000),
          fee: 500,
          recipient: address,
          sqrtPriceLimitX96: 0n,
        },
      ],
    });
    const hash = await writeContract(config, request);
    txHash = hash;
  } else {
    const { request } = await simulateContractWithTxTracker(config, {
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
    const hash = await writeContract(config, request);
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
