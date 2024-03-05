import { defineMessage } from 'react-intl';

import restake from './restake';
import uniswap from './uniwsap';
import zapper from './zapper';

import type { SwapApi } from '@origin/shared/providers';

import type { RestakeAction } from '../types';

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
  routeLabel: defineMessage({ defaultMessage: 'Stake' }),
  buttonLabel: defineMessage({ defaultMessage: 'Stake' }),
};

export const restakeActions: Record<RestakeAction, SwapApi> = {
  restake: {
    ...defaultApi,
    ...restake,
  },
  uniswap: {
    ...defaultApi,
    ...uniswap,
    buttonLabel: defineMessage({ defaultMessage: 'Swap with Uniswap' }),
    routeLabel: defineMessage({ defaultMessage: 'Uniswap V3' }),
  },
  zapper: {
    ...defaultApi,
    ...zapper,
    buttonLabel: defineMessage({ defaultMessage: 'Swap with Zapper' }),
    routeLabel: defineMessage({ defaultMessage: 'Zapper' }),
  },
};
