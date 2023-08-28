import { Container } from '@mui/material';

import { TokenListItem } from './TokenListItem';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TokenListItem> = {
  component: TokenListItem,
  title: 'Swap Card/Token list item',
  args: {
    option: {
      name: 'Lido Staked Ether',
      abbreviation: 'stETH',
      imgSrc: '	/images/currency/steth-icon-small.svg',
      quantity: 4,
      value: 8580.24,
    },
    onSelection: () => null,
    selected: false,
  },
  render: (args) => (
    <Container maxWidth="xs">
      <TokenListItem {...args} />
    </Container>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#282A32',
        },
      ],
    },
  },
};

export default meta;

export const Default: StoryObj<typeof TokenListItem> = {};

export const Hover: StoryObj<typeof TokenListItem> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Selected: StoryObj<typeof TokenListItem> = {
  args: {
    selected: true,
  },
};

export const Mix: StoryObj<typeof TokenListItem> = {
  args: {
    option: {
      imgSrc: [
        '/images/currency/weth-icon-small.png',
        '/images/currency/reth-icon-small.png',
        '/images/currency/steth-icon-small.svg',
        '/images/currency/frxeth-icon-small.svg',
      ],
      name: 'LST Mix',
      abbreviation: ['wETH', 'rETH', 'stETH', 'frxETH'],
      value: 0,
      quantity: 0,
    },
  },
};

export const MixTwoItems: StoryObj<typeof TokenListItem> = {
  args: {
    option: {
      imgSrc: [
        '/images/currency/weth-icon-small.png',
        '/images/currency/reth-icon-small.png',
      ],
      name: 'LST Mix',
      abbreviation: ['wETH', 'rETH'],
      value: 0,
      quantity: 0,
    },
  },
};
