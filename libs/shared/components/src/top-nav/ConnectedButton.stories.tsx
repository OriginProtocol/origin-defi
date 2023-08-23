import { within } from '@storybook/testing-library';

import { ConnectedButton } from './ConnectedButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConnectedButton> = {
  component: ConnectedButton,
  title: 'Top navigation/User connected',
  args: {
    userId: '0x65b033bcc4d7f74255bbde2f69966e85',
    walletIcon: 'https://app.oeth.com/images/walletconnect-icon.svg',
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
  },
};
export default meta;

export const Default: StoryObj<typeof ConnectedButton> = {};

export const Expanded: StoryObj<typeof ConnectedButton> = {
  name: 'User clicked on the profile button',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('connect-button').click();
  },
};

export const SmallMobile: StoryObj<typeof ConnectedButton> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('connect-button').click();
  },
};

export const LargeMobile: StoryObj<typeof ConnectedButton> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('connect-button').click();
  },
};

export const Tablet: StoryObj<typeof ConnectedButton> = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('connect-button').click();
  },
};
