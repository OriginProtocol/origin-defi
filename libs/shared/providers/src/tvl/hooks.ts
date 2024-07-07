import { isFulfilled, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { mul, toNumber } from 'dnum';
import { useConfig } from 'wagmi';

import { getTokenPriceKey, useTokenPrice } from '../prices';

import type { Token } from '@origin/shared/contracts';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from 'wagmi';

type Key = ['useTvl', Token];

const getKey = (token: Token): Key => ['useTvl', token];

const fetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<number, Key> =
  (config, queryClient) =>
  async ({ queryKey: [, token] }) => {
    const res = await Promise.allSettled([
      readContract(config, {
        address: token.address ?? ZERO_ADDRESS,
        abi: token.abi,
        functionName: 'totalSupply',
        chainId: token.chainId,
      }),
      queryClient.fetchQuery({
        queryKey: useTokenPrice.getKey(getTokenPriceKey(token)),
        queryFn: useTokenPrice.fetcher(config, queryClient),
      }),
    ]);

    const totalSupply = isFulfilled(res[0])
      ? BigInt(res[0].value as unknown as bigint)
      : 0n;
    const price = isFulfilled(res[1]) ? res[1].value : 0;

    return toNumber(mul([totalSupply, token.decimals], price));
  };

export const useTvl = (
  token: Token,
  options?: UseQueryOptions<number, Error, number, Key>,
) => {
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(token),
    queryFn: fetcher(config, queryClient),
  });
};
useTvl.getKey = getKey;
useTvl.fetcher = fetcher;
