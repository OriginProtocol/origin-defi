import { useMemo } from 'react';

import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router';

import type { Currency } from '@origin/shared/components';

export const useHomeView = () => {
  const [search, setSearch] = useSearchParams({
    o: '1',
    l: '30',
    c: 'ETH',
  });

  return useMemo(() => {
    const from = search.get('f') ? new Date(search.get('f') ?? 0) : null;
    from?.setHours(0, 0, 0, 0);
    const to = search.get('t') ? new Date(search.get('t') ?? 0) : null;
    to?.setHours(23, 59, 59, 999);

    return {
      offset: Number(search.get('o') ?? '1'),
      limit:
        search.get('l') === 'all' ? undefined : Number(search.get('l') ?? null),
      currency: (search.get('c') ?? 'ETH') as Currency,
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
          params.set('l', newVal?.toString() ?? 'all');
          params.delete('f');
          params.delete('t');
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
          if (newVal) {
            params.set('f', newVal.toISOString());
            params.delete('l');
          } else {
            params.delete('f');
          }

          return params;
        });
      },
      handleSetTo: (newVal: Date | null) => {
        setSearch((params) => {
          if (newVal) {
            params.set('t', newVal.toISOString());
            params.delete('l');
          } else {
            params.delete('t');
          }
          return params;
        });
      },
    };
  }, [search, setSearch]);
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
