import { movingAverage, ZERO_ADDRESS } from '@origin/shared/utils';
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
  OTokenDailyStatOrderByInput[] | undefined,
  number | undefined,
];

const getKey = (
  token: Token,
  limit?: number,
  from?: string,
  orderBy?: OTokenDailyStatOrderByInput[],
  offset?: number,
): Key => ['useTokenChartStats', token, limit, from, orderBy, offset];

export type ChartResult = {
  id: string;
  timestamp: number;
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
  pctCirculatingSupply: number;
  feesETH: number;
  feesUSD: number;
  feesMovingAvg7Days: number;
  feesMovingAvg30Days: number;
  rateETH: number;
  rateUSD: number;
};

const fetcher: (
  queryClient: QueryClient,
) => QueryFunction<ChartResult[], Key> =
  (queryClient) =>
  async ({ queryKey: [, token, limit, from, orderBy, offset] }) => {
    const res = await queryClient.fetchQuery({
      queryKey: useOTokenStatsQuery.getKey({
        token: token.address ?? ZERO_ADDRESS,
        chainId: token.chainId,
        from,
        limit,
        orderBy,
        offset,
      }),
      queryFn: useOTokenStatsQuery.fetcher({
        token: token.address ?? ZERO_ADDRESS,
        chainId: token.chainId,
        from,
        limit,
        orderBy,
      }),
    });

    const mapped = res?.oTokenDailyStats
      ?.toReversed()
      .map((d) => dailyStatMapper(d, token, { isChartFormat: true }));

    const feesMovingAvg7Days = movingAverage(pluck('feesETH', mapped), 7);
    const feesMovingAvg30Days = movingAverage(pluck('feesETH', mapped), 30);

    return mapped.map((m, i) => ({
      ...m,
      feesMovingAvg7Days: feesMovingAvg7Days[i],
      feesMovingAvg30Days: feesMovingAvg30Days[i],
    }));
  };

export const useTokenChartStats = <TResult = ChartResult[]>(
  {
    token,
    limit,
    from,
    orderBy,
  }: {
    token: Token;
    limit?: number;
    from?: string;
    orderBy?: OTokenDailyStatOrderByInput[];
  },
  options?: Omit<
    UseQueryOptions<ChartResult[], Error, TResult, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(token, limit, from, orderBy),
    queryFn: fetcher(queryClient),
  });
};
useTokenChartStats.getKey = getKey;
useTokenChartStats.fetcher = fetcher;
