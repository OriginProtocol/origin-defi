import { within } from '@storybook/testing-library';

import { TopNav } from './TopNav';

import type { Meta, StoryObj } from '@storybook/react';

const logo = 'https://app.oeth.com/images/origin-ether-logo.svg';
const tabs = ['Swap', 'Wrap', 'History'];

const connected = {
  logo,
  tabs,
  selected: 0,
  connected: true,
  ipfsLink: 'https://oeth.on.fleek.co/',
  userId: '0x65b033bcc4d7f74255bbde2f69966e85',
  walletIcon: 'https://app.oeth.com/images/walletconnect-icon.svg',
  transactions: [],
  values: [
    {
      token: 'eth',
      quantity: 18639.418285,
      tokenIcon: 'https://app.oeth.com/images/eth.svg',
    },
    {
      token: 'weth',
      quantity: 1639.418285,
      tokenIcon: 'https://app.oeth.com/images/weth.png',
    },
    {
      token: 'reth',
      quantity: 639.418285,
      tokenIcon: 'https://app.oeth.com/images/reth.png',
    },
    {
      token: 'frxeth',
      quantity: 39.418,
      tokenIcon: '	https://app.oeth.com/images/frxeth.svg',
    },
    {
      token: 'sfrxeth',
      quantity: 23639.415,
      tokenIcon: '	https://app.oeth.com/images/sfrxeth.svg',
    },
    {
      token: 'steth',
      quantity: 2639.415,
      tokenIcon: '	https://app.oeth.com/images/steth.svg',
    },
  ],
} as const;

const meta: Meta<typeof TopNav> = {
  component: TopNav,
  title: 'Top navigation/Navigation bar',
  args: {
    logo,
    tabs,
    selected: 0,
    ipfsLink: 'https://oeth.on.fleek.co/',
  },
};
export default meta;

export const Default: StoryObj<typeof TopNav> = {};
export const HoverItem: StoryObj<typeof TopNav> = {
  parameters: {
    pseudo: {
      hover: [
        '[href="/wrap"]',
        '[href="https://oeth.on.fleek.co/"]',
        '[data-testid="connect-button"]',
      ],
    },
  },
};

export const UserConnected: StoryObj<typeof TopNav> = {
  // @ts-expect-error values mismatch
  args: connected,
};

export const UserConnectedPopover: StoryObj<typeof TopNav> = {
  name: 'Profile button clicked',
  // @ts-expect-error values mismatch
  args: connected,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('connect-button').click();
  },
};

export const ActivityPopover: StoryObj<typeof TopNav> = {
  name: 'Transaction popover clicked',
  // @ts-expect-error values mismatch
  args: connected,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('activity-button').click();
  },
};

export const SmallMobile: StoryObj<typeof TopNav> = {
  name: 'Small mobile with user disconnected',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const SmallMobileConnected: StoryObj<typeof TopNav> = {
  name: 'Small mobile with user connected',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  // @ts-expect-error values mismatch
  args: connected,
};

export const LargeMobile: StoryObj<typeof TopNav> = {
  name: 'Large mobile with user disconnected',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

export const LargeMobileConnected: StoryObj<typeof TopNav> = {
  name: 'Large mobile with user connected',
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  // @ts-expect-error values mismatch
  args: connected,
};

export const Tablet: StoryObj<typeof TopNav> = {
  name: 'Tablet with user disconnected',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const TabletConnected: StoryObj<typeof TopNav> = {
  name: 'Tablet with user connected',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  // @ts-expect-error values mismatch
  args: connected,
};
