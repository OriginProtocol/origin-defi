import { TokenListModal } from './TokenListModal';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TokenListModal> = {
  component: TokenListModal,
  title: 'Swap Card/Swap Modal',
  args: {
    handleClose: () => null,
    isOpen: true,
    onSelection: (option) => null,
    options: [
      {
        name: 'Ether',
        abbreviation: 'ETH',
        imgSrc: '	/images/currency/eth-icon-small.svg',
        quantity: 13820,
        value: 0,
      },
      {
        name: 'Wrapped Ether',
        abbreviation: 'wETH',
        imgSrc: '/images/currency/weth-icon-small.png',
        quantity: 0,
        value: 0,
      },
      {
        name: 'Lido Staked Ether',
        abbreviation: 'stETH',
        imgSrc: '/images/currency/steth-icon-small.svg',
        quantity: 0,
        value: 0,
      },
      {
        name: 'Rocket Pool Ether',
        abbreviation: 'rETH',
        imgSrc: '/images/currency/reth-icon-small.png',
        quantity: 0,
        value: 0,
      },
      {
        name: 'Frax Ether',
        abbreviation: 'frxETH',
        imgSrc: '/images/currency/frxeth-icon-small.svg',
        quantity: 0,
        value: 0,
      },
      {
        name: 'Origin Ether',
        abbreviation: 'OETH',
        imgSrc: '/images/currency/oeth-icon-small.svg',
        quantity: 0,
        value: 0,
      },
      {
        name: 'Wrapped Ether',
        abbreviation: 'wOETH',
        imgSrc: '/images/currency/woeth-icon-small.svg',
        quantity: 1,
        value: 1952.38,
      },
    ],
  },
};

export default meta;

export const Default: StoryObj<typeof TokenListModal> = {};

export const SmallMobile: StoryObj<typeof TokenListModal> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const LargeMobile: StoryObj<typeof TokenListModal> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

export const TableMobile: StoryObj<typeof TokenListModal> = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
