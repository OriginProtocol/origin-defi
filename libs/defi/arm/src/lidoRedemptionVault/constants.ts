import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';
import type { Dnum } from 'dnum';

import type { DepositARMAction } from './types';

export const APY_TRAILING = 1;

export const WAVE_AMOUNT = [
  1500n,
  tokens.mainnet['ARM-WETH-stETH'].decimals,
] as Dnum;

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
