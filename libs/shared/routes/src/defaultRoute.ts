import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

const message = (value: string) =>
  `'${value}' is using default implementation, you should not see this message.`;

export const defaultRoute: SwapApi = {
  isRouteAvailable: async () => true,
  estimateAmount: async (config, { amountIn }) => {
    console.log(message('Amount estimation'));

    return amountIn;
  },
  estimateGas: async () => {
    console.log(message('Gas estimation'));

    return 0n;
  },
  estimateRoute: async (config, { amountIn, route }) => {
    console.log(message('Route estimation'));

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
    console.log(message('Allowance'));

    return 0n;
  },
  estimateApprovalGas: async () => {
    console.log(message('Gas approval estimation'));

    return 0n;
  },
  approve: async () => {
    console.log(message('Approve operation'));

    return null;
  },
  swap: async () => {
    console.log(message('Route swap operation'));

    return null;
  },
  buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  routeLabel: defineMessage({ defaultMessage: 'Swap' }),
};
