import { tokens } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';
import { erc20ABI, mainnet } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { MessageDescriptor } from 'react-intl';

import type { SwapAction } from './types';

export const MIX_TOKEN: Token = {
  address: undefined,
  chainId: mainnet.id,
  abi: erc20ABI,
  decimals: 18,
  name: 'Redeem Mix',
  symbol: 'MIX_TOKEN',
  icon: '/images/backed-graphic.svg',
};

export const routeActionLogos: Record<SwapAction, string> = {
  'mint-vault': '/images/protocols/origin.svg',
  'redeem-vault': '/images/protocols/origin.svg',
  'swap-curve': '/images/protocols/curve.webp',
  'swap-curve-eth': '/images/protocols/curve.webp',
  'swap-zapper-eth': '/images/protocols/zapper.svg',
  'swap-zapper-sfrxeth': '/images/protocols/zapper.svg',
  'unwrap-woeth': '/images/protocols/origin.svg',
  'wrap-oeth': '/images/protocols/origin.svg',
};

export const routeActionLabel: Record<SwapAction, MessageDescriptor> = {
  'mint-vault': defineMessage({ defaultMessage: 'Mint with Vault' }),
  'redeem-vault': defineMessage({ defaultMessage: 'Redeem with Vault' }),
  'swap-curve': defineMessage({ defaultMessage: 'Swap with Curve' }),
  'swap-curve-eth': defineMessage({ defaultMessage: 'Swap with CurvePool' }),
  'swap-zapper-eth': defineMessage({ defaultMessage: 'Swap with Zapper' }),
  'swap-zapper-sfrxeth': defineMessage({ defaultMessage: 'Swap with Zapper' }),
  'unwrap-woeth': defineMessage({ defaultMessage: 'Unwrap with Origin' }),
  'wrap-oeth': defineMessage({ defaultMessage: 'Wrap with Origin' }),
};

export const swapRoutes = [
  // Mint
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve',
  },
  {
    tokenIn: tokens.mainnet.ETH,
    tokenOut: tokens.mainnet.OETH,
    action: 'swap-curve-eth',
  },
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
    tokenOut: MIX_TOKEN,
    action: 'redeem-vault',
  },
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
