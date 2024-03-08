import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { Meta, RestakeAction } from './types';

export const GAS_BUFFER = 10n; // 10%
export const MAX_PRICE = 1.2;

export const restakeRoutes: SwapRoute<RestakeAction, Meta>[] = [
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'zapper',
    meta: {
      boost: 'primeETH15xp',
    },
  },
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'uniswap',
    meta: {
      boost: 'primeETH15xp',
    },
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'uniswap',
    meta: {
      boost: 'primeETH15xp',
    },
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
    meta: {
      boost: 'primeETH20xp',
    },
  },
  {
    tokenIn: tokens.mainnet.stETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
  },
  {
    tokenIn: tokens.mainnet.mETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
  },
  {
    tokenIn: tokens.mainnet.ETHx,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
    meta: {
      boost: 'eigenTurboCharge',
    },
  },
  {
    tokenIn: tokens.mainnet.sfrxETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
  },
  {
    tokenIn: tokens.mainnet.swETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
  },
  {
    tokenIn: tokens.mainnet.rETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
    meta: { boost: 'primeETH11xp' },
  },
];
