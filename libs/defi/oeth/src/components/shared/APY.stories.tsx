import { Container } from '@mui/material';

import { APY } from './APY';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof APY> = {
  component: APY,
  title: 'OETH/APY',
  args: {
    tokenIcon: '	/images/oeth.svg',
    value: 8.71,
    balance: 250.1937,
    pendingYield: 0.0023,
    earnings: 15.1937,
  },
  render: (args) => (
    <Container maxWidth="md">
      <APY {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof APY> = {};

export const SmallMobile: StoryObj<typeof APY> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
export const LargeMobile: StoryObj<typeof APY> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
export const Tablet: StoryObj<typeof APY> = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
