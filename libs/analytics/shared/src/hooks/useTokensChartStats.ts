import { tokens } from '@origin/shared/contracts';
import { hasKey } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { omit } from 'ramda';

import { useTokenChartStats } from './useTokenChartStats';

import type { Token } from '@origin/shared/contracts';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';

import type { ChartResult } from './useTokenChartStats';

const DEFAULT_OTOKENS = [
  tokens.mainnet.OETH,
  tokens.mainnet.OUSD,
  tokens.base.superOETHb,
];
const DEFAULT_TOTALS = [
  'tvlUSD',
  'tvlETH',
  'feesETH',
  'feesUSD',
  'circulatingSupplyETH',
  'circulatingSupplyUSD',
] as const;

type Key = [
  'useTokensChartStats',
  Token[],
  typeof DEFAULT_TOTALS,
  number | undefined,
  number | undefined,
  string | undefined,
  string | undefined,
];

const getKey = (
  limit?: number,
  offset?: number,
  from?: string,
  to?: string,
): Key => [
  'useTokensChartStats',
  DEFAULT_OTOKENS,
  DEFAULT_TOTALS,
  limit,
  offset,
  from,
  to,
];

export type Totals = {
  tvlUSD: number;
  tvlETH: number;
  feesETH: number;
  feesUSD: number;
  circulatingSupplyETH: number;
  circulatingSupplyUSD: number;
  timestamp: number;
  date: string;
};

export type TokensChartResult = {
  [tokens.mainnet.OETH.id]: ChartResult[];
  [tokens.mainnet.OUSD.id]: ChartResult[];
  [tokens.base.superOETHb.id]: ChartResult[];
  totals: Totals[];
};

const fetcher =
  (queryClient: QueryClient): QueryFunction<TokensChartResult, Key> =>
  async ({ queryKey: [, oTokens, totals, limit, offset, from, to] }) => {
    const charts = await Promise.all(
      oTokens.map((token) =>
        queryClient.fetchQuery({
          queryKey: useTokenChartStats.getKey(
            token,
            from && to ? undefined : limit,
            from,
            to,
            undefined,
            offset,
          ),
          queryFn: useTokenChartStats.fetcher(queryClient),
        }),
      ),
    );

    const result: TokensChartResult = {
      [tokens.mainnet.OETH.id]: [],
      [tokens.mainnet.OUSD.id]: [],
      [tokens.base.superOETHb.id]: [],
      totals: [],
    };

    const largestSet = charts.reduce(
      (acc, curr) => (curr.length > acc.length ? curr : acc),
      [],
    );

    for (const { date, timestamp } of largestSet) {
      const total: Totals = {
        feesETH: 0,
        feesUSD: 0,
        tvlUSD: 0,
        tvlETH: 0,
        circulatingSupplyETH: 0,
        circulatingSupplyUSD: 0,
        timestamp,
        date,
      };

      oTokens.forEach((oToken, i) => {
        const data =
          charts[i].find((d) => d.date === date) ??
          emptyChartResult(timestamp, date, oToken);

        totals.forEach((key) => {
          if (hasKey(total, key)) {
            total[key] += Number(data[key]);
          }
        });

        if (hasKey(result, oToken.id)) {
          result[oToken.id].push(data);
        }
      });

      result.totals.push(total);
    }

    return result;
  };

export const useTokensChartStats = (
  limit?: number,
  offset?: number,
  from = new Date('2023-01-01').toISOString(),
  to?: string,
  options?: Omit<
    UseQueryOptions<TokensChartResult, Error, TokensChartResult, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(limit, offset, from, to),
    queryFn: fetcher(queryClient),
  });
};
useTokensChartStats.getKey = getKey;
useTokensChartStats.fetcher = fetcher;

const emptyChartResult = (
  timestamp: number,
  date: string,
  token: Token,
): ChartResult => ({
  id: '',
  timestamp,
  date,
  token: omit(['abi'], token),
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
  circulatingSupplyETH: 0,
  circulatingSupplyUSD: 0,
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
