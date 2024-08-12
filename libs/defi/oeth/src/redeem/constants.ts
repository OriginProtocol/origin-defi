import { tokens } from '@origin/shared/contracts';
import { ARM, OETH } from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import type { SwapRoute } from '@origin/shared/providers';

import type { Meta, OethRedeemAction } from './types';

export const WITHDRAW_DELAY = 10; // minutes

export const redeemRoutes: SwapRoute<OethRedeemAction, Meta>[] = [
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'redeem-arm-oeth',
    meta: {
      icon: ARM,
      waitTime: defineMessage({ defaultMessage: '~1 min' }),
      comingSoon: true,
    },
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'redeem-vault-async-oeth',
    meta: {
      icon: OETH,
      waitTime: defineMessage({
        defaultMessage: `a few days`,
      }),
      waitTimeColor: 'warning.dark',
    },
  },
];
