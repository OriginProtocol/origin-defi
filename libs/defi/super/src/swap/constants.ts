import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const oethSwapRoutes: SwapRoute<OethSwapAction>[] = [
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-aerodrome-oeth',
    noSlippage: true,
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.superOETHb,
    action: 'mint-vault-oeth',
    noSlippage: true,
  },
  // Wrap
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'wrap-oeth-oeth',
    noSlippage: true,
  },
  // Unwrap
  {
    tokenIn: tokens.base.wsuperOETHb,
    tokenOut: tokens.base.superOETHb,
    action: 'unwrap-oeth-woeth',
    noSlippage: true,
  },
];
