import {
  mintVaultOeth,
  SwapCurveOeth,
  swapCurveOethEth,
  swapCurveOethSfrxeth,
  swapZapperOethEth,
  swapZapperOethSfrxeth,
  unwrapOethWoeth,
  wrapOethWoeth,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

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
  buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  routeLabel: defineMessage({ defaultMessage: 'Swap' }),
};

export const oethSwapActions: Record<OethSwapAction, SwapApi> = {
  'swap-curve-oeth': {
    ...defaultApi,
    ...SwapCurveOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-oeth-eth': {
    ...defaultApi,
    ...swapCurveOethEth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via CurvePool' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-oeth-sfrxeth': {
    ...defaultApi,
    ...swapCurveOethSfrxeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-zapper-oeth-eth': {
    ...defaultApi,
    ...swapZapperOethEth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-zapper-oeth-sfrxeth': {
    ...defaultApi,
    ...swapZapperOethSfrxeth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'mint-vault-oeth': {
    ...defaultApi,
    ...mintVaultOeth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'wrap-oeth-oeth': {
    ...defaultApi,
    ...wrapOethWoeth,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-oeth-woeth': {
    ...defaultApi,
    ...unwrapOethWoeth,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
