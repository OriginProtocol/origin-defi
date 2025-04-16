/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TokenId } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Dnum } from 'dnum';
import type { ReadContractParameters } from 'viem';

import type { priceOptions } from './constants';

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

export type SupportedCurrency =
  | 'USD'
  | '42161:OETH'
  | Extract<
      TokenId,
      | '1:ETH'
      | '1:frxETH'
      | '1:OETH'
      | '1:wOETH'
      | '1:OUSD'
      | '1:wOUSD'
      | '1:primeETH'
      | '42161:ETH'
      | '8453:superOETHb'
      | '8453:wsuperOETHb'
      | '146:OS'
      | '146:wOS'
      | '98866:PLUME'
      | '98866:superOETHp'
      | '98866:wsuperOETHp'
    >;

export type SupportedTokenPrice = keyof typeof priceOptions;
