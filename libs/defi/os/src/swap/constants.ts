import { tokens } from '@origin/shared/contracts';
import { generateSwapRoutes } from '@origin/shared/providers';

import type { SwapRoute } from '@origin/shared/providers';
import type { OSRoute } from '@origin/shared/routes';

import type { Meta } from './types';

export const osSwapRoutes: SwapRoute<OSRoute, Meta>[] = [
  {
    tokenIn: tokens.sonic.S,
    tokenOut: tokens.sonic.OS,
    action: 'mint-zapper-os',
    noSlippage: true,
  },
  {
    tokenIn: tokens.sonic.wS,
    tokenOut: tokens.sonic.OS,
    action: 'mint-vault-os',
    noSlippage: true,
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.wOS,
    action: 'wrap-os-wos',
    noSlippage: true,
  },
  {
    tokenIn: tokens.sonic.wOS,
    tokenOut: tokens.sonic.OS,
    action: 'unwrap-wos-os',
    noSlippage: true,
  },
  ...generateSwapRoutes<OSRoute, Meta>({
    tokensIn: [tokens.sonic.OS],
    tokensOut: [tokens.sonic.S, tokens.sonic.wS],
    swapRoute: {
      action: 'swap-metropolis-os',
    },
    includeReturn: true,
  }),
  ...generateSwapRoutes<OSRoute, Meta>({
    tokensIn: [tokens.sonic.OS],
    tokensOut: [tokens.sonic.S, tokens.sonic.wS],
    swapRoute: {
      action: 'swap-swapx-os',
    },
    includeReturn: true,
  }),
  ...generateSwapRoutes<OSRoute, Meta>({
    tokensIn: [tokens.sonic.OS],
    tokensOut: [tokens.sonic.S, tokens.sonic.wS],
    swapRoute: {
      action: 'swap-shadow-os',
    },
    includeReturn: true,
  }),
  ...generateSwapRoutes<OSRoute, Meta>({
    tokensIn: [tokens.sonic.OS, tokens.sonic.wOS],
    tokensOut: [tokens.sonic.S, tokens.sonic.wS],
    swapRoute: {
      action: 'swap-magpie-os',
      refreshInterval: 10000,
    },
    includeReturn: true,
  }),
  ...generateSwapRoutes<OSRoute, Meta>({
    tokensIn: [tokens.sonic.OS, tokens.sonic.wOS],
    tokensOut: [tokens.sonic.S, tokens.sonic.wS],
    swapRoute: {
      action: 'swap-openOcean-os',
    },
    includeReturn: true,
  }),
];
