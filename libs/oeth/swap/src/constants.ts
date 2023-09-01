import { tokens } from '@origin/shared/contracts';
import { erc20ABI, mainnet } from 'wagmi';

import type { Token } from '@origin/shared/contracts';

export const MIX_TOKEN: Token = {
  address: undefined,
  chainId: mainnet.id,
  abi: erc20ABI,
  decimals: 18,
  name: 'Redeem Mix',
  symbol: 'MIX_TOKEN',
  icon: '/images/backed-graphic.svg',
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
    action: 'swap-zapper',
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
    action: 'swap-zapper',
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
