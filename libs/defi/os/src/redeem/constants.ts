import { tokens } from '@origin/shared/contracts';
import { OS } from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import type { SwapRoute } from '@origin/shared/providers';

import type { Meta, OSTokenRedeemAction } from './types';

export const WITHDRAW_DELAY = 10; // minutes

export const redeemRoutes: SwapRoute<OSTokenRedeemAction, Meta>[] = [
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.wS,
    action: 'redeem-vault-async-os',
    meta: {
      icon: OS,
      waitTime: defineMessage({ defaultMessage: '1-15 days' }),
      waitTimeColor: 'warning.dark',
    },
  },
];
