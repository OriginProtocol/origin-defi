import { useCallback, useMemo, useState } from 'react';

import { BadgeIcon, TokenIcon } from '@origin/shared/components';
import { FaCircleCheckRegular } from '@origin/shared/icons';
import {
  useDeleteActivity,
  useDeleteNotification,
  useGasPrice,
  usePushActivity,
  usePushNotification,
  useUpdateActivity,
  useWatchContract,
} from '@origin/shared/providers';
import { formatError, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { erc20Abi, formatUnits } from 'viem';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type {
  Activity,
  WriteTransactionCallbacks,
} from '@origin/shared/providers';
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
  disableActivity?: boolean;
  disableNotification?: boolean;
  enableGas?: boolean;
  enableAllowance?: boolean;
};

export const useApprovalButton = (args: UseApprovalButtonProps) => {
  const intl = useIntl();
  const { isConnected, address } = useAccount();
  const [notifId, setNotifId] = useState<string | null>(null);
  const [simulateError, setSimulateError] =
    useState<SimulateContractErrorType>();
  const [act, setAct] = useState<Activity | null>(null);
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
  const { data: gasPrice, refetch: refetchGas } = useQuery({
    queryKey: [
      'approvalButton',
      args.token.symbol,
      args.spender,
      args.amount.toString(),
    ],
    queryFn: async () => {
      if (simulateError) return null;
      if (publicClient) {
        const gasAmount = await publicClient.estimateContractGas({
          address: args.token.address ?? ZERO_ADDRESS,
          abi: erc20Abi,
          functionName: 'approve',
          args: [args.spender, args.amount],
        });
        const gasPrice = await queryClient.fetchQuery({
          queryKey: useGasPrice.getKey(
            gasAmount,
            args.token.chainId,
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
  const { data: allowance } = useWatchContract({
    address: args.token.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address ?? ZERO_ADDRESS, args?.spender],
    query: {
      enabled: isConnected && args.enableAllowance,
    },
  });

  const onWrite = useCallback(() => {
    const act = {
      type: 'approval',
      title: intl.formatMessage(
        { defaultMessage: 'Approve {token}' },
        { token: args.token.symbol },
      ),
      subtitle: intl.formatMessage(
        {
          defaultMessage: 'Approve {amount} {token}',
        },
        {
          amount: intl.formatNumber(
            +formatUnits(args.amount, args.token.decimals),
            { notation: 'compact', maximumSignificantDigits: 4 },
          ),
          token: args.token.symbol,
        },
      ),
      endIcon: (
        <BadgeIcon
          badgeContent={
            <FaCircleCheckRegular color="primary" sx={{ fontSize: 10 }} />
          }
        >
          <TokenIcon token={args.token} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      ),
      status: 'pending',
      tokenIn: args.token,
      amountIn: args.amount,
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
  }, [
    args.amount,
    args.callbacks,
    args.disableActivity,
    args.token,
    intl,
    pushActivity,
  ]);

  const onTxSigned = useCallback(() => {
    if (!args.disableNotification) {
      const id = pushNotification({
        title: intl.formatMessage(
          {
            defaultMessage: 'Approving {token}',
          },
          { token: args.token.symbol },
        ),
        message: intl.formatMessage({
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
    args.callbacks,
    args.disableNotification,
    args.token.symbol,
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
    (error: Error) => {
      setSimulateError(simulateError);
      if (args.enableGas && isConnected) {
        refetchGas();
      }
      if (!args.disableNotification) {
        pushNotification({
          icon: act?.endIcon,
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
      act?.endIcon,
      args.callbacks,
      args.disableNotification,
      args.enableGas,
      intl,
      isConnected,
      pushNotification,
      refetchGas,
      simulateError,
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
            defaultMessage: 'Approval successfully executed',
          }),
          message: intl.formatMessage(
            {
              defaultMessage: 'Approved {amount} {token}',
            },
            {
              amount: intl.formatNumber(
                +formatUnits(args.amount, args.token.decimals),
                { notation: 'compact', maximumSignificantDigits: 4 },
              ),
              token: args.token.symbol,
            },
          ),
          icon: act?.endIcon,
          severity: 'success',
          blockExplorerLinkProps: { hash: txReceipt.transactionHash },
        });
      }
      args.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      act,
      args.amount,
      args.callbacks,
      args.disableActivity,
      args.disableNotification,
      args.token.decimals,
      args.token.symbol,
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
            defaultMessage: 'Approval error',
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
      allowance,
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
