/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReadContractParameters } from 'viem';

export type WagmiOption = {
  id: SupportedTokenPrice;
  config: ReadContractParameters;
  mapResult?: (args: any) => number;
  type: 'wagmi';
};

export type RestOption = {
  id: SupportedTokenPrice;
  config: () => Promise<number>;
  mapResult?: (args: any) => number;
  type: 'rest';
};

export type CoingeckoOption = {
  id: SupportedTokenPrice;
  config: string;
  type: 'coingecko';
};

export type DerivedOption = {
  id: SupportedTokenPrice;
  dependsOn?: SupportedTokenPrice[];
  type: 'derived';
};

export type PriceOption =
  | WagmiOption
  | RestOption
  | CoingeckoOption
  | DerivedOption;

export type SupportedToken =
  | 'DAI'
  | 'ETH'
  | 'ETHx'
  | 'FRAX'
  | 'frxETH'
  | 'mETH'
  | 'OETH'
  | 'OGN'
  | 'OUSD'
  | 'primeETH'
  | 'rETH'
  | 'sfrxETH'
  | 'stETH'
  | 'swETH'
  | 'USDC'
  | 'USDT'
  | 'WETH'
  | 'wOETH'
  | 'wOUSD';

export type Currency = 'USD' | 'ETH' | 'OETH' | 'OUSD' | 'frxETH';

export type SupportedTokenPrice = `${SupportedToken}_${Currency}`;
