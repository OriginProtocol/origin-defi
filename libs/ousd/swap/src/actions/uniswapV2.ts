import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async () => true;

const estimateAmount: EstimateAmount = async ({ amountIn }) => {
  console.log('Amount estimation not implemented');

  return amountIn;
};

const estimateGas = async () => {
  console.log('Gas estimation not implemented');

  return 0n;
};

const estimateRoute: EstimateRoute = async ({ amountIn, route }) => {
  console.log('Route estimation not implemented');

  return {
    ...route,
    estimatedAmount: amountIn,
    allowanceAmount: 0n,
    approvalGas: 0n,
    gas: 0n,
    rate: 0,
  };
};

const allowance: Allowance = async () => {
  console.log('Allowance not implemented');

  return 0n;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  console.log('Gas approval estimation not implemented');

  return 0n;
};

const approve: Approve = async () => {
  console.log('Approve operation not implemented');
  return null;
};

const swap: Swap = async () => {
  console.log('Route swap operation not implemented');
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
