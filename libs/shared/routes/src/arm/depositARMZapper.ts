import { contracts, whales } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  readContracts,
  writeContract,
} from '@wagmi/core';
import { from, gt } from 'dnum';
import { formatUnits, maxUint256 } from 'viem';

import { GAS_BUFFER } from '../constants';
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
import type { Dnum } from 'dnum';

const isRouteAvailable: IsRouteAvailable = async (
  { config },
  { amountIn, tokenIn },
) => {
  const { address } = getAccount(config);
  try {
    const caps = await readContracts(config, {
      contracts: [
        {
          address: contracts.mainnet.ARMPoolController.address,
          abi: contracts.mainnet.ARMPoolController.abi,
          functionName: 'totalAssetsCap',
        },
        {
          address: contracts.mainnet.ARMPoolController.address,
          abi: contracts.mainnet.ARMPoolController.abi,
          functionName: 'liquidityProviderCaps',
          args: [address ?? ZERO_ADDRESS],
        },
      ],
    });

    const waveCap =
      caps[0].status === 'success'
        ? ([BigInt(caps[0].result), tokenIn.decimals] as Dnum)
        : from(0);
    const userCap =
      !!address && caps[1].status === 'success'
        ? ([BigInt(caps[1].result), tokenIn.decimals] as Dnum)
        : from(0);

    return isNilOrEmpty(address)
      ? gt(waveCap, 0)
      : gt(waveCap, 0) &&
          gt(userCap, 0) &&
          gt(userCap, [amountIn, tokenIn.decimals]);
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async ({ config }, { amountIn }) => {
  const res = await readContract(config, {
    address: contracts.mainnet.ARMstETHWETHPool.address,
    abi: contracts.mainnet.ARMstETHWETHPool.abi,
    functionName: 'previewDeposit',
    args: [amountIn],
  });

  return res;
};

const estimateGas: EstimateGas = async ({ config }, { amountIn }) => {
  let gasEstimate = 200000n;

  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, {
    chainId: contracts.mainnet.ARMZapperLido.chainId,
  });

  if (amountIn === 0n || !address || !publicClient) {
    return gasEstimate;
  }

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.ARMZapperLido.address,
      abi: contracts.mainnet.ARMZapperLido.abi,
      functionName: 'deposit',
      value: amountIn,
      account: address ?? whales.mainnet.ETH,
    });
  } catch {}

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
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

  const [estimatedAmount, gas, allowanceAmount, approvalGas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn }),
      estimateGas(config, { tokenIn, tokenOut, amountIn, slippage }),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { tokenIn, tokenOut, amountIn }),
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

const approve: Approve = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  return null;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage },
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
    throw new Error(`Deposit ARM zapper is not approved`);
  }

  const estimatedGas = await estimateGas(
    { config, queryClient },
    {
      tokenIn,
      tokenOut,
      amountIn,
      slippage,
    },
  );
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.ARMZapperLido.address,
    abi: contracts.mainnet.ARMZapperLido.abi,
    functionName: 'deposit',
    value: amountIn,
    gas,
    chainId: contracts.mainnet.ARMZapperLido.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const depositARMZapper = {
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
