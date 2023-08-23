import { Box } from '@mui/material';

import { routes } from './fixtures';
import { SwapRouteAccordionItem } from './SwapRouteAccordionItem';

import type { Meta, StoryObj } from '@storybook/react';

import type { Route } from './SwapRoute';

const meta: Meta<typeof SwapRouteAccordionItem> = {
  component: SwapRouteAccordionItem,
  title: 'Swap/Swap Route Accordion Item',
  args: {
    selected: 4,
    index: 2,
    route: routes[2] as Route,
  },
  render: (args) => (
    <Box sx={{ maxWidth: { xs: 285, md: 500 } }}>
      <SwapRouteAccordionItem {...args} />
    </Box>
  ),
};

export default meta;

export const Default: StoryObj<typeof SwapRouteAccordionItem> = {};
export const Hover: StoryObj<typeof SwapRouteAccordionItem> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};
export const Selected: StoryObj<typeof SwapRouteAccordionItem> = {
  args: {
    selected: 2,
  },
};

export const SmallMobile: StoryObj<typeof SwapRouteAccordionItem> = {
  args: {
    selected: 2,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const LargeMobile: StoryObj<typeof SwapRouteAccordionItem> = {
  args: {
    selected: 2,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
