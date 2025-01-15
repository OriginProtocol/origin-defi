import { redeemArmOeth, redeemAsyncOtoken } from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethRedeemAction } from './types';

export const redeemActions: Record<OethRedeemAction, SwapApi> = {
  'redeem-arm-oeth': {
    ...redeemArmOeth,
    routeLabel: defineMessage({ defaultMessage: 'Redeem via the ARM' }),
    buttonLabel: defineMessage({ defaultMessage: 'Redeem' }),
  },
  'redeem-vault-async-oeth': {
    ...redeemAsyncOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Redeem via OETH Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Request withdrawal' }),
  },
};
