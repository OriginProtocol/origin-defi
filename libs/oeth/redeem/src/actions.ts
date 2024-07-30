import { redeemVaultOeth, SwapCurveOeth } from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OethRedeemAction } from './types';

export const redeemActions: Record<OethRedeemAction, SwapApi> = {
  'swap-curve-oeth': {
    ...SwapCurveOeth,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Curve' }),
    buttonLabel: defineMessage({ defaultMessage: 'Redeem' }),
  },
  'redeem-vault-oeth': {
    ...redeemVaultOeth,
    routeLabel: defineMessage({ defaultMessage: 'Redeem via OETH Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Redeem' }),
  },
};
