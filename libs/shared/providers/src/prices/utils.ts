import { getTokenId, parseTokenId } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';

import { priceOptions } from './constants';

import type { Token } from '@origin/shared/contracts';

import type {
  CoingeckoOption,
  Currency,
  DerivedOption,
  PriceOption,
  RestOption,
  SupportedTokenPrice,
  WagmiOption,
} from './types';

export const getTokenPriceKey = (token: Token, currency = 'USD' as Currency) =>
  `${getTokenId(token)}_${currency}` as SupportedTokenPrice;

export const parseTokenPriceKey = (key: SupportedTokenPrice) => {
  if (isNilOrEmpty(key) || !/^\w*:\w*_\w*$/.test(key)) {
    return null;
  }
  const [tokenId, currency] = key.split('_');

  return { tokenId, currency };
};

export const reduceOptions = (
  acc: Record<SupportedTokenPrice, PriceOption>,
  curr: SupportedTokenPrice,
) => {
  const parsedOption = parseTokenPriceKey(curr);
  const parsedToken = parseTokenId(parsedOption?.tokenId);

  if (parsedOption && parsedToken?.symbol === parsedOption.currency) {
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

export const isWagmiOption = (
  option: PriceOption | undefined,
): option is WagmiOption => !!option && option.type === 'wagmi';

export const isCoingeckoOption = (
  option: PriceOption | undefined,
): option is CoingeckoOption => !!option && option.type === 'coingecko';

export const isRestOption = (
  option: PriceOption | undefined,
): option is RestOption => !!option && option.type === 'rest';

export const isDerivedOption = (
  option: PriceOption | undefined,
): option is DerivedOption => !!option && option.type === 'derived';
