import { useCallback } from 'react';

import { oTokenConfig, useTokenChartStats } from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'dnum';

import { useWoethArbitrumByDayQuery } from './queries.generated';

import type { ChartResult } from '@origin/analytics/shared';

import type { WoethArbitrumByDayQuery } from './queries.generated';

export type TvlCombined = {
  mainnet: number;
  arbitrum: number;
  base: number;
  total: number;
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
        const mainnet = curr.totalSupply;

        const arbTotalSupply =
          data[1]?.arbitrum.find(
            (d) =>
              d.day.substring(0, 9) ===
              new Date(curr.timestamp).toISOString().substring(0, 9),
          )?.totalSupply ?? 0;
        const arbitrum = toNumber([
          BigInt(arbTotalSupply),
          tokens.arbitrum.wOETH.decimals,
        ]);
        const baseTotalSupply =
          data[1]?.base.find(
            (d) =>
              d.day.substring(0, 9) ===
              new Date(curr.timestamp).toISOString().substring(0, 9),
          )?.totalSupply ?? 0;
        const base = toNumber([
          BigInt(baseTotalSupply),
          tokens.arbitrum.wOETH.decimals,
        ]);

        return [
          ...acc,
          {
            mainnet,
            arbitrum,
            base,
            total: mainnet + arbitrum + base,
            timestamp: curr.timestamp,
          },
        ];
      }, [] as TvlCombined[]);
    }, []),
  });
};
