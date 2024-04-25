import { isFulfilled, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useConfig } from 'wagmi';

import { getTokenPriceKey, useTokenPrice } from '../prices';

import type { Token } from '@origin/shared/contracts';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from 'wagmi';

type Key = ['useTvl', Token, Config, QueryClient];

const getKey = (
  token: Token,
  config: Config,
  queryClient: QueryClient,
): Key => ['useTvl', token, config, queryClient];

const fetcher: QueryFunction<number, Key> = async ({
  queryKey: [, token, config, queryClient],
}) => {
  const res = await Promise.allSettled([
    readContract(config, {
      address: token.address ?? ZERO_ADDRESS,
      abi: token.abi,
      functionName: 'totalSupply',
    }),
    queryClient.fetchQuery({
      queryKey: useTokenPrice.getKey(
        getTokenPriceKey(token),
        config,
        queryClient,
      ),
      queryFn: useTokenPrice.fetcher,
    }),
  ]);

  const totalSupply = isFulfilled(res[0])
    ? BigInt(res[0].value as unknown as bigint)
    : 0n;
  const price = isFulfilled(res[1]) ? res[1].value : 0;

  return +formatUnits(totalSupply, token.decimals) * price;
};

export const useTvl = (
  token: Token,
  options?: UseQueryOptions<number, Error, number, Key>,
) => {
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(token, config, queryClient),
    queryFn: fetcher,
  });
};
useTvl.getKey = getKey;
useTvl.fetcher = fetcher;
