import { tokens } from '@origin/shared/contracts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { takeLast } from 'ramda';

import { oTokenConfig } from '../constants';
import { useTokenChartStats } from './useTokenChartStats';

import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';

import type { ChartResult } from './useTokenChartStats';

type Key = ['useOriginStats', number | undefined];

const oTokens = [
  tokens.mainnet.OETH,
  tokens.mainnet.OUSD,
  tokens.base.superOETHb,
];

const totals = ['tvlUSD', 'tvlETH', 'feesETH', 'feesUSD'] as const;

const getKey = (limit?: number): Key => ['useOriginStats', limit];

export type OriginChartResult = {
  [tokens.mainnet.OETH.id]: ChartResult;
  [tokens.mainnet.OUSD.id]: ChartResult;
  [tokens.base.superOETHb.id]: ChartResult;
  total: Pick<
    ChartResult,
    'timestamp' | 'tvlUSD' | 'tvlETH' | 'feesETH' | 'feesUSD'
  >;
};

const fetcher: (
  queryClient: QueryClient,
) => QueryFunction<OriginChartResult[], Key> =
  (queryClient) =>
  async ({ queryKey: [, limit] }) => {
    const charts = await Promise.all(
      oTokens.map((token) =>
        queryClient.fetchQuery({
          queryKey: useTokenChartStats.getKey(
            token,
            limit,
            oTokenConfig[token.id].from,
          ),
          queryFn: useTokenChartStats.fetcher(queryClient),
        }),
      ),
    );

    const largestSet = charts.reduce(
      (acc, curr) => (curr.length > acc.length ? curr : acc),
      [],
    );

    return largestSet.map((curr) => {
      const getChartData = (chartSet: ChartResult[]) =>
        chartSet.find((d) => takeLast(10, d.id) === takeLast(10, curr.id)) ??
        emptyChartResult(curr.timestamp);

      const [oeth, ousd, superOeth] = charts.map(getChartData);

      const total = totals.reduce(
        (acc, curr) => {
          acc[curr] = [oeth, ousd, superOeth].reduce(
            (sum, chart) => sum + (chart?.[curr] ?? 0),
            0,
          );
          return acc;
        },
        { timestamp: curr.timestamp } as ChartResult,
      );

      return {
        [tokens.mainnet.OETH.id]: oeth,
        [tokens.mainnet.OUSD.id]: ousd,
        [tokens.base.superOETHb.id]: superOeth,
        total,
      };
    });
  };

export const useOriginStats = <TResult = OriginChartResult[]>(
  limit?: number,
  options?: Omit<
    UseQueryOptions<OriginChartResult[], Error, TResult, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(limit),
    queryFn: fetcher(queryClient),
  });
};
useOriginStats.getKey = getKey;
useOriginStats.fetcher = fetcher;

const emptyChartResult = (timestamp: number): ChartResult => ({
  id: '',
  timestamp,
  apy7: 0,
  apy14: 0,
  apy30: 0,
  totalSupply: 0,
  rebasingSupply: 0,
  nonRebasingSupply: 0,
  wrappedSupply: 0,
  pctWrappedSupply: 0,
  protocolOwnedSupply: 0,
  pctProtocolOwnedSupply: 0,
  circulatingSupply: 0,
  pctCirculatingSupply: 0,
  feesETH: 0,
  feesUSD: 0,
  feesMovingAvg7Days: 0,
  feesMovingAvg30Days: 0,
  rateETH: 0,
  rateUSD: 0,
  tvlUSD: 0,
  tvlETH: 0,
});
