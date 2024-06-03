import { isFulfilled, isNilOrEmpty } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import axios from 'axios';
import { groupBy, pickBy } from 'ramda';
import { useConfig } from 'wagmi';

import { coingeckoApiEndpoint, priceOptions } from './constants';
import { isDerivedOption, reduceOptions } from './utils';

import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type {
  CoingeckoOption,
  DerivedOption,
  PriceOption,
  RestOption,
  SupportedTokenPrice,
  WagmiOption,
} from './types';

type PricesKey = ['useTokenPrices', SupportedTokenPrice[]];

const getPricesKey = (tokenPrices: SupportedTokenPrice[]): PricesKey => [
  'useTokenPrices',
  tokenPrices,
];

const pricesFetcher: (
  config: Config,
) => QueryFunction<Record<SupportedTokenPrice, number>, PricesKey> =
  (config) =>
  async ({ queryKey: [, tokenPrices] }) => {
    const allPrices = {} as Record<SupportedTokenPrice, number>;

    if (isNilOrEmpty(tokenPrices)) {
      return allPrices;
    }

    const options = tokenPrices.reduce(
      reduceOptions,
      {} as Record<SupportedTokenPrice, PriceOption>,
    );

    const { wagmi, coingecko, rest } = groupBy(
      (o) => o.type,
      Object.values(options),
    );

    if (wagmi) {
      try {
        const wagmiRes = await readContracts(config, {
          contracts: Object.values(wagmi.map((o) => (o as WagmiOption).config)),
          allowFailure: true,
        });
        wagmiRes.forEach((res, i) => {
          const key = wagmi[i].id;
          allPrices[key] =
            (wagmi[i] as WagmiOption)?.mapResult?.(res.result) ??
            Number(res?.result) ??
            0;
        });
      } catch {}
    }

    if (rest) {
      try {
        const restRes = await Promise.allSettled(
          rest.map((o) => (o as RestOption).config()),
        );
        restRes.forEach((res, i) => {
          const key = rest[i].id;

          allPrices[key] = isFulfilled(res)
            ? (rest[i] as RestOption)?.mapResult?.(res.value) ??
              Number(res.value)
            : 0;
        });
      } catch {}
    }

    if (coingecko) {
      try {
        const cgRes = await axios.get(
          `${coingeckoApiEndpoint}/simple/price?ids=${coingecko.map((o) => (o as CoingeckoOption).config).join('%2C')}&vs_currencies=usd`,
        );
        coingecko.forEach((o) => {
          allPrices[o.id] =
            cgRes?.data[(o as CoingeckoOption).config]?.usd ?? 0;
        });
      } catch {}
    }

    const deps = tokenPrices
      .map((t) => priceOptions[t])
      .filter((o) => isDerivedOption(o)) as DerivedOption[];
    if (!isNilOrEmpty(deps)) {
      try {
        deps.forEach((dep) => {
          allPrices[dep.id] =
            dep.dependsOn?.reduce((acc, curr) => acc * allPrices[curr], 1) ?? 0;
        });
      } catch {}
    }

    return pickBy((_, k) => tokenPrices.includes(k), allPrices) as Record<
      SupportedTokenPrice,
      number
    >;
  };

export const useTokenPrices = <TData = Record<SupportedTokenPrice, number>>(
  tokenPrices: SupportedTokenPrice[],
  options?: UseQueryOptions<
    Record<SupportedTokenPrice, number>,
    Error,
    TData,
    PricesKey
  >,
) => {
  const config = useConfig();

  return useQuery({
    ...options,
    queryKey: getPricesKey(tokenPrices),
    queryFn: pricesFetcher(config),
  });
};
useTokenPrices.getKey = getPricesKey;
useTokenPrices.fetcher = pricesFetcher;

type PriceKey = ['useTokenPrice', SupportedTokenPrice];

const getPriceKey = (tokenPrice: SupportedTokenPrice): PriceKey => [
  'useTokenPrice',
  tokenPrice,
];

const priceFetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<number, PriceKey> =
  (config, queryClient) =>
  async ({ queryKey: [, tokenPrice] }) => {
    const res = await queryClient.fetchQuery({
      queryKey: useTokenPrices.getKey([tokenPrice]),
      queryFn: useTokenPrices.fetcher(config),
    });

    return res?.[tokenPrice];
  };

export const useTokenPrice = (
  tokenPrice: SupportedTokenPrice,
  options?: UseQueryOptions<number, Error, number, PriceKey>,
) => {
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getPriceKey(tokenPrice),
    queryFn: priceFetcher(config, queryClient),
  });
};
useTokenPrice.getKey = getPriceKey;
useTokenPrice.fetcher = priceFetcher;
