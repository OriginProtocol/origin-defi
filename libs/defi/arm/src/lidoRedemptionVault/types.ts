import type { ARMRoute } from '@origin/shared/routes';

export type WithdrawalRequest = {
  id: string;
  requestId: bigint;
  timestamp: string;
  amount: bigint;
  queued: bigint;
  claimed: boolean;
  blockNumber: number;
  claimable: boolean;
  txHash: string;
};

export type DepositARMAction = Extract<
  ARMRoute,
  'deposit-arm-lido' | 'deposit-arm-zapper'
>;
