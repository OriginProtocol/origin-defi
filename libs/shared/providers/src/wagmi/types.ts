import type { Contract, Token } from '@origin/shared/contracts';
import type { SimulateContractReturnType } from '@wagmi/core';
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
  onSimulateSuccess?: (data: SimulateContractReturnType) => void;
  onSimulateError?: (error: Error) => void;
  onWriteSuccess?: (txReceipt: TransactionReceipt) => void;
  onWriteError?: (error: Error) => void;
};
