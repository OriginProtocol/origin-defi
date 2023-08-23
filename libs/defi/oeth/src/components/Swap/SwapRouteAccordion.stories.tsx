import { Box } from '@mui/material';
import { within } from '@storybook/testing-library';

import { routes } from './fixtures';
import { SwapRouteAccordion } from './SwapRouteAccordion';

import type { Meta, StoryObj } from '@storybook/react';

import type { Route } from './SwapRoute';

const meta: Meta<typeof SwapRouteAccordion> = {
  component: SwapRouteAccordion,
  title: 'Swap/Swap Route Accordion',
  args: {
    selected: 4,
    routes: routes as Route[],
  },
  render: (args) => (
    <Box sx={{ maxWidth: { xs: 160, md: 500 } }}>
      <SwapRouteAccordion {...args} />
    </Box>
  ),
};

export default meta;

export const Default: StoryObj<typeof SwapRouteAccordion> = {};
export const Expanded: StoryObj<typeof SwapRouteAccordion> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    (await canvas.findByText('Show more')).click();
  },
};
