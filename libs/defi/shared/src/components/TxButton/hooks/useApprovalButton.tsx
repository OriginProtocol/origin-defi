import { useCallback, useMemo, useState } from 'react';

import {
  useDeleteNotification,
  useGasPrice,
  usePushNotification,
  useWatchContract,
} from '@origin/shared/providers';
import { formatError, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { decodeEventLog, erc20Abi } from 'viem';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import {
  activityOptions,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../Activities';

import type { Token } from '@origin/shared/contracts';
import type { WriteTransactionCallbacks } from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';
import type {
  SimulateContractErrorType,
  SimulateContractReturnType,
} from '@wagmi/core';
import type { TransactionReceipt } from 'viem';

import type { ApprovalActivity } from '../../Activities';

export type UseApprovalButtonProps = {
  token: Token;
  spender: HexAddress;
  amount: bigint;
  callbacks?: WriteTransactionCallbacks;
  enableGas?: boolean;
  enableAllowance?: boolean;
};

export const useApprovalButton = (args: UseApprovalButtonProps) => {
  const intl = useIntl();
  const { isConnected, address } = useAccount();
  const [activity, setActivity] = useState<ApprovalActivity>({
    type: 'approval',
    status: 'idle',
    amountIn: args.amount,
    tokenIdIn: args.token.id,
  });
  const [notifId, setNotifId] = useState<string | null>(null);
  const [simulateError, setSimulateError] =
    useState<SimulateContractErrorType>();
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const config = useConfig();
  const publicClient = usePublicClient({
    chainId: args.token.chainId,
  });
  const queryClient = useQueryClient();

  const {
    data: gasPrice,
    refetch: refetchGas,
    isLoading: isAllowanceGasLoading,
  } = useQuery({
    queryKey: [
      'approvalButton',
      args.token.symbol,
      args.spender,
      args.amount.toString(),
    ],
    queryFn: async () => {
      if (simulateError || !publicClient) {
        return null;
      }

      const gasAmount = await publicClient.estimateContractGas({
        address: args.token.address ?? ZERO_ADDRESS,
        abi: erc20Abi,
        functionName: 'approve',
        args: [args.spender, args.amount],
      });

      const gasPrice = await queryClient.fetchQuery({
        queryKey: useGasPrice.getKey(gasAmount, args.token.chainId),
        queryFn: useGasPrice.fetcher(config, queryClient),
      });

      return gasPrice;
    },
    enabled: false,
  });

  const {
    data: allowance,
    refetch: refetchAllowance,
    isLoading: isAllowanceLoading,
  } = useWatchContract({
    address: args.token.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address ?? ZERO_ADDRESS, args.spender],
    query: {
      enabled: isConnected && args.enableAllowance,
    },
  });

  const onWrite = useCallback(() => {
    const updated = pushActivity({
      ...activity,
      status: 'pending',
    });
    setActivity(updated);
    args.callbacks?.onWrite?.();
  }, [activity, args.callbacks, pushActivity]);

  const onTxSigned = useCallback(() => {
    const updated = updateActivity({ id: activity.id, status: 'signed' });
    if (updated) {
      setActivity(updated);
      const id = pushNotification({
        title: activityOptions.approval.title(updated, intl),
        message: intl.formatMessage({
          defaultMessage: 'Your transaction is being processed on-chain.',
        }),
        icon: activityOptions.approval.icon(updated),
        severity: 'pending',
        hideDuration: undefined,
      });
      setNotifId(id);
    }

    args.callbacks?.onTxSigned?.();
  }, [activity, args.callbacks, intl, pushNotification, updateActivity]);

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
        icon: activityOptions.approval.icon(activity),
        title: intl.formatMessage({
          defaultMessage: 'Impossible to execute approval',
        }),
        message: formatError(error),
        severity: 'error',
      });

      args.callbacks?.onSimulateError?.(error);
    },
    [
      activity,
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
      let amount = args?.amount ?? 0n;
      try {
        const log = txReceipt?.logs?.[0];
        const decoded = decodeEventLog({
          abi: erc20Abi,
          data: log?.data,
          topics: log?.topics,
        });

        if (decoded?.args?.value) {
          amount = decoded.args.value;
        }
      } catch {}

      if (args.enableAllowance) {
        refetchAllowance();
      }

      if (notifId) {
        deleteNotification(notifId);
        setNotifId(null);
      }

      const updated = updateActivity({
        id: activity.id,
        status: 'success',
        amountIn: amount,
        txHash: txReceipt.transactionHash,
      });

      if (updated) {
        setActivity(updated);
        pushNotification({
          title: activityOptions.approval.title(updated, intl),
          message: activityOptions.approval.subtitle(updated, intl),
          icon: activityOptions.approval.icon(updated),
          severity: 'success',
          blockExplorerLinkProps: { hash: txReceipt.transactionHash },
        });
      }

      args.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      activity,
      args?.amount,
      args.callbacks,
      args.enableAllowance,
      deleteNotification,
      intl,
      notifId,
      pushNotification,
      refetchAllowance,
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
          title: activityOptions.approval.title(updated, intl),
          message: formatError(error),
          icon: activityOptions.approval.icon(updated),
          severity: 'error',
        });
      }

      args.callbacks?.onWriteError?.(error);
    },
    [
      activity,
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
      allowance,
      isAllowanceGasLoading,
      isAllowanceLoading,
      label: intl.formatMessage(
        { defaultMessage: 'Approve {token}' },
        { token: args.token.symbol },
      ),
      params: {
        contract: {
          address: args.token.address ?? ZERO_ADDRESS,
          abi: args.token.abi,
          chainId: args.token.chainId,
        },
        functionName: 'approve',
        args: [args.spender, args.amount],
      },
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
      allowance,
      args.amount,
      args.spender,
      args.token.abi,
      args.token.address,
      args.token.chainId,
      args.token.symbol,
      gasPrice,
      intl,
      isAllowanceGasLoading,
      isAllowanceLoading,
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
