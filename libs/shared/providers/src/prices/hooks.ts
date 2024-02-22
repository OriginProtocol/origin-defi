import { isFulfilled, isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import axios from 'axios';
import { groupBy, pickBy } from 'ramda';
import { useConfig } from 'wagmi';

import { coingeckoApiEndpoint, priceOptions } from './constants';
import { isDerivedOption, reduceOptions } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type {
  CoingeckoOption,
  DerivedOption,
  PriceOption,
  RestOption,
  SupportedTokenPrice,
  WagmiOption,
} from './types';

export const useTokenPrices = (
  tokenPrices: SupportedTokenPrice[],
  options?: UseQueryOptions<
    Record<SupportedTokenPrice, number>,
    Error,
    Record<SupportedTokenPrice, number>,
    ['useTokenPrices', SupportedTokenPrice[], Config]
  >,
) => {
  const config = useConfig();

  return useQuery({
    ...options,
    queryKey: ['useTokenPrices', tokenPrices, config],
    queryFn: async () => {
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
            contracts: Object.values(
              wagmi.map((o) => (o as WagmiOption).config),
            ),
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
            Object.values(rest.map((o) => (o as RestOption).config)),
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
              dep.dependsOn?.reduce((acc, curr) => acc * allPrices[curr], 1) ??
              0;
          });
        } catch {}
      }

      return pickBy((_, k) => tokenPrices.includes(k), allPrices) as Record<
        SupportedTokenPrice,
        number
      >;
    },
  });
};
