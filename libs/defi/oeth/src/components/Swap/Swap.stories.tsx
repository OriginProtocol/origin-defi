import { Container } from '@mui/material';

import { Swap } from './Swap';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Swap> = {
  component: Swap,
  title: 'Swap',
  args: {
    isLoading: false,
    routes: [],
  },
  render: () => (
    <Container maxWidth="sm">
      <Swap />
    </Container>
  ),
};

export default meta;

export const SwapComponent: StoryObj<typeof Swap> = {
  name: 'Swap Component',
};
