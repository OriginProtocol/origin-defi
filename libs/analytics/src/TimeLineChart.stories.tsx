import { faker } from '@faker-js/faker';
import { Container } from '@mui/material';
import { addDays } from 'date-fns';

import { TimeLineChart } from './TimeLineChart';

import type { Meta, StoryObj } from '@storybook/react';

faker.seed(4548);

function array<T>(n: number, initial: T, fn: (last: T) => T) {
  let last: T = initial;
  return new Array(n).fill(0).map((_, index) => {
    if (index === 0) return last;
    return (last = fn(last));
  });
}

const ema = (p: number) => {
  let last: number;
  return (val: number) => {
    return (last = (val + (last ?? val) * (p - 1)) / p);
  };
};

const smooth = ema(7);

const meta: Meta<typeof TimeLineChart> = {
  component: TimeLineChart,
  title: 'Analytics/TimeLineChart',
  args: {
    title: 'APY',
    filter: {
      options: ['1W', '1M', '6M', '1Y', 'All'],
      value: '1W',
      onChange: (value) => console.log(value),
    },
    data: {
      datasets: [
        {
          type: 'line',
          data: array(180, { x: new Date('2023-01-01'), y: 0.05 }, (last) => ({
            x: addDays(last.x, 1),
            y: faker.number.float({
              min: last.y * 0.9,
              max: last.y * 1.1,
            }),
          })).map((d) => ({
            x: d.x,
            y: smooth(d.y),
          })),
        },
      ],
    },
    formatValues: (val) => {
      return `${Math.floor(Number(val) * 10000) / 100}%`;
    },
  },
  render: (args) => (
    <Container>
      <TimeLineChart {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof TimeLineChart> = {};
