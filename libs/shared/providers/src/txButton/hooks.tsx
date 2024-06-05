import { useCallback, useMemo, useState } from 'react';

import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import {
  formatError,
  jsonStringifyReplacer,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import { useActivity } from '../activities';
import { useGasPrice } from '../gas';
import { usePushNotification } from '../notifications';

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

import type { Activity } from '../activities';
import type {
  WriteTransactionCallbacks,
  WriteTransactionParameters,
} from '../wagmi';

export type UseTxButton<
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
  activity?: Activity & { status: 'pending' };
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
  args: UseTxButton<abi, functionName, args>,
) => {
  const intl = useIntl();
  const { isConnected, address } = useAccount();
  const [simulateError, setSimulateError] =
    useState<SimulateContractErrorType>();
  const pushNotification = usePushNotification();
  const { activity, pushActivity, updateActivity, deleteActivity } =
    useActivity();
  const config = useConfig();

  const publicClient = usePublicClient({
    chainId: args.params.contract.chainId,
  });
  const queryClient = useQueryClient();
  const { data: gasPrice, refetch: refetchGas } = useQuery({
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
    if (!args.disableActivity && args?.activity) {
      pushActivity(args?.activity);
    }
    args?.callbacks?.onWrite?.();
  }, [args?.activity, args?.callbacks, args.disableActivity, pushActivity]);

  const onTxSigned = useCallback(() => {
    updateActivity({
      status: 'signed',
    });
    args.callbacks?.onTxSigned?.();
  }, [args.callbacks, updateActivity]);

  const onUserReject = useCallback(() => {
    if (!args.disableActivity && activity?.id) {
      deleteActivity('rejected');
    }
    args.callbacks?.onUserReject?.();
  }, [activity?.id, args.callbacks, args.disableActivity, deleteActivity]);

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
        content: (
          <NotificationSnack
            icon={<SeverityIcon severity="error" />}
            title={intl.formatMessage({
              defaultMessage: 'Impossible to execute',
            })}
            subtitle={formatError(error)}
          />
        ),
      });
      args.callbacks?.onSimulateError?.(error);
    },
    [args.callbacks, args.enableGas, intl, isConnected, refetchGas],
  );

  const onWriteSuccess = useCallback(
    (txReceipt: TransactionReceipt) => {
      if (!args?.disableActivity) {
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
      const updatedActivity: Activity = {
        ...(activity as Activity),
        status: 'error',
        error: error?.message,
      };
      if (!args?.disableActivity && activity?.id) {
        updateActivity(updatedActivity);
      }
      args.callbacks?.onWriteError?.(error);
    },
    [activity, args.callbacks, args?.disableActivity, updateActivity],
  );

  return useMemo(
    () => ({
      gasPrice,
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

export const validateTxButtonParams = <
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
  params: UseTxButton<abi, functionName, args>['params'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => params as any;
