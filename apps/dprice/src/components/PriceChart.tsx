import { useMemo } from 'react';

import { useTheme } from '@mui/material';
import { scaleLinear } from '@visx/scale';
import { take, takeLast } from 'ramda';
import { Bubble } from 'react-chartjs-2';

import csv from '../data.csv';
import { useDPrice } from '../state';
import {
  getARMPrice,
  getBoughtAmount,
  getIsWonTrade,
  getTimestamp,
  getTradePrice,
} from '../utils';

import type { ChartData, ChartOptions } from 'chart.js';

type PriceChartData = {
  x: Date;
  y: number;
  r: number;
  color: string;
};

export const PriceChart = () => {
  const [{ index, span }] = useDPrice();
  const theme = useTheme();

  const options: ChartOptions<'bubble'> = useMemo(
    () => ({
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          type: 'time',
        },
        y: {
          min: 0.998,
          max: 1.001,
        },
      },
      layout: {
        padding: 0,
      },
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: index === 0 ? 0 : Math.max(0.998, getARMPrice(csv[index])),
              yMax: index === 0 ? 0 : Math.max(0.998, getARMPrice(csv[index])),
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    }),
    [index, theme.palette.primary.main],
  );

  const data = useMemo<ChartData<'bubble', PriceChartData[]>>(() => {
    const points = takeLast(span, take(index, csv));
    return {
      datasets: [
        {
          label: 'Won',
          data: points.map(mapDataWon),
          backgroundColor: (ctx) =>
            (ctx?.raw as PriceChartData)?.color ?? '#000',
        },
        {
          label: 'Miss',
          data: points.map(mapDataMiss),
          backgroundColor: (ctx) =>
            (ctx?.raw as PriceChartData)?.color ?? '#000',
        },
      ],
    };
  }, [index, span]);

  return <Bubble options={options} data={data} width={1000} height={600} />;
};

const scaleR = scaleLinear({
  domain: [0, 70],
  range: [5, 90],
});

const mapDataWon = (data: Point) => {
  return {
    x: getTimestamp(data),
    y: getTradePrice(data),
    r: getIsWonTrade(data) ? scaleR(Math.sqrt(getBoughtAmount(data))) : 0,
    color: data.index % 2 === 0 ? '#586CF8' : '#48E4DB',
  };
};

const mapDataMiss = (data: Point) => {
  return {
    x: getTimestamp(data),
    y: getTradePrice(data),
    r: !getIsWonTrade(data)
      ? scaleR(Math.sqrt(Math.sqrt(getBoughtAmount(data))))
      : 0,
    color: data.index % 2 === 0 ? '#D0246A' : '#E85BFF',
  };
};
