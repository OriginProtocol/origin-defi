import { Mix } from './Mix';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Mix> = {
  component: Mix,
  title: 'Shared components/Mix',
  args: {
    imgSrc: [
      '/images/tokens/WETH.svg',
      '/images/tokens/rETH.svg',
      '/images/tokens/stETH.svg',
      '/images/tokens/frxETH.svg',
    ],
  },
};

export default meta;

export const Default: StoryObj<typeof Mix> = {};
