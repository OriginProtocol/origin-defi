import { contracts, tokens, whales } from '@origin/shared/contracts';
import {
  hasKey,
  includes,
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
import { erc20Abi, formatUnits, maxUint256 } from 'viem';
import { base } from 'viem/chains';

import { defaultRoute } from '../defaultRoute';

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

const zappers = {
  [base.id.toString()]: contracts.base.superOETHbZapper,
};

const isRouteAvailable: IsRouteAvailable = async (config, { tokenIn }) => {
  return hasKey(zappers, tokenIn.chainId);
};

const estimateAmount: EstimateAmount = async (
  { config },
  { amountIn, tokenIn, tokenOut },
) => {
  // ETH -> superOETHb
  if (
    tokenIn.id === tokens.base.ETH.id &&
    tokenOut.id === tokens.base.superOETHb.id
  ) {
    return amountIn;
  }

  // ETH, WETH -> wsuperOETHb
  if (
    includes([tokens.base.ETH.id, tokens.base.WETH.id], tokenIn.id) &&
    tokenOut.id === tokens.base.wsuperOETHb.id
  ) {
    return await readContract(config, {
      address: tokens.base.wsuperOETHb.address,
      abi: tokens.base.wsuperOETHb.abi,
      chainId: tokenIn.chainId,
      functionName: 'previewDeposit',
      args: [amountIn],
    });
  }

  return 0n;
};

const estimateGas: EstimateGas = async (
  { config },
  { amountIn, amountOut, tokenIn, tokenOut, slippage },
) => {
  let gasEstimate = 0n;

  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const account = hasKey(whales, tokenIn.id)
    ? whales[tokenIn.id]
    : (address ?? ZERO_ADDRESS);

  // ETH -> superOETHb
  if (
    tokenIn.id === tokens.base.ETH.id &&
    tokenOut.id === tokens.base.superOETHb.id
  ) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: zappers[tokenIn.chainId].address,
        abi: zappers[tokenIn.chainId].abi,
        functionName: 'deposit',
        value: amountIn,
        account,
      });
    } catch {
      gasEstimate = 200000n;
    }
  }

  // ETH -> wsuperOETHb
  if (
    tokenIn.id === tokens.base.ETH.id &&
    tokenOut.id === tokens.base.wsuperOETHb.id
  ) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: zappers[tokenIn.chainId].address,
        abi: zappers[tokenIn.chainId].abi,
        functionName: 'depositETHForWrappedTokens',
        value: amountIn,
        args: [minAmountOut[0]],
        account,
      });
    } catch {
      gasEstimate = 200000n;
    }
  }

  // WETH -> wsuperOETHb
  if (
    tokenIn.id === tokens.base.WETH.id &&
    tokenOut.id === tokens.base.wsuperOETHb.id
  ) {
    try {
      gasEstimate = await publicClient.estimateContractGas({
        address: zappers[tokenIn.chainId].address,
        abi: zappers[tokenIn.chainId].abi,
        functionName: 'depositWETHForWrappedTokens',
        args: [amountIn, minAmountOut[0]],
        account,
      });
    } catch {
      gasEstimate = 200000n;
    }
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (!address) {
    return 0n;
  }

  if (!tokenIn?.address) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, zappers[tokenIn.chainId].address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (amountIn === 0n || !tokenIn?.address || !publicClient) {
    return approvalEstimate;
  }

  const account = hasKey(whales, tokenIn.id)
    ? whales[tokenIn.id]
    : (address ?? ZERO_ADDRESS);

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [zappers[tokenIn.chainId].address, amountIn],
      account,
    });
  } catch {
    approvalEstimate = 51_700n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async (
  config,
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
    estimateAmount(config, { tokenIn, tokenOut, amountIn }),

    allowance(config, { tokenIn, tokenOut }),
    estimateApprovalGas(config, { tokenIn, tokenOut, amountIn }),
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
    gas,
    approvalGas,
    allowanceAmount,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const approve: Approve = async ({ config }, { tokenIn, amountIn }) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [zappers[tokenIn.chainId].address, amountIn],
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
    throw new Error(`Swap zapper is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  // ETH -> superOETHb
  if (
    tokenIn.id === tokens.base.ETH.id &&
    tokenOut.id === tokens.base.superOETHb.id
  ) {
    const { request } = await simulateContract(config, {
      address: zappers[tokenIn.chainId].address,
      abi: zappers[tokenIn.chainId].abi,
      functionName: 'deposit',
      value: amountIn,
      chainId: tokenIn.chainId,
    });
    return await writeContract(config, request);
  }

  // ETH -> wsuperOETHb
  if (
    tokenIn.id === tokens.base.ETH.id &&
    tokenOut.id === tokens.base.wsuperOETHb.id
  ) {
    const { request } = await simulateContract(config, {
      address: zappers[tokenIn.chainId].address,
      abi: zappers[tokenIn.chainId].abi,
      functionName: 'depositETHForWrappedTokens',
      value: amountIn,
      args: [minAmountOut[0]],
      chainId: tokenIn.chainId,
    });
    return await writeContract(config, request);
  }

  // WETH -> wsuperOETHb
  if (
    tokenIn.id === tokens.base.WETH.id &&
    tokenOut.id === tokens.base.wsuperOETHb.id
  ) {
    const { request } = await simulateContract(config, {
      address: zappers[tokenIn.chainId].address,
      abi: zappers[tokenIn.chainId].abi,
      functionName: 'depositWETHForWrappedTokens',
      args: [amountIn, minAmountOut[0]],
      chainId: tokenIn.chainId,
    });
    return await writeContract(config, request);
  }

  return null;
};

export const swapZapperSuperOeth = {
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
