import type { Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';
import type { TransactionReceipt } from 'viem';

export type ActivityType =
  | 'swap'
  | 'redeem'
  | 'transaction'
  | 'bridge'
  | 'approval';

export type ActivityStatus = 'pending' | 'success' | 'error';

export type GlobalActivityStatus = 'idle' | ActivityStatus;

export type ActivityInput = {
  type: ActivityType;
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

export type Activity = ActivityInput & {
  id: string;
  createdOn: number;
};
