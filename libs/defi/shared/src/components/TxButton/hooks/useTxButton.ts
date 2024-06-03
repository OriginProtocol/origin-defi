import { useCallback, useMemo, useState } from 'react';

import {
  useDeleteActivity,
  useDeleteNotification,
  useGasPrice,
  usePushActivity,
  usePushNotification,
  useUpdateActivity,
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
  ActivityInput,
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
  args: UseTxButtonProps<abi, functionName, args>,
) => {
  const intl = useIntl();
  const { isConnected, address } = useAccount();
  const [notifId, setNotifId] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState<
    SimulateContractErrorType | undefined
  >();
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
    const act = {
      ...args.activity,
      type: args.activity?.type ?? 'transaction',
      title:
        args.activity?.title ??
        intl.formatMessage({ defaultMessage: 'On-chain Transaction' }),
      subtitle:
        args.activity?.subtitle ??
        intl.formatMessage({ defaultMessage: 'Transaction' }),
      endIcon: args.activity?.endIcon,
      status: 'pending',
    } as const;
    if (!args.disableActivity) {
      const activity = pushActivity(act);
      setAct(activity);
    } else {
      setAct({
        id: Date.now().toString(),
        createdOn: Date.now(),
        ...act,
      });
    }
    args.callbacks?.onWrite?.();
  }, [args.activity, args.callbacks, args.disableActivity, intl, pushActivity]);

  const onTxSigned = useCallback(() => {
    if (!args.disableNotification) {
      const id = pushNotification({
        title:
          act?.title && typeof act.title === 'string'
            ? act.title
            : intl.formatMessage({
                defaultMessage: 'Processing transaction',
              }),
        message:
          act?.subtitle && typeof act.subtitle === 'string'
            ? act.subtitle
            : intl.formatMessage({
                defaultMessage: 'Your transaction is being processed on-chain.',
              }),
        icon: act?.endIcon,
        severity: 'pending',
        hideDuration: undefined,
      });
      setNotifId(id);
    }
    args.callbacks?.onTxSigned?.();
  }, [
    act?.endIcon,
    act?.subtitle,
    act?.title,
    args.callbacks,
    args.disableNotification,
    intl,
    pushNotification,
  ]);

  const onUserReject = useCallback(() => {
    if (!args.disableActivity && act?.id) {
      deleteActivity(act.id);
    }
    if (notifId) {
      deleteNotification(notifId);
      setNotifId(null);
    }
    if (!args.disableNotification) {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Operation cancelled' }),
        message: intl.formatMessage({
          defaultMessage: 'User rejected operation',
        }),
        severity: 'info',
      });
    }
    args.callbacks?.onUserReject?.();
  }, [
    act?.id,
    args.callbacks,
    args.disableActivity,
    args.disableNotification,
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
      if (!args.disableNotification) {
        pushNotification({
          icon: act?.endIcon,
          title: intl.formatMessage({
            defaultMessage: 'Impossible to execute transaction',
          }),
          message: formatError(error),
          severity: 'error',
        });
      }
      args.callbacks?.onSimulateError?.(error);
    },
    [
      act?.endIcon,
      args.callbacks,
      args.disableNotification,
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
          ...act,
          status: 'success',
          txReceipt,
        });
      }
      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }
      if (!args.disableNotification) {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction successfully executed',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Your operation has been executed',
          }),
          icon: act?.endIcon,
          severity: 'success',
          blockExplorerLinkProps: { hash: txReceipt.transactionHash },
        });
      }
      args.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      act,
      args.callbacks,
      args.disableActivity,
      args.disableNotification,
      deleteNotification,
      intl,
      notifId,
      pushNotification,
      updateActivity,
    ],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      if (!args.disableActivity && act?.id) {
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
      if (!args.disableNotification) {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction error',
          }),
          message: formatError(error),
          icon: act?.endIcon,
          severity: 'error',
        });
      }
      args.callbacks?.onWriteError?.(error);
    },
    [
      act,
      args.callbacks,
      args.disableActivity,
      args.disableNotification,
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
