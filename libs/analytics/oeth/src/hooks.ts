import { useCallback } from 'react';

import { oTokenConfig, useTokenChartStats } from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toZonedTime } from 'date-fns-tz';
import { toNumber } from 'dnum';

import { useWoethArbitrumByDayQuery } from './queries.generated';

import type { ChartResult } from '@origin/analytics/shared';

import type { WoethArbitrumByDayQuery } from './queries.generated';

export type TvlCombined = {
  mainnetETH: number;
  mainnetUSD: number;
  arbitrumETH: number;
  arbitrumUSD: number;
  baseETH: number;
  baseUSD: number;
  totalETH: number;
  totalUSD: number;
  timestamp: number;
};

export const useOethDistribution = (limit?: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['useOethDistribution', limit],
    queryFn: async () => {
      const oethMainnetConfig =
        oTokenConfig[tokens.mainnet.OETH.id as keyof typeof oTokenConfig];

      const res = await Promise.all([
        queryClient.fetchQuery({
          queryKey: useTokenChartStats.getKey(
            tokens.mainnet.OETH,
            limit,
            oethMainnetConfig.from,
            undefined,
            undefined,
            undefined,
          ),
          queryFn: useTokenChartStats.fetcher(queryClient),
        }),
        queryClient.fetchQuery({
          queryKey: useWoethArbitrumByDayQuery.getKey(),
          queryFn: useWoethArbitrumByDayQuery.fetcher(),
        }),
      ]);

      return res;
    },
    select: useCallback((data: [ChartResult[], WoethArbitrumByDayQuery]) => {
      if (!data[0]?.length) {
        return [];
      }

      return data[0].reduce((acc, curr) => {
        const mainnetETH = curr.tvlETH;
        const mainnetUSD = curr.tvlUSD;

        const arbTotalSupply =
          data[1]?.arbitrum.find(
            (d) =>
              d.day.substring(0, 9) ===
              toZonedTime(curr.timestamp, 'UTC').toISOString().substring(0, 9),
          )?.totalSupply ?? 0;
        const arbitrumETH = toNumber([
          BigInt(arbTotalSupply),
          tokens.arbitrum.wOETH.decimals,
        ]);
        const arbitrumUSD = arbitrumETH * curr.rateUSD;
        const baseTotalSupply =
          data[1]?.base.find(
            (d) =>
              d.day.substring(0, 9) ===
              toZonedTime(curr.timestamp, 'UTC').toISOString().substring(0, 9),
          )?.totalSupply ?? 0;
        const baseETH = toNumber([
          BigInt(baseTotalSupply),
          tokens.arbitrum.wOETH.decimals,
        ]);
        const baseUSD = baseETH * curr.rateUSD;

        return [
          ...acc,
          {
            mainnetETH,
            mainnetUSD,
            arbitrumETH,
            arbitrumUSD,
            baseETH,
            baseUSD,
            totalETH: mainnetETH + arbitrumETH + baseETH,
            totalUSD: mainnetUSD + arbitrumUSD + baseUSD,
            timestamp: curr.timestamp,
          },
        ];
      }, [] as TvlCombined[]);
    }, []),
  });
};
