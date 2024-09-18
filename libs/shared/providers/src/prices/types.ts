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

export type SupportedToken = Extract<
  TokenId,
  | '1:DAI'
  | '1:ETH'
  | '1:ETHx'
  | '1:FRAX'
  | '1:frxETH'
  | '1:mETH'
  | '1:OETH'
  | '1:OGN'
  | '1:OUSD'
  | '1:primeETH'
  | '1:rETH'
  | '1:sfrxETH'
  | '1:stETH'
  | '1:swETH'
  | '1:USDC'
  | '1:USDT'
  | '1:WETH'
  | '1:wOETH'
  | '1:wOUSD'
  | '42161:ETH'
  | '42161:WETH'
  | '42161:OETH'
  | '42161:wOETH'
  | '8453:ETH'
  | '8453:WETH'
  | '8453:superOETHb'
  | '8453:wsuperOETHb'
  | '10:ETH'
  | '10:WETH'
  | '10:superOETHo'
  | '10:wsuperOETHo'
>;

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
    >;

export type SupportedTokenPrice = keyof typeof priceOptions;
