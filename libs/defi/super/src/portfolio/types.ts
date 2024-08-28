import type { HistoryType } from '@origin/defi/shared';

export type WsuperOETHbHistory = {
  id: string;
  chainId: number;
  blockNumber: number;
  timestamp: string;
  address: string;
  txHash: string;
  type: HistoryType;
  change: string;
  balance: string;
};
