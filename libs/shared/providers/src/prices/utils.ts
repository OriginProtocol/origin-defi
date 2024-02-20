import { priceOptions } from './constants';

import type { Token } from '@origin/shared/contracts';

import type {
  CoingeckoCall,
  Currency,
  PriceCall,
  SupportedTokenPrice,
  WagmiCall,
} from './types';

export const getTokenPriceKey = (token: Token, currency = 'USD' as Currency) =>
  `${token.symbol}_${currency}` as SupportedTokenPrice;

export const reduceCalls = (
  acc: Record<SupportedTokenPrice, PriceCall>,
  curr: SupportedTokenPrice,
) => {
  const option = priceOptions.mainnet[curr];

  if (!option || acc[curr]) {
    return acc;
  }

  if (option?.wagmi) {
    acc = { ...acc, [curr]: { type: 'wagmi', config: option.wagmi } };
  }

  if (option?.coinGeckoId) {
    acc = {
      ...acc,
      [curr]: { type: 'coingecko', config: option.coinGeckoId },
    };
  }

  if (option?.dependsOn && !option.dependsOn.includes(curr)) {
    const deps = option.dependsOn?.reduce(reduceCalls, acc);
    acc = {
      ...acc,
      ...deps,
    };
  }

  return acc;
};

export const isWagmiCall = (call: PriceCall): call is WagmiCall =>
  call.type === 'wagmi';

export const isCoingeckoCall = (call: PriceCall): call is CoingeckoCall =>
  call.type === 'coingecko';
