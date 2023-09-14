import { Container } from '@mui/material';

import { ChartCard } from './ChartCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ChartCard> = {
  component: ChartCard,
  title: 'History/ChartCard',
  args: {
    apyPercent: 9.71,
    apy: [
      {
        timestamp: '2023-09-12T06:59:59.000000Z',
        value: 8.422167648369584,
      },
      {
        timestamp: '2023-09-11T07:01:47.000000Z',
        value: 8.042548530846783,
      },
      {
        timestamp: '2023-09-10T06:59:47.000000Z',
        value: 8.405314460699497,
      },
      {
        timestamp: '2023-09-09T06:59:47.000000Z',
        value: 7.772087576083497,
      },
      {
        timestamp: '2023-09-08T06:59:59.000000Z',
        value: 7.998306152376022,
      },
      {
        timestamp: '2023-09-07T06:59:47.000000Z',
        value: 7.588201747600309,
      },
      {
        timestamp: '2023-09-06T06:59:47.000000Z',
        value: 8.448718911023612,
      },
    ],
  },
  render: (args) => (
    <Container maxWidth="sm">
      <ChartCard {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof ChartCard> = {};
