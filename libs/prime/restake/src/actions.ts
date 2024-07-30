import {
  restakePrime,
  swapUniswapPrime,
  swapZapperPrime,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { RestakeAction } from './types';

export const restakeActions: Record<RestakeAction, SwapApi> = {
  'restake-prime': {
    ...restakePrime,
    buttonLabel: defineMessage({ defaultMessage: 'Stake' }),
    routeLabel: defineMessage({ defaultMessage: 'PrimeStaked' }),
  },
  'swap-uniswap-prime': {
    ...swapUniswapPrime,
    buttonLabel: defineMessage({ defaultMessage: 'Swap with Uniswap' }),
    routeLabel: defineMessage({ defaultMessage: 'Uniswap V3' }),
  },
  'swap-zapper-prime': {
    ...swapZapperPrime,
    buttonLabel: defineMessage({ defaultMessage: 'Stake' }),
    routeLabel: defineMessage({ defaultMessage: 'PrimeStaked' }),
  },
};
