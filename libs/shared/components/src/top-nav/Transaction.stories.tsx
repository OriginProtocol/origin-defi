import { Box } from '@mui/material';

import { transactions } from './fixtures';
import { Transaction } from './Transaction';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Transaction> = {
  component: Transaction,
  title: 'Top navigation/Transaction',
  render: (args) => (
    <Box sx={{ maxWidth: '378px', backgroundColor: '#1E1F25' }}>
      <Transaction {...args} />
    </Box>
  ),
};
export default meta;

export const ApprovalSuccess: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[0],
  },
};
export const ApprovalPending: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[1],
  },
};

export const ApprovalFailed: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[2],
  },
};
export const RebaseSuccess: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[3],
  },
};
export const RebasePending: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[4],
  },
};
export const RebaseFailed: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[5],
  },
};

export const SwapSuccess: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[6],
  },
};
export const SwapFailed: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[7],
  },
};
export const SwapPending: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[8],
  },
};
export const RedeemPending: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[9],
  },
};
export const RedeemSuccess: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[10],
  },
};
export const RedeemFailed: StoryObj<typeof Transaction> = {
  args: {
    // @ts-expect-error type mismatch
    transaction: transactions[11],
  },
};
