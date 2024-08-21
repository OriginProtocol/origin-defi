import {
  mintVaultOeth,
  swapAerodromeOeth,
  unwrapOethWoeth,
  wrapOethWoeth,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const oethSwapActions: Record<OethSwapAction, SwapApi> = {
  'swap-aerodrome-oeth': {
    ...swapAerodromeOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Aerodrome' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'mint-vault-oeth': {
    ...mintVaultOeth,
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
