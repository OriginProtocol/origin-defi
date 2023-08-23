import { Mix } from './Mix';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Mix> = {
  component: Mix,
  title: 'Shared components/Mix',
  args: {
    imgSrc: [
      'https://app.oeth.com/images/currency/weth-icon-small.png',
      'https://app.oeth.com/images/currency/reth-icon-small.png',
      'https://app.oeth.com/images/currency/steth-icon-small.svg',
      'https://app.oeth.com/images/currency/frxeth-icon-small.svg',
    ],
  },
};

export default meta;

export const Default: StoryObj<typeof Mix> = {};
