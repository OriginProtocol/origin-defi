import { magpie, redeemAsyncOtoken } from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OSTokenRedeemAction } from './types';

export const redeemActions: Record<OSTokenRedeemAction, SwapApi> = {
  'redeem-vault-async-os': {
    ...redeemAsyncOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Redeem via Origin Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Request withdrawal' }),
  },
  'swap-magpie-os': {
    ...magpie,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Magpie' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap now' }),
  },
};
