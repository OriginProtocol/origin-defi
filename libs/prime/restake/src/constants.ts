import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { Meta, RestakeAction } from './types';

export const WAITING_BLOCK_AMOUNT = 50400; // 7 days

export const restakeRoutes: SwapRoute<RestakeAction, Meta>[] = [
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.primeETH,
    action: 'restake-prime',
  },
];
