import { useMemo } from 'react';

import { useTheme } from '@mui/material';
import { scaleLinear } from '@visx/scale';
import { take } from 'ramda';
import { Bubble } from 'react-chartjs-2';

import csv from '../data.csv';
import { useDPrice } from '../state';
import { getARMPrice, getBoughtAmount, getTradePrice } from '../utils';

import type { ChartData, ChartOptions } from 'chart.js';

export const PriceChart = () => {
  const [{ index }] = useDPrice();
  const theme = useTheme();

  const options: ChartOptions<'bubble'> = useMemo(
    () => ({
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          min: 0.998,
          max: 1.001,
        },
      },
      layout: {
        padding: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: index === 0 ? 0 : getARMPrice(csv[index]),
              yMax: index === 0 ? 0 : getARMPrice(csv[index]),
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
          },
        },
      },
    }),
    [index, theme.palette.primary.main],
  );

  const data = useMemo<ChartData<'bubble'>>(() => {
    const points = take(index, csv);

    return {
      datasets: [
        {
          label: 'Won',
          data: points.map(mapDataWon),
          backgroundColor: [theme.palette.chart1, theme.palette.chart2],
        },
        {
          label: 'Miss',
          data: points.map(mapDataMiss),
          backgroundColor: [theme.palette.chart3, theme.palette.chart4],
        },
      ],
    };
  }, [
    index,
    theme.palette.chart1,
    theme.palette.chart2,
    theme.palette.chart3,
    theme.palette.chart4,
  ]);

  return <Bubble options={options} data={data} width={1000} height={600} />;
};

const scaleR = scaleLinear({
  domain: [0, 70],
  range: [5, 90],
});

const mapDataWon = (data: any, index: number) => {
  return {
    x: index,
    y: getTradePrice(data),
    r: data.won_trade === 'True' ? scaleR(Math.sqrt(getBoughtAmount(data))) : 0,
  };
};

const mapDataMiss = (data: any, index: number) => {
  return {
    x: index,
    y: getTradePrice(data),
    r:
      data.won_trade === 'False'
        ? scaleR(Math.sqrt(Math.sqrt(getBoughtAmount(data))))
        : 0,
  };
};
