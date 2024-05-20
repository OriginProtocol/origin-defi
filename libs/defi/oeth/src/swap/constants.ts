import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const GAS_BUFFER = 10n; // 10%

export const supportedChainTokens = [tokens.mainnet.OETH, tokens.arbitrum.OETH];

export const oethSwapRoutes: SwapRoute<OethSwapAction>[] = [
  // Mint
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  // {
  //   tokenIn: tokens.mainnet.ETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'swap-curve-eth',
  // },
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-zapper-eth',
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'mint-vault',
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  // {
  //   tokenIn: tokens.mainnet.stETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'mint-vault',
  // },
  // {
  //   tokenIn: tokens.mainnet.stETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'swap-curve',
  // },
  // {
  //   tokenIn: tokens.mainnet.rETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'swap-curve',
  // },
  // {
  //   tokenIn: tokens.mainnet.rETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'mint-vault',
  // },
  // {
  //   tokenIn: tokens.mainnet.frxETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'mint-vault',
  // },
  // {
  //   tokenIn: tokens.mainnet.frxETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'swap-curve',
  // },
  // {
  //   tokenIn: tokens.mainnet.sfrxETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'swap-zapper-sfrxeth',
  // },
  // Redeem
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'swap-curve',
  },
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.stETH,
  //   action: 'swap-curve',
  // },
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.rETH,
  //   action: 'swap-curve',
  // },
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.frxETH,
  //   action: 'swap-curve',
  // },
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.sfrxETH,
  //   action: 'swap-curve-sfrxeth',
  // },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.ETH,
    action: 'swap-curve',
  },
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.ETH,
  //   action: 'swap-curve-eth',
  // },
  // Wrap
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.wOETH,
    action: 'wrap-oeth',
  },
  // Unwrap
  {
    tokenIn: tokens.mainnet.wOETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'unwrap-woeth',
  },
];
