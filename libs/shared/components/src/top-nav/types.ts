export interface Connected {
  connected: true;
  userAvatar: string;
  userId: string;
  walletIcon: string;
  values: { token: string; tokenIcon: string; quantity: number }[];
  transactions: Transaction[];
}

export type Transaction = {
  status: 'pending' | 'failed' | 'success';
  url: string;
} & (Approval | Swap | Redeem | Rebase);

export interface Approval {
  token: string;
  tokenIcon: string;
  type: 'approval';
}

export interface Swap {
  baseToken: string;
  baseTokenQuantity: number;
  baseTokenIcon: string;
  exchangeToken: string;
  exchangeTokenQuantity: number;
  exchangeTokenIcon: string;
  type: 'swap';
}

export interface Redeem {
  baseToken: string;
  baseTokenQuantity: number;
  baseTokenIcon: string;
  exchangeToken: string;
  exchangeTokenQuantity: number;
  exchangeTokenIcon: string;
  type: 'redeem';
}

export interface Rebase {
  type: 'rebase';
  token: string;
  tokenIcon: string;
}
