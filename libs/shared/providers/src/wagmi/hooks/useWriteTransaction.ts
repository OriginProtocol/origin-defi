import { useCallback, useEffect, useState } from 'react';

import { isUserRejected } from '@origin/shared/utils';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { useAccount, useConfig, useSimulateContract } from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
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
  contract: {
    address: HexAddress;
    chainId: number;
    abi: abi;
  };
  functionName: functionName;
  args?: args;
  value?: bigint;
};

export type WriteTransactionCallbacks = {
  onClick?: () => void;
  onWrite?: () => void;
  onTxSigned?: () => void;
  onUserReject?: () => void;
  onSimulateSuccess?: (data: SimulateContractReturnType) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSimulateError?: (error: any) => void;
  onWriteSuccess?: (txReceipt: TransactionReceipt) => void;
  onWriteError?: (error: Error) => void;
};

export const useWriteTransaction = (args: {
  parameters: WriteTransactionParameters;
  callbacks?: WriteTransactionCallbacks;
}) => {
  const config = useConfig();
  const { isConnected, chain } = useAccount();
  const [status, setStatus] = useState<
    'idle' | 'waitingForSignature' | 'waitingForTx'
  >('idle');
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: args.parameters.contract.address,
    abi: args.parameters.contract.abi,
    functionName: args.parameters.functionName,
    args: args.parameters?.args,
    value: args.parameters?.value,
    chainId: args.parameters.contract.chainId,
    query: {
      enabled:
        isConnected &&
        !!args.parameters.contract &&
        chain?.id === args.parameters.contract.chainId &&
        !!args.parameters.functionName,
    },
  });

  useEffect(() => {
    if (simulateData) {
      args?.callbacks?.onSimulateSuccess?.(simulateData);
    }
  }, [args?.callbacks, simulateData]);

  const writeTransaction = useCallback(async () => {
    let hash;
    let txReceipt;
    if (simulateError) {
      args?.callbacks?.onSimulateError?.(simulateError);
    } else if (simulateData?.request) {
      args?.callbacks?.onWrite?.();
      setStatus('waitingForSignature');
      try {
        hash = await writeContract(config, simulateData.request);
      } catch (writeError) {
        if (isUserRejected(writeError)) {
          args?.callbacks?.onUserReject?.();
        } else {
          args?.callbacks?.onWriteError?.(writeError as unknown as Error);
        }
        setStatus('idle');
      }
      if (hash) {
        args?.callbacks?.onTxSigned?.();
        setStatus('waitingForTx');
        try {
          txReceipt = await waitForTransactionReceipt(config, { hash });
        } catch (waitError) {
          if (isUserRejected(waitError)) {
            args?.callbacks?.onUserReject?.();
          } else {
            args?.callbacks?.onWriteError?.(waitError as unknown as Error);
          }
          setStatus('idle');
        }
      }
      if (txReceipt) {
        args?.callbacks?.onWriteSuccess?.(txReceipt);
      }
      setStatus('idle');
    }
  }, [args?.callbacks, config, simulateData?.request, simulateError]);

  return { status, writeTransaction };
};
