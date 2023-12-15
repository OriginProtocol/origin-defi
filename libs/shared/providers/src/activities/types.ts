/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';
import type { TransactionReceipt } from 'viem';

export type ActivityType = 'swap' | 'approval' | 'redeem' | 'transaction';

export type ActivityStatus = 'pending' | 'success' | 'error';

export type GlobalActivityStatus = 'idle' | ActivityStatus;

export type Activity = {
  id: string;
  createdOn: number;
  tokenIn?: Token;
  tokenOut?: Token;
  amountIn?: bigint;
  amountOut?: bigint;
  title?: ReactNode;
  subtitle?: ReactNode;
  endIcon?: ReactNode;
  txReceipt?: TransactionReceipt;
  type: ActivityType;
  status: ActivityStatus;
  error?: string;
};
