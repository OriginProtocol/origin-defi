import { contracts, tokens } from '@origin/shared/contracts';
import { isNativeCurrency } from '@origin/shared/providers';
import {
  ETH_ADDRESS_CURVE,
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
import { path } from 'ramda';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';
import { base, mainnet } from 'viem/chains';

import { GAS_BUFFER } from '../constants';
import { defaultRoute } from '../defaultRoute';
import { oethCurveRoutes } from './routes/oeth';
import { ousdCurveRoutes } from './routes/ousd';
import { superOethbCurveRoutes } from './routes/superOethb';

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

const getCurveConfig = (tokenIn: Token, tokenOut: Token) => {
  if (
    tokenIn.id === tokens.mainnet.OETH.id ||
    tokenOut.id === tokens.mainnet.OETH.id
  ) {
    return path([tokenIn.symbol, tokenOut.symbol], oethCurveRoutes);
  } else if (
    tokenIn.id === tokens.mainnet.OUSD.id ||
    tokenOut.id === tokens.mainnet.OUSD.id
  ) {
    return path([tokenIn.symbol, tokenOut.symbol], ousdCurveRoutes);
  } else if (
    tokenIn.id === tokens.base.superOETHb.id ||
    tokenOut.id === tokens.base.superOETHb.id
  ) {
    return path([tokenIn.symbol, tokenOut.symbol], superOethbCurveRoutes);
  }

  return null;
};

const getCurveRouter = (chainId: number) => {
  if (chainId === mainnet.id) {
    return contracts.mainnet.CurveRouterNG;
  } else if (chainId === base.id) {
    return contracts.base.CurveRouterNG;
  }

  return null;
};

const isRouteAvailable: IsRouteAvailable = async (
  { config },
  { tokenIn, tokenOut },
) => {
  const curveConfig = getCurveConfig(tokenIn, tokenOut);
  const curveRouter = getCurveRouter(tokenIn.chainId);

  if (!curveConfig || !curveRouter) {
    return false;
  }

  return true;
};

const estimateAmount: EstimateAmount = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const curveConfig = getCurveConfig(tokenIn, tokenOut);
  const curveRouter = getCurveRouter(tokenIn.chainId);

  if (!curveConfig || !curveRouter) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const amountOut = await readContract(config, {
    address: curveRouter.address,
    abi: curveRouter.abi,
    functionName: 'get_dy',
    args: [
      curveConfig.routes,
      curveConfig.swapParams,
      amountIn,
      curveConfig.pools,
    ],
    chainId: curveRouter.chainId,
  });

  return amountOut as unknown as bigint;
};

const estimateGas: EstimateGas = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const curveConfig = getCurveConfig(tokenIn, tokenOut);
  const curveRouter = getCurveRouter(tokenIn.chainId);

  if (!curveConfig || !curveRouter) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  if (!publicClient) {
    return gasEstimate;
  }

  const isTokenInNative = isNativeCurrency(tokenIn);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: curveRouter.address,
      abi: curveRouter.abi,
      functionName: 'exchange',
      args: [
        curveConfig.routes,
        curveConfig.swapParams,
        amountIn,
        minAmountOut[0],
        curveConfig.pools,
      ],
      account: address ?? ETH_ADDRESS_CURVE,
      ...(isTokenInNative && { value: amountIn }),
    });
  } catch {
    gasEstimate = 350000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config, queryClient }, { tokenIn }) => {
  const { address } = getAccount(config);
  const curveRouter = getCurveRouter(tokenIn.chainId);

  if (!address || !curveRouter) {
    return 0n;
  }

  if (!tokenIn?.address) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, curveRouter.address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config, queryClient },
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const curveRouter = getCurveRouter(tokenIn.chainId);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (amountIn === 0n || !address || !publicClient || !curveRouter) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address ?? ZERO_ADDRESS,
      abi: erc20Abi,
      functionName: 'approve',
      args: [curveRouter.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async (
  client,
  { tokenIn, tokenOut, amountIn, route, slippage },
) => {
  if (amountIn === 0n) {
    return {
      ...route,
      estimatedAmount: 0n,
      gas: 0n,
      rate: 0,
      allowanceAmount: 0n,
      approvalGas: 0n,
    };
  }

  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount(client, { tokenIn, tokenOut, amountIn }),
    allowance(client, { tokenIn, tokenOut }),
    estimateApprovalGas(client, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(client, {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut: estimatedAmount,
    slippage,
  });

  return {
    ...route,
    estimatedAmount,
    gas,
    approvalGas,
    allowanceAmount,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const approve: Approve = async (
  { config, queryClient },
  { tokenIn, amountIn },
) => {
  const curveRouter = getCurveRouter(tokenIn.chainId);

  if (!tokenIn?.address || !curveRouter) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [curveRouter.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`Swap curve is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const curveConfig = getCurveConfig(tokenIn, tokenOut);
  const curveRouter = getCurveRouter(tokenIn.chainId);

  if (!curveConfig || !curveRouter) {
    throw new Error(
      `No curve route found, verify exchange mapping ${tokenIn.symbol} -> ${tokenOut.symbol}`,
    );
  }

  const estimatedGas = await estimateGas(
    { config, queryClient },
    {
      amountIn,
      slippage,
      tokenIn,
      tokenOut,
      amountOut,
    },
  );
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const isTokenInNative = isNativeCurrency(tokenIn);

  const { request } = await simulateContract(config, {
    address: curveRouter.address,
    abi: curveRouter.abi,
    functionName: 'exchange',
    args: [
      curveConfig.routes,
      curveConfig.swapParams,
      amountIn,
      minAmountOut[0],
      curveConfig.pools,
    ],
    gas,
    chainId: curveRouter.chainId,
    ...(isTokenInNative && { value: amountIn }),
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const swapCurve = {
  ...defaultRoute,
  isRouteAvailable,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
