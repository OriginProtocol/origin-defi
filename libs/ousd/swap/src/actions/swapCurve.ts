import { contracts } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import {
  isAddressEqual,
  isNilOrEmpty,
  subtractSlippage,
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
  config,
  { amountIn, tokenIn, tokenOut, curve },
) => {
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
  config,
  { amountIn, tokenIn, tokenOut, curve },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

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
  });

  return estimate as unknown as bigint;
};

const estimateGas: EstimateGas = async (
  config,
  { tokenIn, tokenOut, amountIn, amountOut, slippage, curve },
) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const publicClient = getPublicClient(config);
  const { address } = getAccount(config);
  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OUSDCurveMetaPool.address,
      abi: contracts.mainnet.OUSDCurveMetaPool.abi,
      functionName: 'exchange_underlying',
      args: [
        BigInt(
          curve.OusdMetaPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenIn.address),
          ),
        ),
        BigInt(
          curve.OusdMetaPoolUnderlyings.findIndex((t) =>
            isAddressEqual(t, tokenOut.address),
          ),
        ),
        amountIn,
        minAmountOut,
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
  { tokenIn, tokenOut, amountIn, slippage, route, curve },
) => {
  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount(config, { tokenIn, tokenOut, amountIn, curve }),
    allowance(config, { tokenIn, tokenOut, curve }),
    estimateApprovalGas(config, { amountIn, tokenIn, tokenOut, curve }),
  ]);
  const gas = await estimateGas(config, {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut: estimatedAmount,
    slippage,
    curve,
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

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OUSDCurveMetaPool.address],
  });

  return allowance as unknown as bigint;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config);

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

const approve: Approve = async (config, { tokenIn, tokenOut, amountIn }) => {
  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.OUSDCurveMetaPool.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut, curve },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Curve swap is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const estimatedGas = await estimateGas(config, {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    slippage,
    curve,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.OUSDCurveMetaPool.address,
    abi: contracts.mainnet.OUSDCurveMetaPool.abi,
    functionName: 'exchange_underlying',
    args: [
      BigInt(
        curve.OusdMetaPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenIn.address),
        ),
      ),
      BigInt(
        curve.OusdMetaPoolUnderlyings.findIndex((t) =>
          isAddressEqual(t, tokenOut.address),
        ),
      ),
      amountIn,
      minAmountOut,
    ],
    account: address,
    gas,
  });
  const hash = await writeContract(config, request);

  return hash;
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
