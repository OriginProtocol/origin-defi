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
  const [activityId, setActivityId] = useState<string | undefined>();
  const [notifId, setNotifId] = useState<string | undefined>();
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
    const { id } = pushActivity({
      ...args.activity,
      status: 'pending',
    } as Activity);
    setActivityId(id);
    args?.callbacks?.onWrite?.();
  }, [args, pushActivity]);

  const onTxSigned = useCallback(() => {
    const id = pushNotification({
      title: activityOption.title(args.activity, intl),
      message: activityOption.subtitle(args.activity, intl),
      icon: activityOption.icon(args.activity),
      severity: 'pending',
      hideDuration: undefined,
    });
    setNotifId(id);
    updateActivity({ id: activityId, status: 'signed' });
    args?.callbacks?.onTxSigned?.();
  }, [
    activityId,
    activityOption,
    args.activity,
    args?.callbacks,
    intl,
    pushNotification,
    updateActivity,
  ]);

  const onUserReject = useCallback(() => {
    deleteActivity(activityId);
    deleteNotification(notifId);
    setNotifId(undefined);
    pushNotification({
      title: intl.formatMessage({ defaultMessage: 'Operation cancelled' }),
      message: intl.formatMessage({
        defaultMessage: 'User rejected operation',
      }),
      severity: 'info',
    });
    args?.callbacks?.onUserReject?.();
  }, [
    activityId,
    args?.callbacks,
    deleteActivity,
    deleteNotification,
    intl,
    notifId,
    pushNotification,
  ]);

  const onSimulateSuccess = useCallback(
    (data: SimulateContractReturnType) => {
      setSimulateError(undefined);
      if (args?.enableGas && isConnected) {
        refetchGas();
      }
      args?.callbacks?.onSimulateSuccess?.(data);
    },
    [args?.callbacks, args?.enableGas, isConnected, refetchGas],
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
      args?.callbacks?.onSimulateError?.(error);
    },
    [
      activityOption,
      args.activity,
      args?.callbacks,
      args?.enableGas,
      intl,
      isConnected,
      pushNotification,
      refetchGas,
    ],
  );

  const onWriteSuccess = useCallback(
    (txReceipt: TransactionReceipt) => {
      updateActivity({
        id: activityId,
        status: 'success',
        txHash: txReceipt?.transactionHash,
      });
      deleteNotification(notifId);
      setNotifId(undefined);
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
      args?.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      activityId,
      activityOption,
      args.activity,
      args?.callbacks,
      deleteNotification,
      intl,
      notifId,
      pushNotification,
      updateActivity,
    ],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      updateActivity({
        id: activityId,
        status: 'error',
        error: error?.message,
      });
      deleteNotification(notifId);
      setNotifId(undefined);
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction error',
        }),
        message: formatError(error),
        icon: activityOption.icon(args.activity),
        severity: 'error',
      });
      args?.callbacks?.onWriteError?.(error);
    },
    [
      activityId,
      activityOption,
      args.activity,
      args?.callbacks,
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
