import { tokens } from '@origin/shared/contracts';
import { ARM, OETH } from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import type { SwapRoute } from '@origin/shared/providers';

import type { Meta, OethRedeemAction } from './types';

export const GAS_BUFFER = 10n; // 10%

export const redeemRoutes: SwapRoute<OethRedeemAction, Meta>[] = [
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.WETH,
  //   action: 'swap-curve',
  // },
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.WETH,
  //   action: 'redeem-vault',
  // },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'arm',
    meta: {
      icon: ARM,
      waitTime: defineMessage({ defaultMessage: '~1 min' }),
      comingSoon: true,
    },
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'redeem-vault-async',
    meta: {
      icon: OETH,
      waitTime: defineMessage({ defaultMessage: '~30 min - few days' }),
      waitTimeColor: 'warning.main',
    },
  },
];
