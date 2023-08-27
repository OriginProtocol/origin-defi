import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { coingeckoApiEndpoint, coingeckoTokenIds } from './constants';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { SupportedToken } from './types';

export const usePrices = (
  tokens?: SupportedToken[],
  options?: UseQueryOptions<
    Record<SupportedToken, number>,
    Error,
    Record<SupportedToken, number>,
    ['usePrices', SupportedToken[]]
  >,
) => {
  return useQuery({
    queryKey: ['usePrices', tokens] as const,
    queryFn: async ({ queryKey }) => {
      let tokens = queryKey[1];
      if (isNilOrEmpty(tokens)) {
        tokens = Object.keys(coingeckoTokenIds) as SupportedToken[];
      }

      const res = await axios.get(
        `${coingeckoApiEndpoint}/simple/price?ids=${tokens
          .map((t) => coingeckoTokenIds[t])
          .join('%2C')}&vs_currencies=usd`,
      );

      return tokens.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: res?.data?.[coingeckoTokenIds[curr]]?.usd ?? 0,
        }),
        {},
      );
    },
    ...options,
  });
};
