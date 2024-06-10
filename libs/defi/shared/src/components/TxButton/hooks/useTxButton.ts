import { useCallback, useMemo, useState } from 'react';

import {
  useDeleteNotification,
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

import {
  activityOptions,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../Activities';

import type {
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

import type { Activity } from '../../Activities';

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
  activity: Activity;
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
  const [activity, setActivity] = useState<Activity>(args.activity);
  const [notifId, setNotifId] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<
    SimulateContractErrorType | undefined
  >();
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const config = useConfig();
  const publicClient = usePublicClient({
    chainId: args.params.contract.chainId,
  });
  const queryClient = useQueryClient();

  const activityOption = useMemo(
    () => activityOptions[args.activity.type],
    [args.activity.type],
  );

  const {
    data: gasPrice,
    refetch: refetchGas,
    isLoading: isWriteGasLoading,
  } = useQuery({
    queryKey: ['txButton', JSON.stringify(args.params, jsonStringifyReplacer)],
    queryFn: async () => {
      if (simulateError || !publicClient) {
        return null;
      }

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
    },
    enabled: false,
  });

  const onWrite = useCallback(() => {
    const updated = pushActivity({
      ...args.activity,
      status: 'pending',
    } as Activity);
    setActivity(updated);
    args.callbacks?.onWrite?.();
  }, [args, pushActivity]);

  const onTxSigned = useCallback(() => {
    const updated = updateActivity({ id: activity.id, status: 'signed' });
    if (updated) {
      setActivity(updated);
      const id = pushNotification({
        title: activityOption.title(args.activity, intl),
        message: activityOption.subtitle(args.activity, intl),
        icon: activityOption.icon(args.activity),
        severity: 'pending',
        hideDuration: undefined,
      });
      setNotifId(id);
    }

    args.callbacks?.onTxSigned?.();
  }, [
    activity.id,
    activityOption,
    args.activity,
    args.callbacks,
    intl,
    pushNotification,
    updateActivity,
  ]);

  const onUserReject = useCallback(() => {
    if (activity?.id) {
      deleteActivity(activity.id);
      setActivity({ ...activity, status: 'idle' });
    }
    if (notifId) {
      deleteNotification(notifId);
      setNotifId(null);
    }

    pushNotification({
      title: intl.formatMessage({ defaultMessage: 'Operation cancelled' }),
      message: intl.formatMessage({
        defaultMessage: 'User rejected operation',
      }),
      severity: 'info',
    });

    args.callbacks?.onUserReject?.();
  }, [
    activity,
    args.callbacks,
    deleteActivity,
    deleteNotification,
    intl,
    notifId,
    pushNotification,
  ]);

  const onSimulateSuccess = useCallback(
    (data: SimulateContractReturnType) => {
      setSimulateError(undefined);
      if (args.enableGas && isConnected) {
        refetchGas();
      }
      args?.callbacks?.onSimulateSuccess?.(data);
    },
    [args.callbacks, args.enableGas, isConnected, refetchGas],
  );

  const onSimulateError = useCallback(
    (error: SimulateContractErrorType) => {
      setSimulateError(error);
      if (args?.enableGas && isConnected) {
        refetchGas();
      }
      pushNotification({
        icon: activityOption.icon(args.activity),
        title: intl.formatMessage({
          defaultMessage: 'Impossible to execute transaction',
        }),
        message: formatError(error),
        severity: 'error',
      });
      args.callbacks?.onSimulateError?.(error);
    },
    [
      activityOption,
      args.activity,
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
      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }

      const updated = updateActivity({
        id: activity.id,
        status: 'success',
        txHash: txReceipt?.transactionHash,
      });

      if (updated) {
        setActivity(updated);
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction successfully executed',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Your operation has been executed',
          }),
          icon: activityOption.icon(args.activity),
          severity: 'success',
          blockExplorerLinkProps: { hash: txReceipt.transactionHash },
        });
      }

      args.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      activity.id,
      activityOption,
      args.activity,
      args.callbacks,
      deleteNotification,
      intl,
      notifId,
      pushNotification,
      updateActivity,
    ],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }

      const updated = updateActivity({
        id: activity.id,
        status: 'error',
        error: error?.message,
      });

      if (updated) {
        setActivity(updated);
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction error',
          }),
          message: formatError(error),
          icon: activityOption.icon(args.activity),
          severity: 'error',
        });
      }

      args.callbacks?.onWriteError?.(error);
    },
    [
      activity.id,
      activityOption,
      args.activity,
      args.callbacks,
      deleteNotification,
      intl,
      notifId,
      pushNotification,
      updateActivity,
    ],
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
