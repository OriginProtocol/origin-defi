import { Container } from '@mui/material';

import { ActionButton } from './ActionButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ActionButton> = {
  component: ActionButton,
  title: 'Swap Card/Action Button',
  args: {
    children: 'Swap',
  },
  render: (args) => (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <ActionButton {...args} />
    </Container>
  ),
};

export default meta;

export const Default: StoryObj<typeof ActionButton> = {};

export const Hover: StoryObj<typeof ActionButton> = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Disabled: StoryObj<typeof ActionButton> = {
  args: {
    disabled: true,
  },
};

export const SmallMobile: StoryObj<typeof ActionButton> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
