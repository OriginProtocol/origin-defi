import { tokens } from '@origin/shared/contracts';
import { generateSwapRoutes } from '@origin/shared/providers';

import type { SwapRoute } from '@origin/shared/providers';

import type { OusdSwapAction } from './types';

export const ousdSwapRoutes: SwapRoute<OusdSwapAction>[] = [
  // Mint
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'mint-vault-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'mint-vault-ousd',
  },
  // Wrap
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.wOUSD,
    action: 'wrap-ousd-wousd',
    noSlippage: true,
  },
  // Unwrap
  {
    tokenIn: tokens.mainnet.wOUSD,
    tokenOut: tokens.mainnet.OUSD,
    action: 'unwrap-ousd-wousd',
    noSlippage: true,
  },
  // Flipper
  ...generateSwapRoutes<OusdSwapAction>({
    tokensIn: [tokens.mainnet.USDC, tokens.mainnet.USDT],
    tokensOut: [tokens.mainnet.OUSD],
    swapRoute: {
      action: 'swap-flipper-ousd',
      noSlippage: true,
    },
    includeReturn: true,
  }),
  // Curve
  ...generateSwapRoutes<OusdSwapAction>({
    tokensIn: [tokens.mainnet.USDC, tokens.mainnet.USDS, tokens.mainnet.USDT],
    tokensOut: [tokens.mainnet.OUSD],
    swapRoute: {
      action: 'swap-curve-ousd',
    },
    includeReturn: true,
  }),
  // Magpie
  ...generateSwapRoutes<OusdSwapAction>({
    tokensIn: [
      tokens.mainnet.USDC,
      tokens.mainnet.USDS,
      tokens.mainnet.USDT,
      tokens.mainnet.OETH,
      tokens.mainnet.ETH,
    ],
    tokensOut: [tokens.mainnet.OUSD, tokens.mainnet.wOUSD],
    swapRoute: {
      action: 'swap-magpie-ousd',
      refreshInterval: 10000,
    },
    includeReturn: true,
  }),
  // OpenOcean
  ...generateSwapRoutes<OusdSwapAction>({
    tokensIn: [
      tokens.mainnet.USDC,
      tokens.mainnet.USDS,
      tokens.mainnet.USDT,
      tokens.mainnet.OETH,
      tokens.mainnet.ETH,
    ],
    tokensOut: [tokens.mainnet.OUSD, tokens.mainnet.wOUSD],
    swapRoute: {
      action: 'swap-openOcean-ousd',
    },
    includeReturn: true,
  }),
  // Sushiswap v3
  ...generateSwapRoutes<OusdSwapAction>({
    tokensIn: [tokens.mainnet.USDC, tokens.mainnet.USDT],
    tokensOut: [tokens.mainnet.OUSD],
    swapRoute: {
      action: 'swap-sushiswap-ousd',
    },
    includeReturn: true,
  }),
  // Uniswap v2
  ...generateSwapRoutes<OusdSwapAction>({
    tokensIn: [tokens.mainnet.USDC, tokens.mainnet.USDT],
    tokensOut: [tokens.mainnet.OUSD],
    swapRoute: {
      action: 'swap-uniswap-v2-ousd',
    },
    includeReturn: true,
  }),
  // Uniswap v3
  ...generateSwapRoutes<OusdSwapAction>({
    tokensIn: [tokens.mainnet.USDC, tokens.mainnet.USDT],
    tokensOut: [tokens.mainnet.OUSD],
    swapRoute: {
      action: 'swap-uniswap-v3-ousd',
    },
    includeReturn: true,
  }),
];
