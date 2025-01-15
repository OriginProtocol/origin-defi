import { tokens, vaults, whales } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { hasKey, isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { getAccount, getPublicClient, writeContract } from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

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

const REQUEST_GAS_PRICES = {
  [tokens.mainnet.OETH.id]: 161_000n,
  [tokens.base.superOETHb.id]: 1360n,
  [tokens.sonic.OS.id]: 1360n,
} as const;

const CLAIM_GAS_PRICES = {
  [tokens.mainnet.OETH.id]: 113_010n,
  [tokens.base.superOETHb.id]: 980n,
  [tokens.sonic.OS.id]: 980n,
} as const;

const isRouteAvailable: IsRouteAvailable = async () => {
  return true;
};

const estimateAmount: EstimateAmount = async (config, { amountIn }) => {
  return amountIn;
};

const estimateGas: EstimateGas = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  const vault = hasKey(vaults, tokenIn.id) ? vaults[tokenIn.id] : null;

  if (!vault) {
    return 0n;
  }

  const publicClient = getPublicClient(config, {
    chainId: vault.chainId,
  });

  if (amountIn === 0n || !publicClient || !tokenIn?.address) {
    return 0n;
  }

  const whale = hasKey(whales, tokenIn.id) ? whales[tokenIn.id] : ZERO_ADDRESS;
  let requestGasEstimate = 0n;
  try {
    requestGasEstimate = await publicClient.estimateContractGas({
      address: vault.address,
      abi: vault.abi,
      functionName: 'requestWithdrawal',
      args: [amountIn],
      account: whale,
    });
  } catch {
    requestGasEstimate = hasKey(REQUEST_GAS_PRICES, tokenIn.id)
      ? REQUEST_GAS_PRICES[tokenIn.id]
      : 0n;
  }

  const claimGasEstimate = hasKey(CLAIM_GAS_PRICES, tokenIn.id)
    ? CLAIM_GAS_PRICES[tokenIn.id]
    : 0n;

  return requestGasEstimate + claimGasEstimate;
};

const allowance: Allowance = async () => {
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  return 0n;
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

  const [estimatedAmount, allowanceAmount, approvalGas, gas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn }),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
      estimateGas(config, {
        tokenIn,
        tokenOut,
        amountIn,
        slippage,
      }),
    ]);

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

const approve: Approve = async () => {
  return null;
};

const swap: Swap = async ({ config }, { amountIn, tokenIn }) => {
  const { address } = getAccount(config);
  const vault = hasKey(vaults, tokenIn.id) ? vaults[tokenIn.id] : null;

  if (amountIn === 0n || isNilOrEmpty(address) || !vault) {
    return null;
  }

  const { request } = await simulateContractWithTxTracker(config, {
    address: vault.address,
    abi: vault.abi,
    functionName: 'requestWithdrawal',
    args: [amountIn],
    chainId: vault.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const redeemAsyncOtoken = {
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
