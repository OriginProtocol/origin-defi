import { DropdownIcon, SwapItem } from './SwapItem';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SwapItem> = {
  component: SwapItem,
  title: 'Swap Card/Swap Item',
  args: {
    name: 'ETH',
    icon: '/images/currency/eth-icon-small.svg',
  },
};

export default meta;

export const Default: StoryObj<typeof SwapItem> = {};
export const WithAdditionalNode: StoryObj<typeof SwapItem> = {
  args: {
    additionalNode: <DropdownIcon />,
  },
};

export const Hover: StoryObj<typeof SwapItem> = {
  args: {
    additionalNode: <DropdownIcon />,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};
export const Mix: StoryObj<typeof SwapItem> = {
  args: {
    icon: [
      '/images/currency/weth-icon-small.png',
      '/images/currency/reth-icon-small.png',
      '/images/currency/steth-icon-small.svg',
      '/images/currency/frxeth-icon-small.svg',
    ],
    name: 'LST Mix',
  },
};
