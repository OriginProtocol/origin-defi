import { Box } from '@mui/material';

import { redeemRoutes, routes } from './fixtures';
import { SwapRouteCard } from './SwapRouteCard';

import type { Meta, StoryObj } from '@storybook/react';

import type { Route } from './SwapRoute';

const meta: Meta<typeof SwapRouteCard> = {
  component: SwapRouteCard,
  title: 'Swap/SwapRouteCard',
  args: {
    route: routes[0] as Route,
    selected: 3,
    index: 4,
  },
  render: (args) => (
    <Box sx={{ maxWidth: { xs: 160, md: 230 } }}>
      <SwapRouteCard {...args} />
    </Box>
  ),
};

export default meta;

export const SwapComponent: StoryObj<typeof SwapRouteCard> = {};

export const Hover: StoryObj<typeof SwapRouteCard> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};
export const Selected: StoryObj<typeof SwapRouteCard> = {
  args: {
    selected: 4,
  },
};

export const Best: StoryObj<typeof SwapRouteCard> = {
  args: {
    selected: 0,
    index: 0,
  },
};

export const RedeemShort: StoryObj<typeof SwapRouteCard> = {
  args: {
    selected: 0,
    index: 0,
    route: redeemRoutes[1] as Route,
  },
};
export const RedeemLong: StoryObj<typeof SwapRouteCard> = {
  args: {
    selected: 0,
    index: 0,
    route: redeemRoutes[0] as Route,
  },
};

export const SmallMobile: StoryObj<typeof SwapRouteCard> = {
  args: {
    selected: 0,
    index: 0,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const LargeMobile: StoryObj<typeof SwapRouteCard> = {
  args: {
    selected: 0,
    index: 0,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
