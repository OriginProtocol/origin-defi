import {
  mintVaultOusd,
  swapCurveOusd,
  swapFlipperOusd,
  swapSushiswapOusd,
  swapUniswapV2Ousd,
  swapUniswapV3Ousd,
  unwrapOusdWousd,
  wrapOusdWousd,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { SwapAction } from './types';

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
  'swap-flipper-ousd': {
    ...defaultApi,
    ...swapFlipperOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Flipper' }),
  },
  'mint-vault-ousd': {
    ...defaultApi,
    ...mintVaultOusd,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-sushiswap-ousd': {
    ...defaultApi,
    ...swapSushiswapOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via SushiSwap' }),
  },
  'swap-curve-ousd': {
    ...defaultApi,
    ...swapCurveOusd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
  },
  'swap-uniswap-v2-ousd': {
    ...defaultApi,
    ...swapUniswapV2Ousd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Uniswap V2' }),
  },
  'swap-uniswap-v3-ousd': {
    ...defaultApi,
    ...swapUniswapV3Ousd,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Uniswap V3' }),
  },
  'wrap-ousd-wousd': {
    ...defaultApi,
    ...wrapOusdWousd,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-ousd-wousd': {
    ...defaultApi,
    ...unwrapOusdWousd,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
