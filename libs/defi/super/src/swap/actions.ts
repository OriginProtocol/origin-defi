import {
  mintVaultOeth,
  unwrapOethWoeth,
  wrapOethWoeth,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const oethSwapActions: Record<OethSwapAction, SwapApi> = {
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
