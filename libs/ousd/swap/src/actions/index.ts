import { defineMessage } from 'react-intl';

import flipper from './flipper';
import mintVault from './mintVault';
import sushiswap from './sushiswap';
import swapCurve from './swapCurve';
import uniswapV2 from './uniswapV2';
import uniswapV3 from './uniswapV3';
import unwrapWOUSD from './unwrapWOUSD';
import wrapOUSD from './wrapOUSD';

import type { SwapApi } from '@origin/shared/providers';

import type { SwapAction } from '../types';

const defaultApi: SwapApi = {
  isRouteAvailable: async () => true,
  estimateAmount: async (config, { amountIn }) => {
    console.log('Amount estimation not implemented');

    return amountIn;
  },
  estimateGas: async () => {
    console.log('Gas estimation not implemented');

    return 0n;
  },
  estimateRoute: async (config, { amountIn, route }) => {
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
  'mint-vault': {
    ...defaultApi,
    ...mintVault,
    routeLabel: defineMessage({ defaultMessage: 'Origin Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
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
  'wrap-ousd': {
    ...defaultApi,
    ...wrapOUSD,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-wousd': {
    ...defaultApi,
    ...unwrapWOUSD,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
