import { contracts } from '@origin/shared/contracts';
import {
  simulateContractWithTxTracker,
  useCurve,
} from '@origin/shared/providers';
import {
  isAddressEqual,
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
import { formatUnits } from 'viem';

import { GAS_BUFFER, MAX_PRICE } from '../constants';
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

const isRouteAvailable: IsRouteAvailable = async (
  { config, queryClient },
  { amountIn, tokenIn, tokenOut },
) => {
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });
  try {
    const estimate = await readContract(config, {
      address: curve.CurveRegistryExchange.address,
      abi: curve.CurveRegistryExchange.abi,
      functionName: 'get_exchange_amount',
      args: [
        contracts.mainnet.OUSDCurveMetaPool.address,
        tokenIn.address,
        tokenOut.address,
        amountIn,
      ],
      chainId: curve.CurveRegistryExchange.chainId,
    });
    return (
      +formatUnits(amountIn, tokenIn.decimals) /
        +formatUnits(estimate as unknown as bigint, tokenOut.decimals) <
      MAX_PRICE
    );
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (
  { config, queryClient },
  { amountIn, tokenIn, tokenOut },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });
  const estimate = await readContract(config, {
    address: curve.CurveRegistryExchange.address,
    abi: curve.CurveRegistryExchange.abi,
    functionName: 'get_exchange_amount',
    args: [
      contracts.mainnet.OUSDCurveMetaPool.address,
      tokenIn.address,
      tokenOut.address,
      amountIn,
    ],
    chainId: curve.CurveRegistryExchange.chainId,
  });

  return estimate as unknown as bigint;
};

const estimateGas: EstimateGas = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config, {
    chainId: contracts.mainnet.OUSDCurveMetaPool.chainId,
  });

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
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OUSDCurveMetaPool.address,
      abi: contracts.mainnet.OUSDCurveMetaPool.abi,
      functionName: 'exchange_underlying',
      args: [
        BigInt(
          curve.OusdMetaPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenIn.address ?? ZERO_ADDRESS),
          ),
        ),
        BigInt(
          curve.OusdMetaPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenOut.address ?? ZERO_ADDRESS),
          ),
        ),
        amountIn,
        minAmountOut[0],
      ],
      account: address,
    });
  } catch {
    gasEstimate = 350000n;
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

const allowance: Allowance = async ({ config }, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OUSDCurveMetaPool.address],
    chainId: tokenIn.chainId,
  });

  return allowance as unknown as bigint;
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
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.OUSDCurveMetaPool.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async ({ config }, { tokenIn, amountIn }) => {
  if (amountIn === 0n || !tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.OUSDCurveMetaPool.address, amountIn],
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

  if (amountIn === 0n || !address || !tokenIn?.address || !tokenOut?.address) {
    return null;
  }

  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`Curve swap is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const estimatedGas = await estimateGas(
    { config, queryClient },
    {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut,
      slippage,
    },
  );
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;
  const curve = await queryClient.fetchQuery({
    queryKey: useCurve.getKey(),
    queryFn: useCurve.fetcher(config),
    staleTime: Infinity,
  });

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.OUSDCurveMetaPool.address,
    abi: contracts.mainnet.OUSDCurveMetaPool.abi,
    functionName: 'exchange_underlying',
    args: [
      BigInt(
        curve.OusdMetaPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenIn.address ?? ZERO_ADDRESS),
        ),
      ),
      BigInt(
        curve.OusdMetaPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenOut.address ?? ZERO_ADDRESS),
        ),
      ),
      amountIn,
      minAmountOut[0],
    ],
    account: address,
    gas,
    chainId: contracts.mainnet.OUSDCurveMetaPool.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const swapCurveOusd = {
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
