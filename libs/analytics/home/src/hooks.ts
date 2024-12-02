import { useCallback, useMemo } from 'react';

import { oTokenConfig, useTokenChartStats } from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
  subDays,
} from 'date-fns';
import { pathOr, takeLast } from 'ramda';
import { useSearchParams } from 'react-router';

import type { Currency } from '@origin/shared/components';

export const useHomeView = () => {
  const [search, setSearch] = useSearchParams({
    o: '1',
    l: '30',
    c: 'ETH',
  });
  const minFrom = Object.values(oTokenConfig).reduce((acc, curr) => {
    const from = new Date(curr.from);

    return isBefore(acc, from) ? acc : from;
  }, new Date('2023-06-01T00:00:00.000000Z'));

  return useMemo(() => {
    const from = search.get('f') ? new Date(search.get('f') ?? minFrom) : null;
    from?.setHours(0, 0, 0, 0);
    const to = search.get('t') ? new Date(search.get('t') ?? 0) : null;
    to?.setHours(23, 59, 59, 999);

    return {
      offset: Number(search.get('o') ?? '1'),
      limit:
        search.get('l') === 'all' ? undefined : Number(search.get('l') ?? null),
      currency: (search.get('c') ?? 'ETH') as Currency,
      minFrom,
      from,
      to,
      handleSetOffset: (newVal: number) => {
        setSearch((params) => {
          params.set('o', newVal.toString());
          return params;
        });
      },
      handleSetLimit: (newVal: number | undefined) => {
        setSearch((params) => {
          params.delete('f');
          params.delete('t');
          params.set('l', newVal?.toString() ?? 'all');
          return params;
        });
      },
      handleSetCurrency: (newVal: Currency) => {
        setSearch((params) => {
          params.set('c', newVal);
          return params;
        });
      },
      handleSetFrom: (newVal: Date | null) => {
        setSearch((params) => {
          if (newVal && !isNaN(newVal.getTime())) {
            params.delete('l');
            params.set('f', newVal.toISOString());
            if (params.get('t') === null) {
              params.set('t', new Date().toISOString());
            }
          } else {
            params.delete('f');
          }

          return params;
        });
      },
      handleSetTo: (newVal: Date | null) => {
        setSearch((params) => {
          if (newVal && !isNaN(newVal.getTime())) {
            params.delete('l');
            params.set('t', newVal.toISOString());
          } else {
            params.delete('t');
          }
          return params;
        });
      },
    };
  }, [minFrom, search, setSearch]);
};

type DuneData = {
  aero_usd: number;
  balance_usd: number;
  day: string;
  incentives_usd: number;
  locked_aero: number;
  locks_usd: number;
  lp_usd: number;
  total_usd: number;
};

type NetAssetValue = {
  timestamp: number;
  totalUSD: number;
  totalETH: number;
};

export const useNetAssetValue = () => {
  const { from, to, limit, minFrom } = useHomeView();
  const queryClient = useQueryClient();

  return useQuery<NetAssetValue[], Error, NetAssetValue[], ['netAssetValue']>({
    staleTime: Infinity,
    retry: false,
    queryKey: ['netAssetValue'],
    queryFn: async () => {
      const res = await Promise.all([
        axios.get(
          `https://api.dune.com/api/v1/query/4125829/results?api_key=${import.meta.env.VITE_DUNE_API_KEY}`,
        ),
        queryClient.fetchQuery({
          queryKey: useTokenChartStats.getKey(
            tokens.mainnet.OUSD,
            undefined,
            minFrom.toISOString(),
          ),
          queryFn: useTokenChartStats.fetcher(queryClient),
        }),
      ]);

      const nav = pathOr([], [0, 'data', 'result', 'rows'], res) as DuneData[];
      const result: NetAssetValue[] = [];
      const dailyMap: Record<string, { totalUSD: number; totalETH: number }> =
        {};

      nav.forEach((item: DuneData) => {
        const date = item.day.substring(0, 10);
        const ousdStat = res[1].find((stat) => stat.date === date);
        dailyMap[date] = {
          totalETH: item.total_usd * (ousdStat?.rateETH ?? 0),
          totalUSD: item.total_usd,
        };
      });

      const endDate = new Date();
      let currentDate = minFrom;

      while (currentDate <= endDate) {
        const dateKey = format(currentDate, 'yyyy-MM-dd');
        const totalUSD =
          dailyMap[dateKey]?.totalUSD ??
          result[result.length - 1]?.totalUSD ??
          0;
        const totalETH =
          dailyMap[dateKey]?.totalETH ??
          result[result.length - 1]?.totalETH ??
          0;
        result.push({
          timestamp: new Date(dateKey).getTime(),
          totalUSD,
          totalETH,
        });
        currentDate = addDays(dateKey, 1);
      }

      return result;
    },
    select: useCallback(
      (data: NetAssetValue[]) => {
        let filteredData = data;

        if (from || to) {
          if (from) {
            filteredData = filteredData.filter(({ timestamp }) => {
              return (
                isSameDay(new Date(timestamp), from) ||
                isAfter(new Date(timestamp), from)
              );
            });
          }
          if (to) {
            filteredData = filteredData.filter(({ timestamp }) => {
              return isBefore(new Date(timestamp), subDays(to, 1));
            });
          }
        } else if (limit) {
          filteredData = takeLast(limit, filteredData);
        }

        return filteredData;
      },
      [from, to, limit],
    ),
  });
};
