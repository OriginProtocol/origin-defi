import { isNilOrEmpty } from '@origin/shared/utils';

import { priceOptions } from './constants';

import type { Token } from '@origin/shared/contracts';

import type {
  CoingeckoOption,
  DerivedOption,
  PriceOption,
  RestOption,
  SupportedCurrency,
  SupportedTokenPrice,
  WagmiOption,
} from './types';

export const getTokenPriceKey = (
  token: Token,
  currency = 'USD' as SupportedCurrency,
) => `${token.id}_${currency}` as SupportedTokenPrice;

export const parseTokenPriceKey = (key: SupportedTokenPrice) => {
  if (isNilOrEmpty(key) || !/^\w*_\w*$/.test(key)) {
    return null;
  }
  const [id, currency] = key.split('_');

  return { id, currency };
};

export const reduceOptions = (
  acc: Record<SupportedTokenPrice, PriceOption>,
  curr: SupportedTokenPrice,
) => {
  const parsedOption = parseTokenPriceKey(curr);

  if (parsedOption && parsedOption.id === parsedOption.currency) {
    return { ...acc, [curr]: { type: 'rest', id: curr, config: () => 1n } };
  }

  const option = priceOptions[curr];

  if (!option || acc[curr]) {
    return acc;
  }

  if (isDerivedOption(option)) {
    const deps = option.dependsOn?.reduce(reduceOptions, acc) as Record<
      SupportedTokenPrice,
      PriceOption
    >;

    return {
      ...acc,
      ...deps,
    };
  }

  return { ...acc, [curr]: option };
};

export const isWagmiOption = (option: unknown): option is WagmiOption =>
  !!option && (option as WagmiOption).type === 'wagmi';

export const isCoingeckoOption = (option: unknown): option is CoingeckoOption =>
  !!option && (option as CoingeckoOption).type === 'coingecko';

export const isRestOption = (option: unknown): option is RestOption =>
  !!option && (option as RestOption).type === 'rest';

export const isDerivedOption = (option: unknown): option is DerivedOption =>
  !!option && (option as DerivedOption).type === 'derived';
