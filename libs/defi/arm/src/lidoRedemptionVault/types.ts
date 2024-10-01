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
