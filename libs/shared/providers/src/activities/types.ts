import type { Token, TokenId } from '@origin/shared/contracts';
import type { ReactNode } from 'react';
import type { TransactionReceipt } from 'viem';

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

export interface ActivityBase {
  id: string;
  createdOn: number;
}

export interface BridgeActivity extends ActivityBase {
  type: 'bridge';
  amountIn: bigint;
  tokenIn: TokenId;
  tokenOut: TokenId;
}

export interface TransactionActivity extends ActivityBase {
  title: string;
  subtitle: string;
  type: 'transaction';
  status: ActivityStatus;
  endIcon: ReactNode;
}

export type Activity = BridgeActivity | TransactionActivity | any;

export type ActivityType = Activity['type'];
// export type ActivityType =
//   | 'swap'
//   | 'redeem'
//   | 'transaction'
//   | 'bridge'
//   | 'approval';
