import type { Contract, Token } from '@origin/shared/contracts';
import type { SimulateContractReturnType } from '@wagmi/core';
import type {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  TransactionReceipt,
} from 'viem';

export type WriteTransactionParameters<
  abi extends Abi = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
> = {
  contract: Contract<abi> | Token<abi>;
  functionName: functionName;
  args: args;
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
