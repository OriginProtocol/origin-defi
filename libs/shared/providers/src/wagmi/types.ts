import type { Contract, Token } from '@origin/shared/contracts';
import type { TransactionReceipt } from 'viem';

export type WriteTransactionParameters = {
  contract: Contract | Token;
  functionName: string;
  args?: unknown[];
  value?: bigint;
};

export type WriteTransactionCallbacks = {
  onWrite?: () => void;
  onTxSigned?: () => void;
  onUserReject?: () => void;
  onSimulateError?: (error: Error) => void;
  onWriteSuccess?: (txReceipt: TransactionReceipt) => void;
  onWriteError?: (error: Error) => void;
};
