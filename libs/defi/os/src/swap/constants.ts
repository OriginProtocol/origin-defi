import { tokens } from '@origin/shared/contracts';

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
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.S,
    action: 'swap-metropolis-os',
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.wS,
    action: 'swap-metropolis-os',
  },
  {
    tokenIn: tokens.sonic.wS,
    tokenOut: tokens.sonic.OS,
    action: 'swap-metropolis-os',
  },
  {
    tokenIn: tokens.sonic.S,
    tokenOut: tokens.sonic.OS,
    action: 'swap-metropolis-os',
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.S,
    action: 'swap-swapx-os',
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.wS,
    action: 'swap-swapx-os',
  },
  {
    tokenIn: tokens.sonic.wS,
    tokenOut: tokens.sonic.OS,
    action: 'swap-swapx-os',
  },
  // {
  //   tokenIn: tokens.sonic.S,
  //   tokenOut: tokens.sonic.OS,
  //   action: 'swap-swapx-os',
  // },
  // {
  //   tokenIn: tokens.sonic.OS,
  //   tokenOut: tokens.sonic.S,
  //   action: 'swap-shadow-os',
  // },
  // {
  //   tokenIn: tokens.sonic.OS,
  //   tokenOut: tokens.sonic.wS,
  //   action: 'swap-shadow-os',
  // },
  // {
  //   tokenIn: tokens.sonic.wS,
  //   tokenOut: tokens.sonic.OS,
  //   action: 'swap-shadow-os',
  // },
  {
    tokenIn: tokens.sonic.S,
    tokenOut: tokens.sonic.OS,
    action: 'swap-shadow-os',
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.S,
    action: 'swap-magpie-os',
  },
  {
    tokenIn: tokens.sonic.OS,
    tokenOut: tokens.sonic.wS,
    action: 'swap-magpie-os',
  },
  {
    tokenIn: tokens.sonic.wS,
    tokenOut: tokens.sonic.OS,
    action: 'swap-magpie-os',
  },
  {
    tokenIn: tokens.sonic.S,
    tokenOut: tokens.sonic.OS,
    action: 'swap-magpie-os',
  },
];
