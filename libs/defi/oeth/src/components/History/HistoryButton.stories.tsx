import { HistoryFilterButton } from './HistoryButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HistoryFilterButton> = {
  component: HistoryFilterButton,
  title: 'History/History filter button',
  args: {
    circle: false,
    children: 'Test',
  },
  render: (args) => <HistoryFilterButton {...args} />,
};

export default meta;

export const Primary: StoryObj<typeof HistoryFilterButton> = {};

export const WithCircle: StoryObj<typeof HistoryFilterButton> = {
  args: {
    circle: true,
  },
};

export const Selected: StoryObj<typeof HistoryFilterButton> = {
  args: {
    circle: true,
    selected: true,
  },
};
