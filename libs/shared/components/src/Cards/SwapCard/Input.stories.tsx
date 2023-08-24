import { Container } from '@mui/material';
import { userEvent, within } from '@storybook/testing-library';

import { Input } from './Input';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Swap Card/Input',
  args: {
    isLoading: false,
    isSwapped: false,
    baseTokenBalance: 250,
    baseTokenValue: 0,
    baseTokenName: 'stETH',
    baseTokenIcon: '/images/currency/steth-icon-small.svg',
    onValueChange: () => null,
  },
  render: (args) => (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Input {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof Input> = {};

export const Hover: StoryObj<typeof Input> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const WithValue: StoryObj<typeof Input> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByTestId('swap-input');
    userEvent.type(element, '150');
  },
};
