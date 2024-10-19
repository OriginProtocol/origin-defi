import type { TokenId } from '@origin/shared/contracts';
import type { Hex } from 'viem';

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

export interface ApprovalActivity extends ActivityBase {
  type: 'approval';
  tokenIdIn: TokenId;
  amountIn: bigint;
}

export interface BridgeActivity extends ActivityBase {
  type: 'bridge';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
}

export interface ClaimRewardsActivity extends ActivityBase {
  type: 'claim-rewards';
  tokenIdIn: TokenId;
  amountIn: bigint;
}

export interface ClaimWithdrawalActivity extends ActivityBase {
  type: 'claim-withdrawal';
  amountIn: bigint;
  tokenIdIn: TokenId;
}

export interface DelegateVoteActivity extends ActivityBase {
  type: 'delegate';
  tokenIdIn: TokenId;
  votingPower: bigint;
  delegateTo: string;
}

export interface ExtendStakeActivity extends ActivityBase {
  type: 'extend-stake';
  amountIn: bigint;
  tokenIdIn: TokenId;
  monthDuration: number;
  lockupId: string;
}

export interface MigrateActivity extends ActivityBase {
  type: 'migrate';
  amountIn: bigint;
  tokenIdIn: TokenId;
  tokenIdStaked: TokenId;
  tokenIdLiquid: TokenId;
  liquid?: bigint;
  staked?: bigint;
}

export interface RedeemActivity extends ActivityBase {
  type: 'redeem';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
}

export interface StakeActivity extends ActivityBase {
  type: 'stake';
  tokenIdIn: TokenId;
  amountIn: bigint;
  monthDuration: number;
}

export interface SwapActivity extends ActivityBase {
  type: 'swap';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  amountIn: bigint;
  amountOut: bigint;
}

export interface UnstakeActivity extends ActivityBase {
  type: 'unstake';
  tokenIdIn: TokenId;
  tokenIdOut: TokenId;
  lockupId: string;
}

export interface VoteActivity extends ActivityBase {
  type: 'vote';
  tokenIdIn: TokenId;
  choice: string;
  proposalId: string;
}

export interface RebasingActivity extends ActivityBase {
  type: 'rebasing';
  tokenIdIn: TokenId;
}

export interface DepositActivity extends ActivityBase {
  type: 'deposit';
  tokenIdIn: TokenId;
  amountIn: bigint;
}

export type Activity =
  | ApprovalActivity
  | BridgeActivity
  | ClaimRewardsActivity
  | ClaimWithdrawalActivity
  | DepositActivity
  | DelegateVoteActivity
  | ExtendStakeActivity
  | MigrateActivity
  | RebasingActivity
  | RedeemActivity
  | StakeActivity
  | SwapActivity
  | UnstakeActivity
  | VoteActivity;

export type ActivityType = Activity['type'];
