import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import axios from 'axios';
import { pickBy } from 'ramda';
import { useConfig } from 'wagmi';

import { coingeckoApiEndpoint, priceOptions } from './constants';
import { isCoingeckoCall, isWagmiCall, reduceCalls } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type {
  CoingeckoCall,
  PriceCall,
  SupportedTokenPrice,
  WagmiCall,
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
      if (isNilOrEmpty(tokenPrices)) {
        return {} as Record<SupportedTokenPrice, number>;
      }

      const allPrices = {} as Record<SupportedTokenPrice, number>;

      const calls = tokenPrices.reduce(
        reduceCalls,
        {} as Record<SupportedTokenPrice, PriceCall>,
      );

      const wagmi = Object.entries(calls).filter(([, v]) => isWagmiCall(v));
      if (!isNilOrEmpty(wagmi)) {
        try {
          const wagmiRes = await readContracts(config, {
            contracts: Object.values(
              wagmi.map(([, v]) => (v as WagmiCall).config),
            ),
            allowFailure: true,
          });
          wagmiRes.forEach((res, i) => {
            const key = wagmi[i][0] as SupportedTokenPrice;
            const option = priceOptions.mainnet[key];
            allPrices[key] =
              option?.mapResult?.(res.result) ?? Number(res?.result) ?? 0;
          });
        } catch {}
      }

      const coingecko = Object.entries(calls).filter(([, v]) =>
        isCoingeckoCall(v),
      );
      if (!isNilOrEmpty(coingecko)) {
        try {
          const cgRes = await axios.get(
            `${coingeckoApiEndpoint}/simple/price?ids=${coingecko.map(([, v]) => (v as CoingeckoCall).config).join('%2C')}&vs_currencies=usd`,
          );
          coingecko.forEach(([k, v]) => {
            allPrices[k as SupportedTokenPrice] =
              cgRes?.data[v.config as string]?.usd ?? 0;
          });
        } catch {}
      }

      const deps = tokenPrices
        .map((t) => priceOptions.mainnet[t])
        .filter((o) => !isNilOrEmpty(o.dependsOn));
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
