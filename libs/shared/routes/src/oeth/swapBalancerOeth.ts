import { contracts } from '@origin/shared/contracts';
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
import { erc20Abi, formatUnits } from 'viem';

import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';
import type { EstimateAmount } from '@origin/shared/providers';

const WethWoethPoolId =
  '0xef0c116a2818a5b1a5d836a291856a321f43c2fb00020000000000000000053a';
const defaultUserData = '0x';
const deadline = 999999999999999999n;

const isRouteAvailable: IsRouteAvailable = async ({ config }, { tokenIn }) => {
  try {
    const pausedState = await readContract(config, {
      address: contracts.arbitrum.balancerVault.address,
      abi: contracts.arbitrum.balancerVault.abi,
      functionName: 'getPausedState',
      chainId: contracts.arbitrum.balancerVault.chainId,
    });

    return !pausedState?.[0];
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  if (amountIn === 0n || !tokenIn?.address || !tokenOut?.address) {
    return 0n;
  }

  const quote = await readContract(config, {
    address: contracts.arbitrum.balancerQueries.address,
    abi: contracts.arbitrum.balancerQueries.abi,
    functionName: 'querySwap',
    args: [
      {
        poolId: WethWoethPoolId,
        kind: 0,
        assetIn: tokenIn.address,
        assetOut: tokenOut.address,
        amount: amountIn,
        userData: defaultUserData,
      },
      {
        sender: ZERO_ADDRESS,
        fromInternalBalance: false,
        recipient: ZERO_ADDRESS,
        toInternalBalance: false,
      },
    ],
  });

  return quote;
};

const estimateGas: EstimateGas = async (
  { config },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  let gasEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (
    amountIn === 0n ||
    !publicClient ||
    !tokenIn?.address ||
    !tokenOut.address
  ) {
    return gasEstimate;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.arbitrum.balancerVault.address,
      abi: contracts.arbitrum.balancerVault.abi,
      functionName: 'swap',
      args: [
        {
          poolId: WethWoethPoolId,
          kind: 0,
          assetIn: tokenIn.address,
          assetOut: tokenOut.address,
          amount: amountIn,
          userData: defaultUserData,
        },
        {
          recipient: address ?? ZERO_ADDRESS,
          sender: address ?? ZERO_ADDRESS,
          fromInternalBalance: false,
          toInternalBalance: false,
        },
        minAmountOut[0],
        deadline,
      ],
    });
  } catch {
    gasEstimate = 220_000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.arbitrum.balancerVault.address],
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

  if (amountIn === 0n || !address || !publicClient || !tokenIn?.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [contracts.arbitrum.balancerVault.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
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
    estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(config, {
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
    amountOut: estimatedAmount,
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
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contracts.arbitrum.balancerVault.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);

  if (
    amountIn === 0n ||
    isNilOrEmpty(address) ||
    !tokenIn.address ||
    !tokenOut.address ||
    !address
  ) {
    return null;
  }

  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`Balancer vault is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const { request } = await simulateContract(config, {
    address: contracts.arbitrum.balancerVault.address,
    abi: contracts.arbitrum.balancerVault.abi,
    functionName: 'swap',
    args: [
      {
        poolId: WethWoethPoolId,
        kind: 0,
        assetIn: tokenIn.address,
        assetOut: tokenOut.address,
        amount: amountIn,
        userData: defaultUserData,
      },
      {
        recipient: address,
        sender: address,
        fromInternalBalance: false,
        toInternalBalance: false,
      },
      minAmountOut[0],
      deadline,
    ],
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const swapBalancerOeth = {
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
