import { tokens } from '@origin/shared/contracts';
import { generateSwapRoutes } from '@origin/shared/providers';

import type { SwapRoute } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const oethSwapRoutes: SwapRoute<OethSwapAction>[] = [
  // Mint
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-zapper-oeth-eth',
    noSlippage: true,
  },
  // Redeem
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'redeem-arm-oeth',
  },
  // Wrap
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.wOETH,
    action: 'wrap-oeth-oeth',
    noSlippage: true,
  },
  // Unwrap
  {
    tokenIn: tokens.mainnet.wOETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'unwrap-oeth-woeth',
    noSlippage: true,
  },
  // Curve
  ...generateSwapRoutes<OethSwapAction>({
    tokensIn: [tokens.mainnet.ETH, tokens.mainnet.WETH],
    tokensOut: [tokens.mainnet.OETH],
    swapRoute: {
      action: 'swap-curve-oeth',
    },
    includeReturn: true,
  }),
  // Magpie
  ...generateSwapRoutes<OethSwapAction>({
    tokensIn: [tokens.mainnet.ETH, tokens.mainnet.WETH, tokens.mainnet.OUSD],
    tokensOut: [tokens.mainnet.OETH, tokens.mainnet.wOETH],
    swapRoute: {
      action: 'swap-magpie-oeth',
      refreshInterval: 10000,
    },
    includeReturn: true,
  }),
  // OpenOcean
  ...generateSwapRoutes<OethSwapAction>({
    tokensIn: [tokens.mainnet.ETH, tokens.mainnet.WETH, tokens.mainnet.OUSD],
    tokensOut: [tokens.mainnet.OETH, tokens.mainnet.wOETH],
    swapRoute: {
      action: 'swap-openOcean-oeth',
    },
    includeReturn: true,
  }),
  // Arbitrum
  // Balancer
  ...generateSwapRoutes<OethSwapAction>({
    tokensIn: [tokens.arbitrum.ETH, tokens.arbitrum.WETH],
    tokensOut: [tokens.arbitrum.wOETH],
    swapRoute: {
      action: 'swap-balancer-oeth',
    },
    includeReturn: true,
  }),
  // Magpie
  ...generateSwapRoutes<OethSwapAction>({
    tokensIn: [tokens.arbitrum.ETH, tokens.arbitrum.WETH],
    tokensOut: [tokens.arbitrum.wOETH],
    swapRoute: {
      action: 'swap-magpie-oeth',
      refreshInterval: 10000,
    },
    includeReturn: true,
  }),
  // OpenOcean
  ...generateSwapRoutes<OethSwapAction>({
    tokensIn: [tokens.arbitrum.ETH, tokens.arbitrum.WETH],
    tokensOut: [tokens.arbitrum.wOETH],
    swapRoute: {
      action: 'swap-openOcean-oeth',
    },
    includeReturn: true,
  }),
];
