import {
  getTokenPriceKey,
  useTokenBalance,
  useTokenPrice,
} from '@origin/shared/providers';
import {
  hasKey,
  isFulfilled,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { from, mul } from 'dnum';
import { useAccount, useConfig } from 'wagmi';

import { useOTokenStatsQuery } from '../queries';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Dnum } from 'dnum';
import type { Config } from 'wagmi';

import type { OTokenStatsQuery } from '../queries';

type Key = ['useTokenInfo', Token, HexAddress | undefined];

const getKey = (token: Token, address: HexAddress | undefined): Key => [
  'useTokenInfo',
  token,
  address,
];

type TokenInfo = {
  apies: Pick<
    OTokenStatsQuery['oTokenDailyStats'][0],
    'apy' | 'apy7' | 'apy14' | 'apy30'
  >;
  bestApy: {
    value: number;
    trailingDays: number;
  };
  totalSupply: Dnum;
  tvlUsd: Dnum;
  price: Dnum;
};

const fetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<TokenInfo, Key> =
  (config, queryClient) =>
  async ({ queryKey: [, token, address] }) => {
    const res = await Promise.allSettled([
      queryClient.fetchQuery({
        queryKey: useOTokenStatsQuery.getKey({
          token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
          chainId: token.chainId,
        }),
        queryFn: useOTokenStatsQuery.fetcher({
          token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
          chainId: token.chainId,
        }),
      }),
      readContract(config, {
        address: (token?.address?.toLowerCase() as HexAddress) ?? ZERO_ADDRESS,
        abi: token.abi,
        functionName: 'totalSupply',
        chainId: token.chainId,
      }),
      queryClient.fetchQuery({
        queryKey: useTokenPrice.getKey(getTokenPriceKey(token)),
        queryFn: useTokenPrice.fetcher(config, queryClient),
      }),
      queryClient.fetchQuery({
        queryKey: useTokenBalance.getKey(token, address),
        queryFn: useTokenBalance.fetcher(config),
      }),
    ]);

    const apies =
      isFulfilled(res[0]) && !isNilOrEmpty(res[0].value?.oTokenDailyStats?.[0])
        ? res[0].value.oTokenDailyStats[0]
        : { apy7: 0, apy14: 0, apy30: 0, apy: 0 };
    const totalSupply = isFulfilled(res[1])
      ? ([res[1].value, token.decimals] as Dnum)
      : from(0);
    const price = isFulfilled(res[2]) ? res[2].value : from(0);

    const apiesTrailing = { apy14: 14, apy7: 7, apy30: 30 };
    const bestApy = Object.entries(apies).reduce(
      (acc, [k, v]) => {
        if (
          hasKey(apiesTrailing, k) &&
          typeof v === 'number' &&
          acc.value < v
        ) {
          return { value: v, trailingDays: apiesTrailing[k] };
        }

        return acc;
      },
      {
        value: 0,
        trailingDays: 0,
      },
    );
    const tvlUsd = mul(totalSupply, price);

    return { apies, bestApy, totalSupply, tvlUsd, price };
  };

export const useTokenInfo = (
  token: Token,
  options?: Omit<
    UseQueryOptions<TokenInfo, Error, TokenInfo, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(token, address),
    queryFn: fetcher(config, queryClient),
  });
};
useTokenInfo.getKey = getKey;
useTokenInfo.fetcher = fetcher;
