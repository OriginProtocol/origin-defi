import type { Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';
import type { TransactionReceipt } from 'viem';

export type ActivityStatus = 'pending' | 'success' | 'error';

export type GlobalActivityStatus = 'idle' | ActivityStatus;

export type SwapActivity = {
  type: 'swap' | 'redeem' | 'transaction' | 'bridge';
  tokenIn?: Token;
  tokenOut?: Token;
  amountIn?: bigint;
  amountOut?: bigint;
  title?: ReactNode;
  subtitle?: ReactNode;
  endIcon?: ReactNode;
  txReceipt?: TransactionReceipt;
  status: ActivityStatus;
  error?: string;
};

export type ApprovalActivity = {
  type: 'approval';
  status: ActivityStatus;
  tokenIn?: Token;
  amountIn?: bigint;
  txReceipt?: TransactionReceipt;
  error?: string;
};

export type ActivityInput = ApprovalActivity | SwapActivity;
export type Activity = ActivityInput & {
  id: string;
  createdOn: number;
};
