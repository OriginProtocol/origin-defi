import { useCallback, useMemo, useState } from 'react';

import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { formatError, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import {
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../activities';
import { useGasPrice } from '../gas';
import {
  useDeleteNotification,
  usePushNotification,
  usePushNotificationForActivity,
} from '../notifications';

import type { SimulateContractReturnType } from '@wagmi/core';
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
  disableNotification?: boolean;
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
  args: UseTxButton<abi, functionName, args> | undefined,
) => {
  const intl = useIntl();
  const { isConnected, address: userAddress } = useAccount();
  const [notifId, setNotifId] = useState<string | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const pushNotificationForActivity = usePushNotificationForActivity();
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const config = useConfig();
  const publicClient = usePublicClient(
    args && {
      chainId: args.params.contract.chainId,
    },
  );
  const queryClient = useQueryClient();
  const { data: gasPrice, refetch: refetchGas } = useQuery({
    queryKey: [
      'txButton',
      JSON.stringify(
        args?.params,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value),
        undefined,
      ),
    ],
    queryFn: async () => {
      if (!args) return null;
      if (publicClient) {
        const gasAmount = await publicClient.estimateContractGas({
          account: userAddress,
          address: args.params.contract.address ?? ZERO_ADDRESS,
          abi: args.params.contract.abi,
          functionName: args.params.functionName,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          args: args.params?.args as any,
          value: args.params?.value,
        });

        const gasPrice = await queryClient.fetchQuery({
          queryKey: useGasPrice.getKey(
            gasAmount,
            args.params.contract.chainId,
            queryClient,
            config,
          ),
          queryFn: useGasPrice.fetcher,
        });
        return gasPrice;
      }
    },
    enabled: args?.enableGas,
  });

  const onWrite = useCallback(() => {
    const act = args?.activity ?? {
      type: 'transaction',
      title: intl.formatMessage({ defaultMessage: 'Transaction executing' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Your operation is in progress',
      }),
      status: 'pending',
    };
    if (!args?.disableActivity) {
      const activity = pushActivity(act);
      setActivity(activity);
    } else {
      setActivity({
        id: Date.now().toString(),
        createdOn: Date.now(),
        ...act,
      });
    }
    args?.callbacks?.onWrite?.();
  }, [
    args?.activity,
    args?.callbacks,
    args?.disableActivity,
    intl,
    pushActivity,
  ]);

  const activityTitle = activity?.type === 'transaction' && activity.title;
  const activitySubtitle =
    activity?.type === 'transaction' && activity.subtitle;

  const onTxSigned = useCallback(() => {
    if (!args?.disableNotification) {
      const id = pushNotification({
        hideDuration: undefined,
        content: (
          <NotificationSnack
            icon={<SeverityIcon severity="info" />}
            title={
              activityTitle
                ? activityTitle
                : intl.formatMessage({
                    defaultMessage: 'Processing transaction',
                  })
            }
            subtitle={
              activitySubtitle
                ? activitySubtitle
                : intl.formatMessage({
                    defaultMessage:
                      'Your transaction is being processed on-chain.',
                  })
            }
          />
        ),
      });
      setNotifId(id);
    }
    args?.callbacks?.onTxSigned?.();
  }, [
    activityTitle,
    activitySubtitle,
    args?.callbacks,
    args?.disableNotification,
    intl,
    pushNotification,
  ]);

  const onUserReject = useCallback(() => {
    if (!args?.disableActivity && activity?.id) {
      deleteActivity(activity.id);
    }
    if (notifId) {
      deleteNotification(notifId);
      setNotifId(null);
    }
    if (!args?.disableNotification) {
      pushNotification({
        content: (
          <NotificationSnack
            icon={<SeverityIcon severity="warning" />}
            title={intl.formatMessage({
              defaultMessage: 'Operation Cancelled',
            })}
            subtitle={intl.formatMessage({
              defaultMessage: 'User rejected operation',
            })}
          />
        ),
      });
    }
    args?.callbacks?.onUserReject?.();
  }, [
    activity?.id,
    args?.callbacks,
    args?.disableActivity,
    args?.disableNotification,
    deleteActivity,
    deleteNotification,
    intl,
    notifId,
    pushNotification,
  ]);

  const onSimulateSuccess = useCallback(
    (data: SimulateContractReturnType) => {
      if (args?.enableGas && isConnected) {
        refetchGas();
      }
      args?.callbacks?.onSimulateSuccess?.(data);
    },
    [args?.callbacks, args?.enableGas, isConnected, refetchGas],
  );

  const onSimulateError = useCallback(
    (error: Error) => {
      if (!args?.disableNotification) {
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
      }
      args?.callbacks?.onSimulateError?.(error);
    },
    [args?.callbacks, args?.disableNotification, intl, pushNotification],
  );

  const onWriteSuccess = useCallback(
    (txReceipt: TransactionReceipt) => {
      const updatedActivity: Activity = {
        ...(activity as Activity),
        status: 'success',
        txHash: txReceipt.transactionHash,
      };
      if (updatedActivity.type === 'transaction') {
        updatedActivity.title = intl.formatMessage({
          defaultMessage: 'Transaction executed',
        });
        updatedActivity.subtitle = intl.formatMessage({
          defaultMessage: 'Your operation has been executed',
        });
      }
      if (!args?.disableActivity) {
        updateActivity<Activity>(updatedActivity);
      }
      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }
      if (!args?.disableNotification) {
        pushNotificationForActivity(updatedActivity);
      }
      args?.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      activity,
      args?.callbacks,
      args?.disableActivity,
      args?.disableNotification,
      deleteNotification,
      intl,
      notifId,
      pushNotification,
      updateActivity,
    ],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      const updatedActivity: Activity = {
        ...(activity as Activity),
        status: 'error',
        error: error?.message,
      };
      if (!args?.disableActivity && activity?.id) {
        updateActivity<Activity>(updatedActivity);
      }
      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }
      if (!args?.disableNotification) {
        pushNotificationForActivity(updatedActivity);
      }
      args?.callbacks?.onWriteError?.(error);
    },
    [
      activity,
      args?.callbacks,
      args?.disableActivity,
      args?.disableNotification,
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
      params: args?.params,
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
      args?.params,
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
