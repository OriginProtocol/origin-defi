import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { OethSwapAction } from './types';

export const GAS_BUFFER = 10n; // 10%

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
  // Redeem
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
];
