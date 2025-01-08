import { movingAverages, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { pluck } from 'ramda';

import { useOTokenStatsQuery } from '../queries';
import { dailyStatMapper } from '../utils';

import type { Token } from '@origin/shared/contracts';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';

import type { OTokenDailyStatOrderByInput } from '../generated/graphql';

type Key = [
  'useTokenChartStats',
  Token,
  number | undefined,
  string | undefined,
  string | undefined,
  OTokenDailyStatOrderByInput[] | undefined,
  number | undefined,
];

export type ChartResult = {
  id: string;
  timestamp: number;
  date: string;
  token: Omit<Token, 'abi'>;
  apy: number;
  apy7: number;
  apy14: number;
  apy30: number;
  totalSupply: number;
  tvlUSD: number;
  tvlETH: number;
  rebasingSupply: number;
  nonRebasingSupply: number;
  wrappedSupply: number;
  pctWrappedSupply: number;
  protocolOwnedSupply: number;
  pctProtocolOwnedSupply: number;
  circulatingSupply: number;
  circulatingSupplyETH: number;
  circulatingSupplyUSD: number;
  pctCirculatingSupply: number;
  feesETH: number;
  feesUSD: number;
  feesMovingAvg7Days: number;
  feesMovingAvg30Days: number;
  rateETH: number;
  rateUSD: number;
};

const getKey = (
  token: Token,
  limit?: number,
  from?: string,
  to?: string,
  orderBy?: OTokenDailyStatOrderByInput[],
  offset?: number,
): Key => ['useTokenChartStats', token, limit, from, to, orderBy, offset];

const fetcher: (
  queryClient: QueryClient,
) => QueryFunction<ChartResult[], Key> =
  (queryClient) =>
  async ({ queryKey: [, token, limit, from, to, orderBy, offset] }) => {
    const res = await queryClient.fetchQuery({
      queryKey: useOTokenStatsQuery.getKey({
        token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
        chainId: token.chainId,
        from,
        to,
        limit,
        orderBy,
        offset,
      }),
      queryFn: useOTokenStatsQuery.fetcher({
        token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
        chainId: token.chainId,
        from,
        to,
        limit,
        orderBy,
        offset,
      }),
    });

    const mapped = res?.oTokenDailyStats
      ?.toReversed()
      .map((d) => dailyStatMapper(d, token, { isChartFormat: true }));
    const feesAverages = movingAverages(pluck('feesETH', mapped), [7, 30]);

    return mapped.map((m, i) => ({
      ...m,
      feesMovingAvg7Days: feesAverages[0][i],
      feesMovingAvg30Days: feesAverages[1][i],
    }));
  };

export const useTokenChartStats = <TResult = ChartResult[]>(
  {
    token,
    limit,
    from,
    to,
    orderBy,
    offset,
  }: {
    token: Token;
    limit?: number;
    from?: string;
    to?: string;
    orderBy?: OTokenDailyStatOrderByInput[];
    offset?: number;
  },
  options?: Omit<
    UseQueryOptions<ChartResult[], Error, TResult, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(token, limit, from, to, orderBy, offset),
    queryFn: fetcher(queryClient),
  });
};
useTokenChartStats.getKey = getKey;
useTokenChartStats.fetcher = fetcher;
