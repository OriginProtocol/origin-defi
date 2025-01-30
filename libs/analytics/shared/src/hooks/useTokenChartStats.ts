import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useOTokenStatsQuery } from '../queries';
import { dailyStatMapper } from '../utils';

import type { Currency } from '@origin/shared/components';
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
  Currency | undefined,
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
  tvl: number;
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
  fees: number;
  feesETH: number;
  feesUSD: number;
  yield: number;
  yieldETH: number;
  yieldUSD: number;
  dripperUSD: number;
  rateETH: number;
  rateUSD: number;
  rateS: number;
};

const getKey = (
  token: Token,
  limit?: number,
  from?: string,
  to?: string,
  orderBy?: OTokenDailyStatOrderByInput[],
  offset?: number,
  currency?: Currency,
): Key => [
  'useTokenChartStats',
  token,
  limit,
  from,
  to,
  orderBy,
  offset,
  currency,
];

const fetcher: (
  queryClient: QueryClient,
) => QueryFunction<ChartResult[], Key> =
  (queryClient) =>
  async ({
    queryKey: [, token, limit, from, to, orderBy, offset, currency],
  }) => {
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

    return res?.oTokenDailyStats
      ?.toReversed()
      .map((d) => dailyStatMapper(d, token, { isChartFormat: true, currency }));
  };

export const useTokenChartStats = <TResult = ChartResult[]>(
  {
    token,
    limit,
    from,
    to,
    orderBy,
    offset,
    currency,
  }: {
    token: Token;
    limit?: number;
    from?: string;
    to?: string;
    orderBy?: OTokenDailyStatOrderByInput[];
    offset?: number;
    currency?: Currency;
  },
  options?: Omit<
    UseQueryOptions<ChartResult[], Error, TResult, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(token, limit, from, to, orderBy, offset, currency),
    queryFn: fetcher(queryClient),
  });
};
useTokenChartStats.getKey = getKey;
useTokenChartStats.fetcher = fetcher;
