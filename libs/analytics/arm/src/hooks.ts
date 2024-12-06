import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { addDays, format, isSameDay, subDays } from 'date-fns';
import { secondsInDay } from 'date-fns/constants';
import { toZonedTime } from 'date-fns-tz';
import { ascend, pathOr, prop } from 'ramda';

export type ArmTradingVolumeData = {
  day: string;
  cumulative_volume: number;
  swap_volume: number;
};

export const useArmTradingVolume = (limit?: number) => {
  return useQuery({
    staleTime: secondsInDay,
    queryKey: ['useArmTradingVolume'],
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
          rows: ArmTradingVolumeData[];
        };
      }) => {
        const rows = pathOr<ArmTradingVolumeData[]>(
          [],
          ['result', 'rows'],
          data,
        );

        const result = [];
        const endDate = toZonedTime(subDays(new Date(), 1), 'UTC');
        const findByDay =
          (currentDate: Date) => (data: ArmTradingVolumeData) => {
            return isSameDay(new Date(data.day.substring(0, 10)), currentDate);
          };
        let currentDate = toZonedTime(subDays(new Date(), limit ?? 365), 'UTC');

        while (currentDate <= endDate) {
          const item = rows.find(findByDay(currentDate));

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

export type ArmTradeData = {
  timestamp: number;
  amountIn: number;
  amountOut: number;
  amountOutMin: string;
  block_number: number;
  block_time: string;
  day: string;
  exactIn: boolean;
  inSymbol: string;
  inToken: string;
  outSymbol: string;
  outToken: string;
  output_amounts: string[];
  path: string[];
  price: number;
  swapType: string;
  to: string;
  tx_hash: string;
  uniswap: boolean;
};

export const useArmTrades = (limit?: number) => {
  return useQuery({
    // staleTime: secondsInDay,
    queryKey: ['useArmTrades'],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        api_key: import.meta.env.VITE_DUNE_API_KEY,
        limit: '5000',
        // from_date: '2024-11-01',
        sort_by: 'block_time',
        filters: `day >= '${format(
          toZonedTime(subDays(new Date(), 7), 'UTC'),
          'yyyy-MM-dd',
        )}'`,
      });
      const res = await axios.get(
        `https://api.dune.com/api/v1/query/3282263/results?${queryParams.toString()}`,
      );

      return res.data;
    },
    select: useCallback(
      (data: { result: { rows: ArmTradeData[] } }) => {
        const rows = pathOr<ArmTradeData[]>([], ['result', 'rows'], data);
        const limitDate = toZonedTime(subDays(new Date(), limit ?? 7), 'UTC');

        return rows
          .map((row) => ({
            ...row,
            timestamp: new Date(row.block_time).getTime(),
            day: row.day.substring(0, 10),
          }))
          .toSorted(ascend(prop('timestamp')))
          .filter((r) => r.timestamp >= limitDate.getTime());
      },
      [limit],
    ),
  });
};
