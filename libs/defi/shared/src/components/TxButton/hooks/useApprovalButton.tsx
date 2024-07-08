import { useCallback, useMemo, useState } from 'react';

import { useGasPrice, useWatchContract } from '@origin/shared/providers';
import { formatError, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { decodeEventLog, erc20Abi } from 'viem';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import { activityOptions, useActivity } from '../../Activities';
import { useNotification } from '../../Notifications/hooks';

import type { Token } from '@origin/shared/contracts';
import type { WriteTransactionCallbacks } from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';
import type {
  SimulateContractErrorType,
  SimulateContractReturnType,
} from '@wagmi/core';
import type { TransactionReceipt } from 'viem';

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
  const { activity, deleteActivity, pushActivity, updateActivity } =
    useActivity();
  const { deleteNotification, pushNotification } = useNotification();
  const [simulateError, setSimulateError] =
    useState<SimulateContractErrorType>();
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
        account: address,
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

  const onClick = useCallback(() => {
    pushActivity({
      type: 'approval',
      amountIn: args.amount,
      tokenIdIn: args.token.id,
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
        title: activityOptions.approval.title(activity, intl),
        message: intl.formatMessage({
          defaultMessage: 'Your transaction is being processed on-chain.',
        }),
        icon: activityOptions.approval.icon(activity),
        severity: 'pending',
        hideDuration: undefined,
      });
    }
    args.callbacks?.onTxSigned?.();
  }, [activity, args.callbacks, intl, pushNotification, updateActivity]);

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
      if (activity?.id) {
        pushNotification({
          icon: activityOptions.approval.icon(activity),
          title: intl.formatMessage({
            defaultMessage: 'Impossible to execute approval',
          }),
          message: formatError(error),
          severity: 'error',
        });
      }
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
      deleteNotification();
      updateActivity({
        status: 'success',
        amountIn: amount,
        txHash: txReceipt.transactionHash,
      });
      if (activity?.id) {
        pushNotification({
          title: activityOptions.approval.title(activity, intl),
          message: activityOptions.approval.subtitle(activity, intl),
          icon: activityOptions.approval.icon(activity),
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
      pushNotification,
      refetchAllowance,
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
          title: activityOptions.approval.title(activity, intl),
          message: formatError(error),
          icon: activityOptions.approval.icon(activity),
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
      onClick,
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
