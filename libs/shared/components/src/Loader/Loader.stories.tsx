import { Loader } from './Loader';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Loader> = {
  component: Loader,
  title: 'Shared components/Loader',
  args: {
    width: 345,
    height: 14,
  },
};

export default meta;

export const Default: StoryObj<typeof Loader> = {};
