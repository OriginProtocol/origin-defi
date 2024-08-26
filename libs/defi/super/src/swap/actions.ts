import {
  mintVaultOeth,
  swapAerodromeSuperOethb,
  swapZapperSuperOethb,
  unwrapOethWoeth,
  wrapOethWoeth,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';
import type { SuperOethbRoute } from '@origin/shared/routes';

export const oethSwapActions: Record<SuperOethbRoute, SwapApi> = {
  'mint-vault-oeth': {
    ...mintVaultOeth,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'swap-aerodrome-superOethb': {
    ...swapAerodromeSuperOethb,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Aerodrome' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-zapper-superOethb': {
    ...swapZapperSuperOethb,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'wrap-oeth-oeth': {
    ...wrapOethWoeth,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-oeth-woeth': {
    ...unwrapOethWoeth,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
};
