import { tokens } from '@origin/shared/contracts';
import { generateSwapRoutes } from '@origin/shared/providers';

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
  ...generateSwapRoutes<SuperOethbRoute>({
    tokensIn: [tokens.base.ETH, tokens.base.WETH],
    tokensOut: [tokens.base.superOETHb],
    swapRoute: {
      action: 'swap-aerodrome-superOethb',
    },
  }),
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
  ...generateSwapRoutes<SuperOethbRoute>({
    tokensIn: [tokens.base.ETH, tokens.base.WETH],
    tokensOut: [tokens.base.superOETHb, tokens.base.wsuperOETHb],
    swapRoute: {
      action: 'swap-magpie-superOethb',
      refreshInterval: 10000,
    },
  }),
  // OpenOcean
  ...generateSwapRoutes<SuperOethbRoute>({
    tokensIn: [tokens.base.ETH, tokens.base.WETH],
    tokensOut: [tokens.base.superOETHb, tokens.base.wsuperOETHb],
    swapRoute: {
      action: 'swap-openOcean-superOethb',
    },
  }),
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
