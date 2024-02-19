import type { ReadContractParameters } from 'viem';

export type PriceOption = {
  id: SupportedTokenPrice;
  wagmi?: ReadContractParameters;
  dependsOn?: SupportedTokenPrice[];
  coinGeckoId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapResult?: (...args: any[]) => number;
};

export type WagmiCall = {
  type: 'wagmi';
  config: ReadContractParameters;
};

export type CoingeckoCall = { type: 'coingecko'; config: string };

export type PriceCall = WagmiCall | CoingeckoCall;

export type SupportedTokenPrice =
  | 'DAI_USD'
  | 'ETH_USD'
  | 'FRAX_USD'
  | 'frxETH_USD'
  | 'OETH_USD'
  | 'OGN_USD'
  | 'OUSD_USD'
  | 'rETH_USD'
  | 'sfrxETH_USD'
  | 'stETH_USD'
  | 'USDC_USD'
  | 'USDT_USD'
  | 'WETH_USD'
  | 'wOETH_USD'
  | 'wOUSD_USD'
  | 'frxETH_ETH'
  | 'rETH_ETH'
  | 'stETH_ETH'
  | 'wOETH_OETH'
  | 'wOUSD_OUSD'
  | 'sfrxETH_frxETH';

export type Currency = 'USD' | 'ETH' | 'OETH' | 'OUSD' | 'frxETH';

export type SupportedToken =
  | 'DAI'
  | 'ETH'
  | 'FRAX'
  | 'frxETH'
  | 'OETH'
  | 'OGN'
  | 'OUSD'
  | 'rETH'
  | 'sfrxETH'
  | 'stETH'
  | 'USDC'
  | 'USDT'
  | 'WETH'
  | 'wOETH'
  | 'wOUSD'
  | string;
