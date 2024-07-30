import { redeemVaultOeth, SwapCurveOeth } from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethRedeemAction } from './types';

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
  buttonLabel: defineMessage({ defaultMessage: 'Redeem' }),
  routeLabel: defineMessage({ defaultMessage: 'Redeem' }),
};

export const redeemActions: Record<OethRedeemAction, SwapApi> = {
  'swap-curve-oeth': {
    ...defaultApi,
    ...SwapCurveOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Redeem' }),
  },
  'redeem-vault-oeth': {
    ...defaultApi,
    ...redeemVaultOeth,
    routeLabel: defineMessage({ defaultMessage: 'Redeem via OETH Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Redeem' }),
  },
};
