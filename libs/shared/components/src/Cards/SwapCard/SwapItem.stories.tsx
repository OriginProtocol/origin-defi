import { DropdownIcon, SwapItem } from './SwapItem';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SwapItem> = {
  component: SwapItem,
  title: 'Swap Card/Swap Item',
  args: {
    name: 'ETH',
    icon: 'https://app.oeth.com/images/currency/eth-icon-small.svg',
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
      'https://app.oeth.com/images/currency/weth-icon-small.png',
      'https://app.oeth.com/images/currency/reth-icon-small.png',
      'https://app.oeth.com/images/currency/steth-icon-small.svg',
      'https://app.oeth.com/images/currency/frxeth-icon-small.svg',
    ],
    name: 'LST Mix',
  },
};
