import { useMemo } from 'react';

import { useTheme } from '@mui/material';
import { scaleLinear } from '@visx/scale';
import { Bubble } from 'react-chartjs-2';

import { useDPrice } from '../state';

import type { ChartData, ChartOptions } from 'chart.js';

export const PriceChart = () => {
  const [{ points }] = useDPrice();
  const theme = useTheme();

  const options: ChartOptions<'bubble'> = {
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = useMemo<ChartData<'bubble'>>(
    () => ({
      datasets: [
        {
          label: 'Bought',
          data: points.map(mapDataBought),
          backgroundColor: [
            theme.palette.chart1,
            theme.palette.chart2,
            theme.palette.chart3,
            theme.palette.chart4,
            theme.palette.chart5,
            theme.palette.chart6,
            theme.palette.chart7,
          ],
        },
      ],
    }),
    [
      points,
      theme.palette.chart1,
      theme.palette.chart2,
      theme.palette.chart3,
      theme.palette.chart4,
      theme.palette.chart5,
      theme.palette.chart6,
      theme.palette.chart7,
    ],
  );

  return <Bubble options={options} data={data} />;
};

const scaleR = scaleLinear({
  domain: [0, 700],
  range: [5, 40],
});

const mapDataBought = (data, index) => {
  return {
    x: index,
    y: Number(data.amm_in) / Number(data.final_out),
    r: scaleR(data.bought_amount),
  };
};
