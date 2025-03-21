import { tokens } from '@origin/shared/contracts';

import type { SwapRoute } from '@origin/shared/providers';

import type { OusdSwapAction } from './types';

export const ousdSwapRoutes: SwapRoute<OusdSwapAction>[] = [
  // Mint DAI -> OUSD
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-flipper-ousd',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-curve-ousd',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-uniswap-v2-ousd',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-uniswap-v3-ousd',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'mint-vault-ousd',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-sushiswap-ousd',
  },
  {
    tokenIn: tokens.mainnet.DAI,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-magpie-ousd',
    refreshInterval: 10000,
  },
  // Mint USDT -> OUSD
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-flipper-ousd',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-curve-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-uniswap-v2-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-uniswap-v3-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'mint-vault-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-sushiswap-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDT,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-magpie-ousd',
    refreshInterval: 10000,
  },
  // Mint USDC -> OUSD
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-flipper-ousd',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-curve-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-uniswap-v2-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-uniswap-v3-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'mint-vault-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-sushiswap-ousd',
  },
  {
    tokenIn: tokens.mainnet.USDC,
    tokenOut: tokens.mainnet.OUSD,
    action: 'swap-magpie-ousd',
    refreshInterval: 10000,
  },
  // Redeem OUSD -> DAI
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'swap-flipper-ousd',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'swap-sushiswap-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'swap-uniswap-v2-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'swap-uniswap-v3-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'swap-curve-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.DAI,
    action: 'swap-magpie-ousd',
    refreshInterval: 10000,
  },
  // Redeem OUSD -> USDT
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'swap-flipper-ousd',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'swap-sushiswap-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'swap-uniswap-v2-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'swap-uniswap-v3-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'swap-curve-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDT,
    action: 'swap-magpie-ousd',
    refreshInterval: 10000,
  },
  // Redeem OUSD -> USDC
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'swap-flipper-ousd',
    noSlippage: true,
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'swap-sushiswap-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'swap-uniswap-v2-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'swap-uniswap-v3-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'swap-curve-ousd',
  },
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.USDC,
    action: 'swap-magpie-ousd',
    refreshInterval: 10000,
  },
  // Wrap OUSD
  {
    tokenIn: tokens.mainnet.OUSD,
    tokenOut: tokens.mainnet.wOUSD,
    action: 'wrap-ousd-wousd',
    noSlippage: true,
  },
  // Unwrap wOUSD
  {
    tokenIn: tokens.mainnet.wOUSD,
    tokenOut: tokens.mainnet.OUSD,
    action: 'unwrap-ousd-wousd',
    noSlippage: true,
  },
];
