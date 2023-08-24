import { Container } from '@mui/material';

import { Output } from './Output';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Output> = {
  component: Output,
  title: 'Swap Card/Output',
  args: {
    isLoading: false,
    isSwapped: false,
    exchangeTokenQuantity: 0,
    exchangeTokenValue: 0,
    exchangeTokenName: 'OETH',
    exchangeTokenIcon: '	/images/currency/oeth-icon-small.svg',
    exchangeTokenBalance: 0,
  },
  render: (args) => (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Output {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof Output> = {};

export const WithValue: StoryObj<typeof Output> = {
  args: {
    exchangeTokenQuantity: 150,
    exchangeTokenValue: 284389.5,
  },
};

export const Loading: StoryObj<typeof Output> = {
  args: {
    isLoading: true,
  },
};
