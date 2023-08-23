import { Container } from '@mui/material';
import { userEvent, within } from '@storybook/testing-library';

import { routes } from './fixtures';
import { SwapRoute } from './SwapRoute';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SwapRoute> = {
  component: SwapRoute,
  title: 'Swap/Swap Route',
  args: {
    isLoading: false,
    routes: [],
  },
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
  render: (args) => (
    <Container maxWidth="sm">
      <SwapRoute {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof SwapRoute> = {};

export const HoverRouteInfo: StoryObj<typeof SwapRoute> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = await canvas.findByTestId('swap-route-info');
    userEvent.hover(element);
  },
};
export const Loading: StoryObj<typeof SwapRoute> = {
  args: {
    isLoading: true,
  },
};

export const SwapContent: StoryObj<typeof SwapRoute> = {
  args: {
    // @ts-expect-error fixtures and type mismatch
    routes,
  },
};
