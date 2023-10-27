import type { SwapAction, SwapApi } from '../types';

const defaultApi: SwapApi = {
  estimateAmount: async ({ amountIn }) => {
    console.log('Amount estimation not implemented');

    return amountIn;
  },
  estimateGas: async () => {
    console.log('Gas estimation not implemented');

    return 0n;
  },
  estimateRoute: async ({ amountIn, route }) => {
    console.log('Route estimation not implemented');

    return {
      ...route,
      estimatedAmount: amountIn,
      allowanceAmount: 0n,
      approvalGas: 0n,
      gas: 0n,
      rate: 0,
    };
  },
  allowance: async () => {
    console.log('Allowance not implemented');

    return 0n;
  },
  estimateApprovalGas: async () => {
    console.log('Gas approval estimation not implemented');

    return 0n;
  },
  approve: async () => {
    console.log('Approve operation not implemented');
    return null;
  },
  swap: async () => {
    console.log('Route swap operation not implemented');
    return null;
  },
};

export const swapActions: Record<SwapAction, SwapApi> = {
  flipper: { ...defaultApi },
  'uniswap-v2': { ...defaultApi },
  'uniswap-v3': { ...defaultApi },
  sushiswap: { ...defaultApi },
  vault: { ...defaultApi },
  'swap-curve': { ...defaultApi },
};
