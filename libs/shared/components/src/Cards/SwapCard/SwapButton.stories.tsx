import { SwapButton } from './SwapButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SwapButton> = {
  component: SwapButton,
  title: 'Swap Card/Swap Button',
  args: {},
};

export default meta;

export const Default: StoryObj<typeof SwapButton> = {};

export const Hover: StoryObj<typeof SwapButton> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Mobile: StoryObj<typeof SwapButton> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
