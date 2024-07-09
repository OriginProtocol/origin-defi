import { formatUnits, maxUint256 } from 'viem';

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

const isRouteAvailable: IsRouteAvailable = async (
  config,
  { tokenIn, amountIn },
) => {
  return false;
};

const estimateAmount: EstimateAmount = async (config, { amountIn }) => {
  return amountIn;
};

const estimateGas: EstimateGas = async (config, { tokenIn, amountIn }) => {
  return 0n;
};

const allowance: Allowance = async (config, { tokenIn }) => {
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn },
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

const approve: Approve = async (config, { tokenIn, tokenOut, amountIn }) => {
  return null;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  return null;
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
