import { tokens } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';

import type { MessageDescriptor } from 'react-intl';

import type { SwapAction } from './types';

export const routeActionLogos: Record<SwapAction, string> = {
  'mint-vault': '/images/protocols/origin.svg',
  'swap-curve': '/images/protocols/curve.webp',
  'swap-curve-eth': '/images/protocols/curve.webp',
  'swap-zapper-eth': '/images/protocols/zapper.svg',
  'swap-zapper-sfrxeth': '/images/protocols/zapper.svg',
  'unwrap-woeth': '/images/protocols/origin.svg',
  'wrap-oeth': '/images/protocols/origin.svg',
};

export const routeActionLabel: Record<SwapAction, MessageDescriptor> = {
  'mint-vault': defineMessage({ defaultMessage: 'Mint with Vault' }),
  'swap-curve': defineMessage({ defaultMessage: 'Swap with Curve' }),
  'swap-curve-eth': defineMessage({ defaultMessage: 'Swap with CurvePool' }),
  'swap-zapper-eth': defineMessage({ defaultMessage: 'Mint with Vault' }),
  'swap-zapper-sfrxeth': defineMessage({
    defaultMessage: 'Mint with Vault',
  }),
  'unwrap-woeth': defineMessage({ defaultMessage: 'Unwrap with Origin' }),
  'wrap-oeth': defineMessage({ defaultMessage: 'Wrap with Origin' }),
};

export const buttonActionLabel: Record<SwapAction, MessageDescriptor> = {
  'mint-vault': defineMessage({ defaultMessage: 'Mint' }),
  'swap-curve': defineMessage({ defaultMessage: 'Swap' }),
  'swap-curve-eth': defineMessage({ defaultMessage: 'Swap' }),
  'swap-zapper-eth': defineMessage({ defaultMessage: 'Mint' }),
  'swap-zapper-sfrxeth': defineMessage({
    defaultMessage: 'Mint',
  }),
  'unwrap-woeth': defineMessage({ defaultMessage: 'Unwrap' }),
  'wrap-oeth': defineMessage({ defaultMessage: 'Wrap' }),
};

export const swapRoutes = [
  // Mint
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  // {
  //   tokenIn: tokens.mainnet.ETH,
  //   tokenOut: tokens.mainnet.OETH,
  //   action: 'swap-curve-eth',
  // },
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-zapper-eth',
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'mint-vault',
  },
  {
    tokenIn: tokens.mainnet.WETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.stETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'mint-vault',
  },
  {
    tokenIn: tokens.mainnet.stETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.rETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.rETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'mint-vault',
  },
  {
    tokenIn: tokens.mainnet.frxETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'mint-vault',
  },
  {
    tokenIn: tokens.mainnet.frxETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.sfrxETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-zapper-sfrxeth',
  },
  // Redeem
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.stETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.rETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.frxETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.ETH,
    action: 'swap-curve',
  },
  // {
  //   tokenIn: tokens.mainnet.OETH,
  //   tokenOut: tokens.mainnet.ETH,
  //   action: 'swap-curve-eth',
  // },
  // Wrap
  {
    tokenIn: tokens.mainnet.OETH,
    tokenOut: tokens.mainnet.WOETH,
    action: 'wrap-oeth',
  },
  // Unwrap
  {
    tokenIn: tokens.mainnet.WOETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'unwrap-woeth',
  },
] as const;
