import type { OethHistoryTransactionQuery } from './queries.generated';

export type History = OethHistoryTransactionQuery['oTokenHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};

export type WOETHHistoryType = 'Sent' | 'Received' | 'Bridge';

export type WOETHHistory = {
  id: string;
  chainId: number;
  blockNumber: number;
  timestamp: string;
  address: string;
  txHash: string;
  type: WOETHHistoryType;
  change: string;
  balance: string;
};
