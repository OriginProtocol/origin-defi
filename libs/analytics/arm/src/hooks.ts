import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { addDays, format, isSameDay, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { pathOr } from 'ramda';

type TradingVolumeData = {
  day: string;
  cumulative_volume: number;
  swap_volume: number;
};

export const useArmTradingVolume = (limit?: number) => {
  return useQuery({
    queryKey: ['useArmTradingVolume', limit],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        limit: '5000',
        api_key: import.meta.env.VITE_DUNE_API_KEY,
        sort_by: 'day',
      });
      const res = await axios.get(
        `https://api.dune.com/api/v1/endpoints/originprotocol/arm-volume/results?${queryParams.toString()}`,
      );

      return res.data;
    },
    select: useCallback(
      (data: {
        result: {
          rows: TradingVolumeData[];
        };
      }) => {
        const rows = pathOr<TradingVolumeData[]>([], ['result', 'rows'], data);

        const result = [];
        const endDate = toZonedTime(subDays(new Date(), 1), 'UTC');
        let currentDate = toZonedTime(subDays(new Date(), limit ?? 365), 'UTC');

        while (currentDate <= endDate) {
          const item = rows.find((r) =>
            isSameDay(new Date(r.day.substring(0, 10)), currentDate),
          );

          result.push({
            timestamp: currentDate.getTime(),
            day: format(currentDate, 'yyyy-MM-dd'),
            tradingVolumeETH: item?.cumulative_volume ?? 0,
            swapVolumeETH: item?.swap_volume ?? 0,
          });
          currentDate = addDays(currentDate, 1);
        }

        return result;
      },
      [limit],
    ),
  });
};
