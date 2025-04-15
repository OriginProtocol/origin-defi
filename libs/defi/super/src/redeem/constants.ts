import { tokens } from '@origin/shared/contracts';
import { Aerodrome, superOETH } from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import type { SwapRoute } from '@origin/shared/providers';

import type { Meta, SuperOethRedeemAction } from './types';

export const WITHDRAW_DELAY = 10; // minutes

export const redeemRoutes: SwapRoute<SuperOethRedeemAction, Meta>[] = [
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.WETH,
    action: 'redeem-vault-async-superOeth',
    meta: {
      icon: superOETH,
      waitTime: defineMessage({ defaultMessage: 'a few days' }),
      waitTimeColor: 'warning.dark',
    },
  },
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.WETH,
    action: 'swap-aerodrome-superOeth',
    meta: {
      icon: Aerodrome,
      waitTime: defineMessage({
        defaultMessage: `instant`,
      }),
    },
  },
];
