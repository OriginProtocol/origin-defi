import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { RedeemAction } from './types';

export const GAS_BUFFER = 10n; // 10%

export const redeemRoutes: SwapRoute<RedeemAction>[] = [
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'redeem-vault',
  },
];
