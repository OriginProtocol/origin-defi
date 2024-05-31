import { defineMessage } from 'react-intl';

import mintVault from './mintVault';
import swapCurve from './swapCurve';
import swapCurveEth from './swapCurveEth';
import swapCurveSfrxeth from './swapCurveSfrxeth';
import swapZapperEth from './swapZapperEth';
import swapZapperSfrxeth from './swapZapperSfrxeth';
import unwrapWOETH from './unwrapWOETH';
import wrapOETH from './wrapOETH';

import type { SwapApi } from '@origin/shared/providers';

import type { OethSwapAction } from '../types';

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
  'swap-curve': {
    ...defaultApi,
    ...swapCurve,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-eth': {
    ...defaultApi,
    ...swapCurveEth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via CurvePool' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-sfrxeth': {
    ...defaultApi,
    ...swapCurveSfrxeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-zapper-eth': {
    ...defaultApi,
    ...swapZapperEth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-zapper-sfrxeth': {
    ...defaultApi,
    ...swapZapperSfrxeth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'mint-vault': {
    ...defaultApi,
    ...mintVault,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'wrap-oeth': {
    ...defaultApi,
    ...wrapOETH,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-woeth': {
    ...defaultApi,
    ...unwrapWOETH,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
