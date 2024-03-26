import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { OgvSwapAction } from './types';

export const ogvSwapRoutes: SwapRoute<OgvSwapAction>[] = [
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OGV,
    action: 'uniswap',
  },
];
