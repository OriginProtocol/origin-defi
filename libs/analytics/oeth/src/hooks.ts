import { useCallback } from 'react';

import { oTokenConfig, useTokenChartStats } from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'dnum';

import { useWrappedOethByDayQuery } from './queries.generated';

import type { ChartResult } from '@origin/analytics/shared';

import type { WrappedOethByDayQuery } from './queries.generated';

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
            1,
          ),
          queryFn: useTokenChartStats.fetcher(queryClient),
        }),
        queryClient.fetchQuery({
          queryKey: useWrappedOethByDayQuery.getKey(),
          queryFn: useWrappedOethByDayQuery.fetcher(),
        }),
      ]);

      return res;
    },
    select: useCallback((data: [ChartResult[], WrappedOethByDayQuery]) => {
      const chartData = data[0];
      const wrappedSupplyData = data[1];
      if (!chartData?.length || !wrappedSupplyData) {
        return [];
      }

      const wrappedSupplyMap = new Map<
        string,
        { arbitrum: bigint; base: bigint; rate: bigint }
      >();
      for (const item of wrappedSupplyData.arbitrum) {
        wrappedSupplyMap.set(item.day.slice(0, 10), {
          arbitrum: BigInt(item.totalSupply),
          base: 0n,
          rate: 0n,
        });
      }
      for (const item of wrappedSupplyData.base) {
        const mapItem = wrappedSupplyMap.get(item.day.slice(0, 10));
        if (mapItem) {
          mapItem.base = BigInt(item.totalSupply);
        }
      }
      for (const item of wrappedSupplyData.oTokenDailyStats) {
        const mapItem = wrappedSupplyMap.get(item.date.slice(0, 10));
        if (mapItem) {
          mapItem.rate = BigInt(item.rateWrapped);
        }
      }
      // Fill any rate gaps using previously stated date.

      return chartData.reduce((acc, curr) => {
        const totalETH = curr.tvlETH;
        const totalUSD = curr.tvlUSD;

        const wrappedMapData = wrappedSupplyMap.get(
          new Date(curr.timestamp).toJSON().slice(0, 10),
        );
        const wrappedRate = wrappedMapData?.rate ?? 0n;
        const arbTotalSupply = wrappedMapData?.arbitrum ?? 0n;
        const arbitrumETH = toNumber([
          (arbTotalSupply * wrappedRate) / 10n ** 18n,
          tokens.arbitrum.wOETH.decimals,
        ]);
        const arbitrumUSD = arbitrumETH * curr.rateUSD;
        const baseTotalSupply = wrappedMapData?.base ?? 0n;
        const baseETH = toNumber([
          (baseTotalSupply * wrappedRate) / 10n ** 18n,
          tokens.arbitrum.wOETH.decimals,
        ]);
        const baseUSD = baseETH * curr.rateUSD;

        const mainnetETH = totalETH - arbitrumETH - baseETH;
        const mainnetUSD = mainnetETH * curr.rateUSD;

        return [
          ...acc,
          {
            mainnetETH,
            mainnetUSD,
            arbitrumETH,
            arbitrumUSD,
            baseETH,
            baseUSD,
            totalETH,
            totalUSD,
            timestamp: curr.timestamp,
          },
        ];
      }, [] as TvlCombined[]);
    }, []),
  });
};
