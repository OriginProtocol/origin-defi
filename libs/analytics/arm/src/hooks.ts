import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { ascend, pathOr, prop } from 'ramda';

import type { Dayjs } from 'dayjs';

export type ArmTradingVolumeData = {
  day: string;
  cumulative_volume: number;
  swap_volume: number;
  eth_price: number;
};

export const useArmTradingVolume = (limit?: number) => {
  return useQuery({
    staleTime: 60 * 60 * 24,
    queryKey: ['useArmTradingVolume'],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        queryId: '4224357',
        limit: '5000',
        sort_by: 'day',
      });
      const res = await axios.get(
        `${import.meta.env.VITE_DEFI_ANALYTICS_URL}/api/v2/dune/?${queryParams.toString()}`,
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
        const endDate = dayjs.utc();
        const findByDay =
          (currentDate: Dayjs) => (data: ArmTradingVolumeData) => {
            return dayjs.utc(data.day).isSame(currentDate, 'day');
          };
        let currentDate = dayjs
          .utc()
          .hour(23)
          .minute(59)
          .second(59)
          .millisecond(999)
          .subtract(limit ?? 365, 'day');

        while (currentDate.isBefore(endDate, 'day')) {
          const item = rows.find(findByDay(currentDate));
          const ethPrice = item?.eth_price ?? 0;

          result.push({
            timestamp: +currentDate,
            day: currentDate.format('YYYY-MM-DD'),
            tradingVolumeETH: item?.cumulative_volume ?? 0,
            tradingVolumeUSD: (item?.cumulative_volume ?? 0) * ethPrice,
            swapVolumeETH: item?.swap_volume ?? 0,
            swapVolumeUSD: (item?.swap_volume ?? 0) * ethPrice,
          });
          currentDate = currentDate.add(1, 'day');
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
    staleTime: 60 * 60 * 24,
    queryKey: ['useArmTrades'],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        queryId: '4397678',
        limit: '5000',
        sort_by: 'block_time',
        filters: `day >= '${dayjs.utc().subtract(7, 'days').format('YYYY-MM-DD')}'`,
      });
      const res = await axios.get(
        `${import.meta.env.VITE_DEFI_ANALYTICS_URL}/api/v2/dune/?${queryParams.toString()}`,
      );

      return res.data;
    },
    select: useCallback(
      (data: { result: { rows: ArmTradeData[] } }) => {
        const rows = pathOr<ArmTradeData[]>([], ['result', 'rows'], data);
        const limitDate = dayjs.utc().subtract(limit ?? 7, 'days');

        return rows
          .map((row) => ({
            ...row,
            timestamp: +dayjs.utc(row.block_time),
            day: row.day.substring(0, 10),
          }))
          .toSorted(ascend(prop('timestamp')))
          .filter((r) => r.timestamp >= +limitDate);
      },
      [limit],
    ),
  });
};
