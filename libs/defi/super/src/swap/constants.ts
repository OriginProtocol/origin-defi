import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';
import type { SuperOethbRoute } from '@origin/shared/routes';

export const superOethbSwapRoutes: SwapRoute<SuperOethbRoute>[] = [
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-zapper-superOethb',
    noSlippage: true,
  },
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'swap-zapper-superOethb',
    noSlippage: true,
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'swap-zapper-superOethb',
    noSlippage: true,
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.superOETHb,
    action: 'mint-vault-oeth',
    noSlippage: true,
  },
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-aerodrome-superOethb',
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-aerodrome-superOethb',
  },
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.ETH,
    action: 'swap-aerodrome-superOethb',
  },
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.WETH,
    action: 'swap-aerodrome-superOethb',
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
