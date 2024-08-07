import { useCallback, useMemo, useState } from 'react';

import { useGasPrice } from '@origin/shared/providers';
import {
  formatError,
  jsonStringifyReplacer,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import { activityOptions, useActivity } from '../../Activities';
import { useNotification } from '../../Notifications/hooks';

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
  const { activity, pushActivity, updateActivity, deleteActivity } =
    useActivity();
  const { deleteNotification, pushNotification } = useNotification();
  const [simulateError, setSimulateError] = useState<
    SimulateContractErrorType | undefined
  >();
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

  const onClick = useCallback(() => {
    pushActivity({
      ...args.activity,
      status: 'idle',
    });
    args.callbacks?.onClick?.();
  }, [args, pushActivity]);

  const onWrite = useCallback(() => {
    updateActivity({ status: 'pending' });
    args.callbacks?.onWrite?.();
  }, [args.callbacks, updateActivity]);

  const onTxSigned = useCallback(() => {
    updateActivity({ status: 'signed' });
    if (activity?.id) {
      pushNotification({
        title: activityOption.title(activity, intl),
        message: activityOption.subtitle(activity, intl),
        icon: activityOption.icon(activity),
        severity: 'pending',
        hideDuration: undefined,
      });
    }
    args.callbacks?.onTxSigned?.();
  }, [
    activity,
    activityOption,
    args.callbacks,
    intl,
    pushNotification,
    updateActivity,
  ]);

  const onUserReject = useCallback(() => {
    deleteActivity();
    deleteNotification();
    pushNotification({
      title: intl.formatMessage({ defaultMessage: 'Operation cancelled' }),
      message: intl.formatMessage({
        defaultMessage: 'User rejected operation',
      }),
      severity: 'info',
    });
    args.callbacks?.onUserReject?.();
  }, [
    args.callbacks,
    deleteActivity,
    deleteNotification,
    intl,
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
      if (activity?.id) {
        pushNotification({
          icon: activityOption.icon(activity),
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
      activity,
      activityOption,
      args.callbacks,
      args?.enableGas,
      intl,
      isConnected,
      pushNotification,
      refetchGas,
    ],
  );

  const onWriteSuccess = useCallback(
    (txReceipt: TransactionReceipt) => {
      deleteNotification();
      updateActivity({
        status: 'success',
        txHash: txReceipt?.transactionHash,
      });
      if (activity?.id) {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction successfully executed',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Your operation has been executed',
          }),
          icon: activityOption.icon(activity),
          severity: 'success',
          blockExplorerLinkProps: { hash: txReceipt.transactionHash },
        });
      }
      args.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      activity,
      activityOption,
      args.callbacks,
      deleteNotification,
      intl,
      pushNotification,
      updateActivity,
    ],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      deleteNotification();
      updateActivity({
        status: 'error',
        error: error?.message,
      });
      if (activity?.id) {
        pushNotification({
          title: intl.formatMessage({
            defaultMessage: 'Transaction error',
          }),
          message: formatError(error),
          icon: activityOption.icon(activity),
          severity: 'error',
        });
      }
      args.callbacks?.onWriteError?.(error);
    },
    [
      activity,
      activityOption,
      args.callbacks,
      deleteNotification,
      intl,
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
        onClick,
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
      onClick,
      onWrite,
      onWriteError,
      onWriteSuccess,
    ],
  );
};
