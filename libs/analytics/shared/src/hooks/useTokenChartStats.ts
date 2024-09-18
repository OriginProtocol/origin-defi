import { movingAverage, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { div, gt, mul, sub, toNumber } from 'dnum';
import { pluck } from 'ramda';

import { useOTokenStatsQuery } from '../queries';

import type { Token } from '@origin/shared/contracts';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Dnum } from 'dnum';

import type { OTokenDailyStatOrderByInput } from '../generated/graphql';

type Key = [
  'useTokenChartStats',
  Token,
  number | undefined,
  string | undefined,
  OTokenDailyStatOrderByInput[] | undefined,
];

const getKey = (
  token: Token,
  limit?: number,
  from?: string,
  orderBy?: OTokenDailyStatOrderByInput[],
): Key => ['useTokenChartStats', token, limit, from, orderBy];

type Result = {
  timestamp: number;
  apy7: number;
  apy14: number;
  apy30: number;
  totalSupply: number;
  rebasingSupply: number;
  nonRebasingSupply: number;
  wrappedSupply: number;
  pctWrappedSupply: number;
  protocolOwnedSupply: number;
  pctProtocolOwnedSupply: number;
  circulatingSupply: number;
  pctCirculatingSupply: number;
  fees: number;
  feesMovingAvg7Days: number;
  feesMovingAvg30Days: number;
  rateETH: number;
  rateUSD: number;
};

const fetcher: (queryClient: QueryClient) => QueryFunction<Result[], Key> =
  (queryClient) =>
  async ({ queryKey: [, token, limit, from, orderBy] }) => {
    const res = await queryClient.fetchQuery({
      queryKey: useOTokenStatsQuery.getKey({
        token: token.address ?? ZERO_ADDRESS,
        chainId: token.chainId,
        from,
        limit,
        orderBy,
      }),
      queryFn: useOTokenStatsQuery.fetcher({
        token: token.address ?? ZERO_ADDRESS,
        chainId: token.chainId,
        from,
        limit,
        orderBy,
      }),
    });

    const mapped = res?.oTokenDailyStats?.toReversed().map((d) => {
      const protocolOwned = [BigInt(d?.amoSupply ?? 0), token.decimals] as Dnum;
      const totalSupply = [BigInt(d?.totalSupply ?? 0), token.decimals] as Dnum;
      const wrapped = [BigInt(d?.wrappedSupply ?? 0), token.decimals] as Dnum;
      const fees = [BigInt(d?.fees ?? 0), token.decimals] as Dnum;
      const rebasingSupply = [
        BigInt(d?.rebasingSupply ?? 0),
        token.decimals,
      ] as Dnum;
      const nonRebasingSupply = [
        BigInt(d?.nonRebasingSupply ?? 0),
        token.decimals,
      ] as Dnum;
      const rateETH = [BigInt(d?.rateETH ?? 0), 18] as Dnum;
      const rateUSD = [BigInt(d?.rateUSD ?? 0), 18] as Dnum;

      const circulating = sub(totalSupply, protocolOwned);
      const pctWrapped = gt(circulating, 0)
        ? mul(div(wrapped, circulating), 100)
        : ([0n, token.decimals] as Dnum);
      const pctCirculating = gt(totalSupply, 0)
        ? mul(div(circulating, totalSupply), 100)
        : ([0n, token.decimals] as Dnum);
      const pctProtocolOwned = gt(totalSupply, 0)
        ? mul(div(protocolOwned, totalSupply), 100)
        : ([0n, token.decimals] as Dnum);

      return {
        timestamp: new Date(d.timestamp).getTime(),
        apy7: d.apy7 * 100,
        apy14: d.apy14 * 100,
        apy30: d.apy30 * 100,
        totalSupply: toNumber(totalSupply, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        rebasingSupply: toNumber(rebasingSupply, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        nonRebasingSupply: toNumber(nonRebasingSupply, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        wrappedSupply: toNumber(wrapped, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        pctWrappedSupply: toNumber(pctWrapped, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        protocolOwnedSupply: toNumber(protocolOwned, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        pctProtocolOwnedSupply: toNumber(pctProtocolOwned, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        circulatingSupply: toNumber(circulating, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        pctCirculatingSupply: toNumber(pctCirculating, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 2,
        }),
        fees: toNumber(fees, {
          decimalsRounding: 'ROUND_DOWN',
          digits: token.decimals,
        }),
        rateETH: toNumber(rateETH, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 18,
        }),
        rateUSD: toNumber(rateUSD, {
          decimalsRounding: 'ROUND_DOWN',
          digits: 18,
        }),
      };
    });

    const feesMovingAvg7Days = movingAverage(pluck('fees', mapped), 7);
    const feesMovingAvg30Days = movingAverage(pluck('fees', mapped), 30);

    return mapped.map((m, i) => ({
      ...m,
      feesMovingAvg7Days: feesMovingAvg7Days[i],
      feesMovingAvg30Days: feesMovingAvg30Days[i],
    }));
  };

export const useTokenChartStats = <TResult = Result[]>(
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
    UseQueryOptions<Result[], Error, TResult, Key>,
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
