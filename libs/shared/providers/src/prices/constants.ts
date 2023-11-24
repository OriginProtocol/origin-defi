import type { SupportedToken } from './types';

export const coingeckoApiEndpoint = 'https://api.coingecko.com/api/v3';

export const coingeckoTokenIds: Record<SupportedToken, string> = {
  ETH: 'ethereum',
  WETH: 'weth',
  DAI: 'dai',
  USDC: 'usd-coin',
  USDT: 'tether',
  OETH: 'origin-ether',
  OGN: 'origin-protocol',
  wOETH: 'origin-ether',
  OUSD: 'origin-dollar',
  wOUSD: 'origin-dollar',
  stETH: 'staked-ether',
  rETH: 'rocket-pool-eth',
  frxETH: 'frax-ether',
  sfrxETH: 'staked-frax-ether',
  FRAX: 'frax',
};
