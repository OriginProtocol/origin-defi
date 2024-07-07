/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HexAddress } from '@origin/shared/utils';
import type { Dnum } from 'dnum';
import type { ReadContractParameters } from 'viem';

export type WagmiOption = {
  id: SupportedTokenPrice;
  config: ReadContractParameters & {
    address: HexAddress;
    chainId: number;
  };
  mapResult?: (args: any) => Dnum;
  type: 'wagmi';
};

export type RestOption = {
  id: SupportedTokenPrice;
  config: () => Promise<Dnum>;
  mapResult?: (args: any) => Dnum;
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

export type Currency = 'USD' | 'ETH' | 'OETH' | 'OUSD' | 'frxETH' | 'primeETH';

export type SupportedTokenPrice = `${SupportedToken}_${Currency}`;
