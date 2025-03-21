import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const oethSwapRoutes: SwapRoute<OethSwapAction>[] = [
  // Mint
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve-oeth',
  },
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-zapper-oeth-eth',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-magpie-oeth',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'mint-vault-oeth',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve-oeth',
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-magpie-oeth',
    refreshInterval: 10000,
  },
  // Redeem
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'redeem-arm-oeth',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'swap-curve-oeth',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.ETH,
    action: 'swap-curve-oeth',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.ETH,
    action: 'swap-magpie-oeth',
    refreshInterval: 10000,
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'swap-magpie-oeth',
    refreshInterval: 10000,
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
  // Arbitrum
  // Balancer
  {
    tokenIn: tokens.arbitrum.ETH,
    tokenOut: tokens.arbitrum.wOETH,
    action: 'swap-balancer-oeth',
  },
  {
    tokenIn: tokens.arbitrum.WETH,
    tokenOut: tokens.arbitrum.wOETH,
    action: 'swap-balancer-oeth',
  },
  {
    tokenIn: tokens.arbitrum.wOETH,
    tokenOut: tokens.arbitrum.ETH,
    action: 'swap-balancer-oeth',
  },
  {
    tokenIn: tokens.arbitrum.wOETH,
    tokenOut: tokens.arbitrum.WETH,
    action: 'swap-balancer-oeth',
  },
  // Magpie
  {
    tokenIn: tokens.arbitrum.ETH,
    tokenOut: tokens.arbitrum.wOETH,
    action: 'swap-magpie-oeth',
  },
  {
    tokenIn: tokens.arbitrum.WETH,
    tokenOut: tokens.arbitrum.wOETH,
    action: 'swap-magpie-oeth',
  },
  {
    tokenIn: tokens.arbitrum.wOETH,
    tokenOut: tokens.arbitrum.ETH,
    action: 'swap-magpie-oeth',
  },
  {
    tokenIn: tokens.arbitrum.wOETH,
    tokenOut: tokens.arbitrum.WETH,
    action: 'swap-magpie-oeth',
  },
];
