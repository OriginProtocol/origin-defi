import { contracts } from '@origin/shared/contracts';
import { tokens as toks } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import axios from 'axios';
import { formatUnits, parseUnits } from 'viem';

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
    staleTime: import.meta.env.DEV ? 1000 * 60 * 30 : 1000 * 30,
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

      let prices = tokens.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: res?.data?.[coingeckoTokenIds[curr]]?.usd ?? 0,
        }),
        {},
      );

      if (tokens.includes('wOETH')) {
        const oethAmount = await readContract({
          address: contracts.mainnet.wOETH.address,
          abi: contracts.mainnet.wOETH.abi,
          functionName: 'previewRedeem',
          args: [parseUnits('1', toks.mainnet.wOETH.decimals)],
        });

        prices = {
          ...prices,
          wOETH:
            +formatUnits(oethAmount, toks.mainnet.wOETH.decimals) *
            prices['wOETH'],
        };
      }

      return prices;
    },
    ...options,
  });
};
