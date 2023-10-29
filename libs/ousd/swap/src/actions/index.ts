import { defineMessage } from 'react-intl';

import flipper from './flipper';
import originVault from './originVault';
import sushiswap from './sushiswap';
import swapCurve from './swapCurve';
import uniswapV2 from './uniswapV2';
import uniswapV3 from './uniswapV3';

import type { SwapApi } from '@origin/shared/providers';

import type { SwapAction } from '../types';

const defaultApi: SwapApi = {
  isRouteAvailable: async () => true,
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
  routeLabel: defineMessage({ defaultMessage: 'Swap' }),
  buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
};

export const swapActions: Record<SwapAction, SwapApi> = {
  flipper: {
    ...defaultApi,
    ...flipper,
    routeLabel: defineMessage({ defaultMessage: 'Flipper' }),
  },
  'origin-vault': {
    ...defaultApi,
    ...originVault,
    routeLabel: defineMessage({ defaultMessage: 'Origin Vault' }),
  },
  sushiswap: {
    ...defaultApi,
    ...sushiswap,
    routeLabel: defineMessage({ defaultMessage: 'SushiSwap' }),
  },
  'swap-curve': {
    ...defaultApi,
    ...swapCurve,
    routeLabel: defineMessage({ defaultMessage: 'Curve' }),
  },
  'uniswap-v2': {
    ...defaultApi,
    ...uniswapV2,
    routeLabel: defineMessage({ defaultMessage: 'Uniswap V2' }),
  },
  'uniswap-v3': {
    ...defaultApi,
    ...uniswapV3,
    routeLabel: defineMessage({ defaultMessage: 'Uniswap V3' }),
  },
};
