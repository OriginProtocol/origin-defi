import { useCallback, useMemo, useState } from 'react';

import {
  useActivity,
  useGasPrice,
  usePushNotification,
} from '@origin/shared/providers';
import {
  formatError,
  jsonStringifyReplacer,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import type {
  Activity,
  WriteTransactionCallbacks,
  WriteTransactionParameters,
} from '@origin/shared/providers';
import type {
  SimulateContractErrorType,
  SimulateContractReturnType,
} from '@wagmi/core';
import type {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  TransactionReceipt,
} from 'viem';

export type UseTxButtonProps<
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
  params: WriteTransactionParameters<abi, functionName, args>;
  callbacks?: WriteTransactionCallbacks;
  activity?: Activity;
  disableActivity?: boolean;
  enableGas?: boolean;
};

export const useTxButton = <
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
>(
  args: UseTxButtonProps<abi, functionName, args>,
) => {
  const intl = useIntl();
  const { isConnected, address } = useAccount();
  const [simulateError, setSimulateError] = useState<
    SimulateContractErrorType | undefined
  >();
  const pushNotification = usePushNotification();
  const { pushActivity, updateActivity, deleteActivity } = useActivity();
  const config = useConfig();

  const publicClient = usePublicClient({
    chainId: args.params.contract.chainId,
  });
  const queryClient = useQueryClient();
  const {
    data: gasPrice,
    refetch: refetchGas,
    isLoading: isWriteGasLoading,
  } = useQuery({
    queryKey: ['txButton', JSON.stringify(args.params, jsonStringifyReplacer)],
    queryFn: async () => {
      if (simulateError) return null;
      if (publicClient) {
        const gasAmount = await publicClient.estimateContractGas({
          account: address,
          address: args.params.contract.address ?? ZERO_ADDRESS,
          abi: args.params.contract.abi,
          functionName: args.params.functionName,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          args: args.params?.args as any,
          value: args.params?.value,
        });

        const gasPrice = await queryClient.fetchQuery({
          queryKey: useGasPrice.getKey(gasAmount, args.params.contract.chainId),
          queryFn: useGasPrice.fetcher(config, queryClient),
        });
        return gasPrice;
      }
    },
    enabled: false,
  });

  const onWrite = useCallback(() => {
    if (!args.disableActivity && args.activity) {
      pushActivity(args.activity);
    }
    args.callbacks?.onWrite?.();
  }, [args.activity, args.callbacks, args.disableActivity, intl, pushActivity]);

  const onTxSigned = useCallback(() => {
    updateActivity({
      status: 'signed',
    });
    args.callbacks?.onTxSigned?.();
  }, [args.callbacks, updateActivity]);

  const onUserReject = useCallback(() => {
    if (!args.disableActivity) {
      deleteActivity('rejected');
    }
    args.callbacks?.onUserReject?.();
  }, [args.callbacks, args.disableActivity, deleteActivity]);

  const onSimulateSuccess = useCallback(
    (data: SimulateContractReturnType) => {
      setSimulateError(undefined);
      if (args.enableGas && isConnected) {
        refetchGas();
      }
      args.callbacks?.onSimulateSuccess?.(data);
    },
    [args.callbacks, args.enableGas, isConnected, refetchGas],
  );

  const onSimulateError = useCallback(
    (error: SimulateContractErrorType) => {
      setSimulateError(error);
      if (args.enableGas && isConnected) {
        refetchGas();
      }
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Impossible to execute transaction',
        }),
        message: formatError(error),
        severity: 'error',
      });
      args.callbacks?.onSimulateError?.(error);
    },
    [
      args.callbacks,
      args.enableGas,
      intl,
      isConnected,
      pushNotification,
      refetchGas,
    ],
  );

  const onWriteSuccess = useCallback(
    (txReceipt: TransactionReceipt) => {
      if (!args.disableActivity) {
        updateActivity({
          status: 'success',
          txHash: txReceipt.transactionHash,
        });
      }
      args.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [args.callbacks, args.disableActivity, updateActivity],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      if (!args.disableActivity) {
        updateActivity({
          status: 'error',
          error: error?.message,
        });
      }
      args.callbacks?.onWriteError?.(error);
    },
    [args.callbacks, args.disableActivity, updateActivity],
  );

  return useMemo(
    () => ({
      gasPrice,
      isWriteGasLoading,
      params: args.params,
      callbacks: {
        onWrite,
        onTxSigned,
        onUserReject,
        onSimulateSuccess,
        onSimulateError,
        onWriteSuccess,
        onWriteError,
      },
    }),
    [
      args.params,
      gasPrice,
      isWriteGasLoading,
      onSimulateError,
      onSimulateSuccess,
      onTxSigned,
      onUserReject,
      onWrite,
      onWriteError,
      onWriteSuccess,
    ],
  );
};
