import { Container } from '@mui/material';

import { SwapCard } from './SwapCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SwapCard> = {
  component: SwapCard,
  title: 'Swap Card/Card',
  args: {
    title: 'Swap',
    baseTokenIcon: '/images/currency/eth-icon-small.svg',
    baseTokenName: 'ETH',
    baseTokenValue: 0,
    exchangeTokenValue: 0,
    exchangeTokenQuantity: 0,
    exchangeTokenIcon: '/images/currency/oeth-icon-small.svg',
    exchangeTokenName: 'OETH',
  },
  render: (args) => (
    <Container maxWidth="sm" sx={{ marginInline: 'auto' }}>
      <SwapCard {...args} />
    </Container>
  ),
};
export default meta;

export const Default: StoryObj<typeof SwapCard> = {};

export const WithMaxValue: StoryObj<typeof SwapCard> = {
  args: {
    baseTokenBalance: 250,
  },
};

export const WithExchangeTokenValue: StoryObj<typeof SwapCard> = {
  args: {
    exchangeTokenValue: 284389.5,
    exchangeTokenQuantity: 150,
    exchangeTokenBalance: 300,
  },
};

export const Hover: StoryObj<typeof SwapCard> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const IsLoading: StoryObj<typeof SwapCard> = {
  args: {
    isLoading: true,
  },
};

export const SmallMobile: StoryObj<typeof SwapCard> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const LargeMobile: StoryObj<typeof SwapCard> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

export const Tablet: StoryObj<typeof SwapCard> = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
