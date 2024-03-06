/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { queryClient } from '@origin/prime/shared';
import { contracts } from '@origin/shared/contracts';
import { getReferrerId } from '@origin/shared/providers';
import {
  isNilOrEmpty,
  subtractSlippage,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  readContracts,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits } from 'viem';

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
import type { HexAddress } from '@origin/shared/utils';

const isRouteAvailable: IsRouteAvailable = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  try {
    const paused = await readContract(config, {
      address: contracts.mainnet.lrtDepositPool.address,
      abi: contracts.mainnet.lrtDepositPool.abi,
      functionName: 'paused',
    });

    return !paused;
  } catch {}

  return true;
};

const estimateAmount: EstimateAmount = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  if (amountIn === 0n || !tokenIn?.address) {
    return 0n;
  }

  const [primeETHPrice, assetPrice] = await queryClient.fetchQuery({
    queryKey: ['asset-price', tokenOut.address],
    queryFn: () =>
      readContracts(config, {
        contracts: [
          {
            address: contracts.mainnet.lrtOracle.address,
            abi: contracts.mainnet.lrtOracle.abi,
            functionName: 'primeETHPrice',
          },
          {
            address: contracts.mainnet.lrtOracle.address,
            abi: contracts.mainnet.lrtOracle.abi,
            functionName: 'getAssetPrice',
            args: [tokenIn.address ?? ZERO_ADDRESS],
          },
        ],
      }),
    staleTime: 60e3,
  });

  return (
    (((assetPrice?.result as unknown as bigint) ?? 1n) * amountIn) /
    ((primeETHPrice?.result as unknown as bigint) ?? 1n)
  );
};

const estimateGas: EstimateGas = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !publicClient || !tokenIn?.address) {
    return gasEstimate;
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.lrtDepositPool.address,
      abi: contracts.mainnet.lrtDepositPool.abi,
      functionName: 'depositAsset',
      args: [tokenIn.address, amountIn, minAmountOut, 'Origin'],
    });
  } catch {}

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route, slippage },
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

const allowance: Allowance = async (config, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await queryClient.fetchQuery({
    queryKey: ['allowance', tokenIn.symbol],
    queryFn: () =>
      readContract(config, {
        address: tokenIn.address ?? ZERO_ADDRESS,
        abi: tokenIn.abi,
        functionName: 'allowance',
        args: [address, contracts.mainnet.lrtDepositPool.address],
      }),
    staleTime: 15e3,
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

  if (amountIn === 0n || !address || !publicClient || !tokenIn?.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.lrtDepositPool, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async (config, { tokenIn, amountIn }) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.lrtDepositPool.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);
  const referrerId = getReferrerId();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Flipper is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const { request } = await simulateContract(config, {
    address: contracts.mainnet.lrtDepositPool.address,
    abi: contracts.mainnet.lrtDepositPool.abi,
    functionName: 'depositAsset',
    args: [
      tokenIn.address as HexAddress,
      amountIn,
      minAmountOut,
      referrerId ?? '',
    ],
  });
  const hash = await writeContract(config, request);

  return hash;
};

export default {
  isRouteAvailable,
  estimateAmount,
  estimateRoute,
  allowance,
  approve,
  swap,
};
