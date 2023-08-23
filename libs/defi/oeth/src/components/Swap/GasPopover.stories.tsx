import { screen, userEvent, within } from '@storybook/testing-library';

import { GasPopover } from './GasPopover';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GasPopover> = {
  component: GasPopover,
  title: 'Swap/GasPopover',
  args: {
    gasPrice: 21,
    onPriceToleranceChange: (val) => null,
  },
};

export default meta;

export const Default: StoryObj<typeof GasPopover> = {};

export const Expanded: StoryObj<typeof GasPopover> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByTestId('gas-popover-button').click();
  },
};

export const HighTolerance: StoryObj<typeof GasPopover> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.getByTestId('gas-popover-button').click();
    const input = await screen.findByLabelText('Price tolerance');
    await userEvent.clear(input);
    await userEvent.type(input, '1.2');
  },
};
