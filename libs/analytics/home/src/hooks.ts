import { useCallback, useMemo } from 'react';

import { oTokenConfig, useTokenChartStats } from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { pathOr, takeLast } from 'ramda';
import { useSearchParams } from 'react-router';

import type { Currency } from '@origin/shared/components';
import type { Dayjs } from 'dayjs';

export const useHomeView = () => {
  const [search, setSearch] = useSearchParams({
    o: '1',
    l: '30',
    c: 'ETH',
  });
  const minFrom = Object.values(oTokenConfig).reduce((acc, curr) => {
    const from = dayjs
      .utc(curr.from)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);

    return acc.isBefore(from, 'day') ? acc : from;
  }, dayjs.utc('2023-06-01T00:00:00.000000Z'));

  return useMemo(() => {
    const o = search.get('o');
    const f = search.get('f');
    const t = search.get('t');
    const l = search.get('l');
    const c = search.get('c');
    const offset = o ? Number(o) : 1;
    const from = f
      ? dayjs.utc(f).hour(0).minute(0).second(0).millisecond(0)
      : null;
    const to = t
      ? dayjs.utc(t).hour(0).minute(0).second(0).millisecond(0)
      : null;
    const limit = l === 'all' ? undefined : Number(l);
    const currency = (c ?? 'ETH') as Currency;

    return {
      offset,
      limit,
      currency,
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
      handleSetFrom: (newVal: Dayjs | null) => {
        setSearch((params) => {
          if (newVal) {
            params.delete('l');
            params.set('f', newVal.toISOString());
            if (params.get('t') === null) {
              params.set(
                't',
                dayjs
                  .utc()
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .millisecond(0)
                  .toISOString(),
              );
            }
          } else {
            params.delete('f');
          }

          return params;
        });
      },
      handleSetTo: (newVal: Dayjs | null) => {
        setSearch((params) => {
          if (newVal) {
            params.delete('l');
            params.set(
              't',
              newVal
                .hour(23)
                .minute(59)
                .second(59)
                .millisecond(999)
                .toISOString(),
            );
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
  day: string;
  totalUSD: number;
  totalETH: number;
};

export const useNetAssetValue = () => {
  const { from, to, limit, minFrom } = useHomeView();
  const queryClient = useQueryClient();

  return useQuery<NetAssetValue[], Error, NetAssetValue[], ['netAssetValue']>({
    staleTime: Infinity,
    retry: false,
    throwOnError: true,
    queryKey: ['netAssetValue'],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        queryId: '4125829',
      });
      const res = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_DEFI_ANALYTICS_URL}/api/v2/dune/?${queryParams.toString()}`,
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

      const endDate = dayjs.utc().hour(0).minute(0).second(0).millisecond(0);
      let currentDate = minFrom;

      while (currentDate.isBefore(endDate, 'day')) {
        const day = currentDate.format('YYYY-MM-DD');
        const totalUSD =
          dailyMap[day]?.totalUSD ?? result[result.length - 1]?.totalUSD ?? 0;
        const totalETH =
          dailyMap[day]?.totalETH ?? result[result.length - 1]?.totalETH ?? 0;
        result.push({
          timestamp: +currentDate,
          day,
          totalUSD,
          totalETH,
        });
        currentDate = currentDate.add(1, 'day');
      }

      return result;
    },
    select: useCallback(
      (data: NetAssetValue[]) => {
        let filteredData = data;

        if (from || to) {
          if (from) {
            filteredData = filteredData.filter(({ timestamp }) => {
              return dayjs.utc(timestamp).isSameOrAfter(from, 'day');
            });
          }
          if (to) {
            filteredData = filteredData.filter(({ timestamp }) => {
              return dayjs.utc(timestamp).isBefore(to, 'day');
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
