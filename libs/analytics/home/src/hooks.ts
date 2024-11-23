import { useCallback, useMemo } from 'react';

import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { isSameDay } from 'date-fns';
import { add, from, mul, toNumber } from 'dnum';
import { useSearchParams } from 'react-router';

import { useCumulativeRevenueQuery } from './queries.generated';

import type { Currency } from '@origin/shared/components';
import type { Dnum } from 'dnum';

import type { CumulativeRevenueQuery } from './queries.generated';

export const useHomeView = () => {
  const [search, setSearch] = useSearchParams({ o: '1', l: '30', c: 'ETH' });

  return useMemo(
    () => ({
      offset: Number(search.get('o') ?? '1'),
      limit:
        search.get('l') === 'all' ? undefined : Number(search.get('l') ?? '30'),
      currency: (search.get('c') ?? 'ETH') as Currency,
      handleSetOffset: (newVal: number) => {
        setSearch((params) => {
          params.set('o', newVal.toString());
          return params;
        });
      },
      handleSetLimit: (newVal: number | undefined) => {
        setSearch((params) => {
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
    }),
    [search, setSearch],
  );
};

export const useCumulativeProtocolRevenue = () =>
  useCumulativeRevenueQuery(undefined, {
    select: useCallback((data: CumulativeRevenueQuery) => {
      const largestSet = [data.oeth, data.ousd, data.super].reduce(
        (acc, curr) => (curr.length > acc.length ? curr : acc),
        [],
      );

      const serie = [];
      const total = {
        oeth: from(0, 18),
        ousd: from(0, 18),
        superOeth: from(0, 18),
      };
      for (const set of largestSet) {
        const timestamp = set.timestamp;
        const ousd = data.ousd.find((d) =>
          isSameDay(new Date(d.timestamp), new Date(timestamp)),
        );
        const oeth = data.oeth.find((d) =>
          isSameDay(new Date(d.timestamp), new Date(timestamp)),
        );
        const superOeth = data.super.find((d) =>
          isSameDay(new Date(d.timestamp), new Date(timestamp)),
        );

        const ousdFee = computeItem(ousd);
        const oethFee = computeItem(oeth);
        const superOethFee = computeItem(superOeth);

        total.ousd = add(total.ousd, ousdFee);
        total.oeth = add(total.oeth, oethFee);
        total.superOeth = add(total.superOeth, superOethFee);

        serie.push({
          timestamp: new Date(set.timestamp).getTime(),
          ousd: toNumber(ousdFee),
          oeth: toNumber(oethFee),
          superOeth: toNumber(superOethFee),
          total: toNumber(
            [ousdFee, oethFee, superOethFee].reduce(
              (acc, curr) => add(acc, curr),
              from(0, 18),
            ),
          ),
          ousdCumulated: toNumber(total.ousd),
          oethCumulated: toNumber(total.oeth),
          superOethCumulated: toNumber(total.superOeth),
          totalCumulated: toNumber(
            [total.ousd, total.oeth, total.superOeth].reduce(
              (acc, curr) => add(acc, curr),
              from(0, 18),
            ),
          ),
        });
      }

      return { serie, total };
    }, []),
  });

const computeItem = (item?: CumulativeRevenueQuery['oeth'][number]) => {
  if (!item) {
    return from(0, 18);
  }
  const rateETH = [BigInt(item?.rateETH ?? 0), 18] as Dnum;
  const fees = [BigInt(item?.fees ?? 0), 18] as Dnum;

  return mul(fees, rateETH);
};

export type OgnDailyResult = { timestamp: number; value: number };

export const ognDailyQueryOptions = queryOptions({
  staleTime: Infinity,
  queryKey: ['useOgnDaily'],
  queryFn: async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/origin-protocol/market_chart?vs_currency=usd&days=365&interval=daily&precision=18`,
    );

    const prices: OgnDailyResult[] = res.data.prices.map(
      (item: [number, number]) => ({
        timestamp: item[0],
        value: item[1],
      }),
    );

    const marketCaps: OgnDailyResult[] = res.data.market_caps.map(
      (item: [number, number]) => ({
        timestamp: item[0],
        value: item[1],
      }),
    );

    return { prices, marketCaps };
  },
});
