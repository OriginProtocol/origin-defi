import {
  magpie,
  mintOtoken,
  openOcean,
  swapAerodromeSuperOethb,
  swapCurve,
  swapZapperSuperOethb,
  wrapOtoken,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';
import type { SuperOethbRoute } from '@origin/shared/routes';

export const oethSwapActions: Partial<Record<SuperOethbRoute, SwapApi>> = {
  'mint-vault-oeth': {
    ...mintOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-aerodrome-superOethb': {
    ...swapAerodromeSuperOethb,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Aerodrome' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-superOethb': {
    ...swapCurve,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-zapper-superOethb': {
    ...swapZapperSuperOethb,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'wrap-oeth-oeth': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-oeth-woeth': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
  'swap-magpie-superOethb': {
    ...magpie,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Magpie' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-openOcean-superOethb': {
    ...openOcean,
    routeLabel: defineMessage({ defaultMessage: 'Swap with OpenOcean' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
};
