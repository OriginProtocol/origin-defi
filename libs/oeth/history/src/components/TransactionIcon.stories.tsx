import { TransactionIcon } from './TransactionIcon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TransactionIcon> = {
  component: TransactionIcon,
  title: 'History/TransactionIcon',
  args: {
    type: 'yield',
  },
};

export default meta;

export const Yield: StoryObj<typeof TransactionIcon> = {};

export const SmallScreen: StoryObj<typeof TransactionIcon> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Sent: StoryObj<typeof TransactionIcon> = {
  args: {
    type: 'sent',
  },
};

export const Received: StoryObj<typeof TransactionIcon> = {
  args: {
    type: 'received',
  },
};

export const Swap: StoryObj<typeof TransactionIcon> = {
  args: {
    type: 'swap',
    tokenIcon: 'https://app.oeth.com/images/currency/reth-icon-small.png',
  },
};
