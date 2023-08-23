import { within } from '@storybook/testing-library';

import { Activity } from './Activity';
import { transactions } from './fixtures';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Activity> = {
  component: Activity,
  title: 'Top navigation/Activity',
  args: {
    transactions: [],
  },
};
export default meta;

export const Default: StoryObj<typeof Activity> = {};

export const Hover: StoryObj<typeof Activity> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Expanded: StoryObj<typeof Activity> = {
  name: 'User clicked on the profile button',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('activity-button').click();
  },
};

export const ExpandedWithTransactions: StoryObj<typeof Activity> = {
  name: 'Recent activity list',
  // @ts-expect-error type mismatch
  args: { transactions },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('activity-button').click();
  },
};

export const ExpandedWithLessTransactions: StoryObj<typeof Activity> = {
  name: 'Recent activity list with smaller number of transactions',
  // @ts-expect-error type mismatch
  args: { transactions: transactions.slice(0, 4) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('activity-button').click();
  },
};

export const MobileSmall: StoryObj<typeof Activity> = {
  name: 'Mobile -> Recent activity list',
  // @ts-expect-error type mismatch
  args: { transactions: transactions.slice(0, 4) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('activity-button').click();
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileLarge: StoryObj<typeof Activity> = {
  name: 'Mobile large -> Recent activity list',
  // @ts-expect-error type mismatch
  args: { transactions: transactions.slice(0, 4) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('activity-button').click();
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

export const Tablet: StoryObj<typeof Activity> = {
  name: 'Tablet -> Recent activity list',
  // @ts-expect-error type mismatch
  args: { transactions: transactions.slice(0, 4) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('activity-button').click();
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
