import type { TokenId } from '@origin/shared/contracts';
import type * as icons from '@origin/shared/icons';
import type { Hex } from 'viem';

export type IconType = keyof typeof icons;

export type ActivityStatus =
  | 'idle'
  | 'pending'
  | 'signed'
  | 'success'
  | 'error';

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
  endIcon?: IconType;
}

export interface RedeemActivity extends ActivityBase {
  type: 'redeem';
  tokenIdIn: TokenId;
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

export interface StakeActivity extends ActivityBase {
  type: 'stake';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut?: bigint;
  duration: number;
  lockupId?: bigint;
}

export interface ExtendStakeActivity extends ActivityBase {
  type: 'extend-stake';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut?: bigint;
  duration: number;
  lockupId: bigint;
}

export interface UnstakeActivity extends ActivityBase {
  type: 'unstake';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut?: bigint;
  lockupId: bigint;
}

export interface ClaimRewardsActivity extends ActivityBase {
  type: 'claim-rewards';
  tokenIdIn: TokenId;
  amountIn?: bigint;
}

export type Activity =
  | BridgeActivity
  | TransactionActivity
  | RedeemActivity
  | SwapActivity
  | ApprovalActivity
  | StakeActivity
  | ExtendStakeActivity
  | UnstakeActivity
  | ClaimRewardsActivity;

export type ActivityType = Activity['type'];
