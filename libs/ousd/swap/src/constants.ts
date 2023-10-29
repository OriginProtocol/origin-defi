import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { SwapAction } from './types';

export const GAS_BUFFER = 10n; // 10%

export const swapRoutes: SwapRoute<SwapAction>[] = [
  // Mint DAI -> OUSD
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'flipper',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'uniswap-v2',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'uniswap-v3',
  },
  // Mint USDT -> OUSD
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'flipper',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'uniswap-v2',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'uniswap-v3',
  },
  // Mint USDC -> OUSD
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'flipper',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'uniswap-v2',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'uniswap-v3',
  },
  // Redeem OUSD -> DAI
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'flipper',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'origin-vault',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'sushiswap',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'uniswap-v2',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'uniswap-v3',
  },
  // Redeem OUSD -> USDT
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'flipper',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'origin-vault',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'sushiswap',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'uniswap-v2',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'uniswap-v3',
  },
  // Redeem OUSD -> USDC
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'flipper',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'origin-vault',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'sushiswap',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'uniswap-v2',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'uniswap-v3',
  },
];
