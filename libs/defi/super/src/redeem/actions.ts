import {
  redeemAsyncOtoken,
  swapAerodromeSuperOeth,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { SuperOethRedeemAction } from './types';

export const redeemActions: Record<SuperOethRedeemAction, SwapApi> = {
  'redeem-vault-async-superOeth': {
    ...redeemAsyncOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Redeem via Origin Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Request withdrawal' }),
  },
  'swap-aerodrome-superOeth': {
    ...swapAerodromeSuperOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Aerodrome' }),
    buttonLabel: defineMessage({ defaultMessage: 'Redeem' }),
  },
};
