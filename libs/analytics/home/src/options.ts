import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

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
