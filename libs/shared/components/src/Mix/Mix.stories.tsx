import { Mix } from './Mix';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Mix> = {
  component: Mix,
  title: 'Shared components/Mix',
  args: {
    imgSrc: [
      '/images/currency/weth-icon-small.png',
      '/images/currency/reth-icon-small.png',
      '/images/currency/steth-icon-small.svg',
      '/images/currency/frxeth-icon-small.svg',
    ],
  },
};

export default meta;

export const Default: StoryObj<typeof Mix> = {};
