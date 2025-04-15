import {
  magpie,
  mintOtoken,
  openOcean,
  swapAerodromeSuperOeth,
  swapCurve,
  swapZapperSuperOeth,
  wrapOtoken,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';
import type { SuperOethRoute } from '@origin/shared/routes';

export const oethSwapActions: Partial<Record<SuperOethRoute, SwapApi>> = {
  'mint-vault-superOeth': {
    ...mintOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-aerodrome-superOeth': {
    ...swapAerodromeSuperOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Aerodrome' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-curve-superOeth': {
    ...swapCurve,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-zapper-superOeth': {
    ...swapZapperSuperOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Zapper' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'wrap-superOeth-wsuperOeth': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-wsuperOeth-superOeth': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
  'swap-magpie-superOeth': {
    ...magpie,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Magpie' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-openOcean-superOeth': {
    ...openOcean,
    routeLabel: defineMessage({ defaultMessage: 'Swap with OpenOcean' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
};
