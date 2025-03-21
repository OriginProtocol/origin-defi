import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';
import type { SuperOethbRoute } from '@origin/shared/routes';

export const superOethbSwapRoutes: SwapRoute<SuperOethbRoute>[] = [
  // default route
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-zapper-superOethb',
    noSlippage: true,
  },
  // Aerodrome
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
  // Curve
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.WETH,
    action: 'swap-curve-superOethb',
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-curve-superOethb',
  },
  // Magpie
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.ETH,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.WETH,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.base.wsuperOETHb,
    tokenOut: tokens.base.ETH,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.base.wsuperOETHb,
    tokenOut: tokens.base.WETH,
    action: 'swap-magpie-superOethb',
    refreshInterval: 10000,
  },
  // Mint
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.superOETHb,
    action: 'mint-vault-oeth',
    noSlippage: true,
  },
  // Zapper
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
