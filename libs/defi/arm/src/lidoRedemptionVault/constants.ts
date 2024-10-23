import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { DepositARMAction } from './types';

export const APY_TRAILING = 3;

export const armSwapRoutes: SwapRoute<DepositARMAction>[] = [
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet['ARM-WETH-stETH'],
    action: 'deposit-arm-zapper',
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet['ARM-WETH-stETH'],
    action: 'deposit-arm-lido',
  },
];
