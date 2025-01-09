import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';
import type { SuperOethbRoute } from '@origin/shared/routes';

export const superOethbSwapRoutes: SwapRoute<SuperOethbRoute>[] = [
  {
    tokenIn: tokens.sonic.S,
    tokenOut: tokens.sonic.OS,
    action: 'swap-zapper-superOethb',
    noSlippage: true,
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.S,
    action: 'swap-zapper-superOethb',
    noSlippage: true,
  },
];
