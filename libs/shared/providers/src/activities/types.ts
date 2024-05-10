import type { TokenId } from '@origin/shared/contracts';
import type { Hex } from 'viem';

export type ActivityStatus = 'idle' | 'pending' | 'success' | 'error';

export interface ActivityBase {
  id?: string;
  createdOn?: number;
  status: ActivityStatus;
  error?: string;
  txHash?: Hex;
}

export interface BridgeActivity extends ActivityBase {
  type: 'bridge';
  status: ActivityStatus;
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
}

export interface TransactionActivity extends ActivityBase {
  type: 'transaction';
  title?: string;
  subtitle?: string;
}

export interface RedeemActivity extends ActivityBase {
  type: 'redeem';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut: bigint;
}

export interface SwapActivity extends ActivityBase {
  type: 'swap';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut: bigint;
}

export interface ApprovalActivity extends ActivityBase {
  type: 'approval';
  tokenIdIn: TokenId;
  amountIn?: bigint;
}

export type Activity =
  | BridgeActivity
  | TransactionActivity
  | RedeemActivity
  | SwapActivity
  | ApprovalActivity;

export type ActivityType = Activity['type'];
