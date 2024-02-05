import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { RestakeAction } from './types';

export const GAS_BUFFER = 10n; // 10%
export const MAX_PRICE = 1.2;

export const restakeRoutes: SwapRoute<RestakeAction>[] = [
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake',
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
  },
];
