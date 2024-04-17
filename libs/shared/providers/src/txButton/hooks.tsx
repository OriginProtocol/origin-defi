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

import {
  TransactionNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../activities';
import { useGasPrice } from '../gas';
import { useDeleteNotification, usePushNotification } from '../notifications';

import type { SimulateContractReturnType } from '@wagmi/core';
import type {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  TransactionReceipt,
} from 'viem';

import type { Activity, ActivityInput } from '../activities';
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
  activity?: Partial<ActivityInput>;
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
  args: UseTxButton<abi, functionName, args>,
) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [notifId, setNotifId] = useState<string | null>(null);
  const [act, setAct] = useState<Activity | null>(null);
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
  const { data: gasPrice, refetch: refetchGas } = useQuery({
    queryKey: ['txButton', JSON.stringify(args.params, jsonStringifyReplacer)],
    queryFn: async () => {
      if (publicClient) {
        const res = await publicClient.estimateContractGas({
          address: args.params.contract.address ?? ZERO_ADDRESS,
          abi: args.params.contract.abi,
          functionName: args.params.functionName,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          args: args.params?.args as any,
          value: args.params?.value,
        });

        const gasPrice = await queryClient.fetchQuery({
          queryKey: useGasPrice.getKey(
            BigInt(res),
            args.params.contract.chainId,
            queryClient,
            config,
          ),
          queryFn: useGasPrice.fetcher,
        });

        return gasPrice;
      }
    },
    enabled: false,
  });

  const onWrite = useCallback(() => {
    const act = {
      type: args?.activity?.type ?? 'transaction',
      title:
        args?.activity?.title ??
        intl.formatMessage({ defaultMessage: 'On-chain Transaction' }),
      subtitle:
        args?.activity?.subtitle ??
        intl.formatMessage({ defaultMessage: 'Transaction' }),
      endIcon: args?.activity?.endIcon,
      status: 'pending',
    } as const;
    if (!args?.disableActivity) {
      const activity = pushActivity(act);
      setAct(activity);
    } else {
      setAct({
        id: Date.now().toString(),
        createdOn: Date.now(),
        ...act,
      });
    }
    args?.callbacks?.onWrite?.();
  }, [
    args?.activity?.endIcon,
    args?.activity?.subtitle,
    args?.activity?.title,
    args?.activity?.type,
    args?.callbacks,
    args?.disableActivity,
    intl,
    pushActivity,
  ]);

  const onTxSigned = useCallback(() => {
    if (!args?.disableNotification) {
      const id = pushNotification({
        hideDuration: undefined,
        content: (
          <NotificationSnack
            icon={<SeverityIcon severity="info" />}
            title={
              act?.title ??
              intl.formatMessage({
                defaultMessage: 'Processing transaction',
              })
            }
            subtitle={
              act?.subtitle ??
              intl.formatMessage({
                defaultMessage: 'Your transaction is being processed on-chain.',
              })
            }
          />
        ),
      });
      setNotifId(id);
    }
    args?.callbacks?.onTxSigned?.();
  }, [
    act?.subtitle,
    act?.title,
    args?.callbacks,
    args?.disableNotification,
    intl,
    pushNotification,
  ]);

  const onUserReject = useCallback(() => {
    if (!args?.disableActivity && act?.id) {
      deleteActivity(act.id);
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
            endIcon={act?.endIcon}
          />
        ),
      });
    }
    args?.callbacks?.onUserReject?.();
  }, [
    act?.endIcon,
    act?.id,
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
      if (!args?.disableActivity) {
        updateActivity({
          ...act,
          status: 'success',
          txReceipt,
        });
      }
      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }
      if (!args?.disableNotification) {
        pushNotification({
          content: (
            <TransactionNotification
              title={intl.formatMessage({
                defaultMessage: 'Transaction executed',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'Your operation has been executed',
              })}
              status="success"
              txReceipt={txReceipt}
            />
          ),
        });
      }
      args?.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      act,
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
      if (!args?.disableActivity && act?.id) {
        updateActivity({
          ...act,
          status: 'error',
          error: error?.message,
        });
      }
      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }
      if (!args?.disableNotification) {
        pushNotification({
          content: (
            <TransactionNotification
              title={intl.formatMessage({
                defaultMessage: 'Transaction error',
              })}
              subtitle={formatError(error)}
              error={formatError(error)}
              status="error"
            />
          ),
        });
      }
      args?.callbacks?.onWriteError?.(error);
    },
    [
      act,
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
