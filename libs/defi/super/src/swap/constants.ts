import { tokens } from '@origin/shared/contracts';
import { generateSwapRoutes } from '@origin/shared/providers';

import type { SwapRoute } from '@origin/shared/providers';
import type { SuperOethRoute } from '@origin/shared/routes';

export const superOethSwapRoutes: SwapRoute<SuperOethRoute>[] = [
  // Base
  // default route
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-zapper-superOeth',
    noSlippage: true,
  },
  // Aerodrome
  ...generateSwapRoutes<SuperOethRoute>({
    tokensIn: [tokens.base.ETH, tokens.base.WETH],
    tokensOut: [tokens.base.superOETHb],
    swapRoute: {
      action: 'swap-aerodrome-superOeth',
    },
  }),
  // Curve
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.WETH,
    action: 'swap-curve-superOeth',
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.superOETHb,
    action: 'swap-curve-superOeth',
  },
  // Magpie
  ...generateSwapRoutes<SuperOethRoute>({
    tokensIn: [tokens.base.ETH, tokens.base.WETH],
    tokensOut: [tokens.base.superOETHb, tokens.base.wsuperOETHb],
    swapRoute: {
      action: 'swap-magpie-superOeth',
      refreshInterval: 10000,
    },
  }),
  // OpenOcean
  ...generateSwapRoutes<SuperOethRoute>({
    tokensIn: [tokens.base.ETH, tokens.base.WETH],
    tokensOut: [tokens.base.superOETHb, tokens.base.wsuperOETHb],
    swapRoute: {
      action: 'swap-openOcean-superOeth',
    },
  }),
  // Mint
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.superOETHb,
    action: 'mint-vault-superOeth',
    noSlippage: true,
  },
  // Zapper
  {
    tokenIn: tokens.base.ETH,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'swap-zapper-superOeth',
    noSlippage: true,
  },
  {
    tokenIn: tokens.base.WETH,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'swap-zapper-superOeth',
    noSlippage: true,
  },
  // Wrap
  {
    tokenIn: tokens.base.superOETHb,
    tokenOut: tokens.base.wsuperOETHb,
    action: 'wrap-superOeth-wsuperOeth',
    noSlippage: true,
  },
  // Unwrap
  {
    tokenIn: tokens.base.wsuperOETHb,
    tokenOut: tokens.base.superOETHb,
    action: 'unwrap-wsuperOeth-superOeth',
    noSlippage: true,
  },
  // Plume
  // Magpie
  ...generateSwapRoutes<SuperOethRoute>({
    tokensIn: [tokens.plume.PLUME, tokens.base.WETH],
    tokensOut: [tokens.plume.superOETHp, tokens.plume.wsuperOETHp],
    swapRoute: {
      action: 'swap-magpie-superOeth',
      refreshInterval: 10000,
    },
  }),
  // OpenOcean
  ...generateSwapRoutes<SuperOethRoute>({
    tokensIn: [tokens.plume.PLUME, tokens.base.WETH],
    tokensOut: [tokens.plume.superOETHp, tokens.plume.wsuperOETHp],
    swapRoute: {
      action: 'swap-openOcean-superOeth',
    },
  }),
  // Wrap
  {
    tokenIn: tokens.plume.superOETHp,
    tokenOut: tokens.plume.wsuperOETHp,
    action: 'wrap-superOeth-wsuperOeth',
    noSlippage: true,
  },
  // Unwrap
  {
    tokenIn: tokens.base.wsuperOETHb,
    tokenOut: tokens.base.superOETHb,
    action: 'unwrap-wsuperOeth-superOeth',
    noSlippage: true,
  },
];
