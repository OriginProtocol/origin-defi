import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';
import type { OSTokenRoute } from '@origin/shared/routes';

export const osSwapRoutes: SwapRoute<OSTokenRoute>[] = [
  {
    tokenIn: tokens.sonic.S,
    tokenOut: tokens.sonic.OS,
    action: 'mint-zapper-os',
  },
  {
    tokenIn: tokens.sonic.wS,
    tokenOut: tokens.sonic.OS,
    action: 'mint-vault-os',
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.wOS,
    action: 'wrap-os-wos',
    noSlippage: true,
  },
  {
    tokenIn: tokens.sonic.wOS,
    tokenOut: tokens.sonic.wS,
    action: 'unwrap-wos-os',
    noSlippage: true,
  },
];
