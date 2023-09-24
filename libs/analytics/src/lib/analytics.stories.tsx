import { faker } from '@faker-js/faker';
import { Container } from '@mui/material';
import dayjs from 'dayjs';

import { Analytics } from './analytics';

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

const meta: Meta<typeof Analytics> = {
  component: Analytics,
  title: 'Analytics/test',
  args: {
    title: 'APY',
    data: {
      datasets: [
        {
          type: 'line',
          data: array(180, { x: new Date('2023-01-01'), y: 0.05 }, (last) => ({
            x: dayjs(last.x).add(1, 'day').toDate(),
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
      <Analytics {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof Analytics> = {};
