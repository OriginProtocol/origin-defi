import { useCallback, useMemo, useState } from 'react';

import { BadgeIcon, TokenIcon } from '@origin/shared/components';
import { FaCircleCheckRegular } from '@origin/shared/icons';
import {
  useActivity,
  useGasPrice,
  usePushNotification,
  useWatchContract,
} from '@origin/shared/providers';
import { formatError, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { decodeEventLog, erc20Abi } from 'viem';
import { useAccount, useConfig, usePublicClient } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type {
  ApprovalActivity,
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
  enableGas?: boolean;
  enableAllowance?: boolean;
};

export const useApprovalButton = (args: UseApprovalButtonProps) => {
  const intl = useIntl();
  const { isConnected, address } = useAccount();
  const [simulateError, setSimulateError] =
    useState<SimulateContractErrorType>();
  const pushNotification = usePushNotification();
  const { pushActivity, updateActivity, deleteActivity } = useActivity();
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
      if (simulateError) return null;
      if (publicClient) {
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
      }
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
    args: [address ?? ZERO_ADDRESS, args?.spender],
    query: {
      enabled: isConnected && args.enableAllowance,
    },
  });

  const onWrite = useCallback(() => {
    const act: ApprovalActivity = {
      type: 'approval',
      status: 'pending',
      tokenIdIn: args.token.id,
      amountIn: args.amount,
    } as const;
    if (!args.disableActivity) {
      pushActivity(act);
    }
    args.callbacks?.onWrite?.();
  }, [
    args.amount,
    args.callbacks,
    args.disableActivity,
    args.token,
    pushActivity,
  ]);

  const onTxSigned = useCallback(() => {
    updateActivity({ status: 'signed' });
    args.callbacks?.onTxSigned?.();
  }, [args.callbacks, updateActivity]);

  const onUserReject = useCallback(() => {
    if (!args.disableActivity) {
      deleteActivity('rejected');
    }
    args.callbacks?.onUserReject?.();
  }, [args.callbacks, args.disableActivity, deleteActivity]);

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
      setSimulateError(simulateError);
      if (args.enableGas && isConnected) {
        refetchGas();
      }
      pushNotification({
        icon: (
          <BadgeIcon
            badgeContent={
              <FaCircleCheckRegular color="primary" sx={{ fontSize: 10 }} />
            }
          >
            <TokenIcon token={args.token} sx={{ fontSize: 36 }} />
          </BadgeIcon>
        ),
        title: intl.formatMessage({
          defaultMessage: 'Impossible to execute approval',
        }),
        message: formatError(error),
        severity: 'error',
      });
      args.callbacks?.onSimulateError?.(error);
    },
    [
      args.callbacks,
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
      if (!args.disableActivity) {
        updateActivity({
          status: 'success',
          amountIn: amount,
          txHash: txReceipt.transactionHash,
        });
      }
      args.callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      args?.amount,
      args.callbacks,
      args.disableActivity,
      args.enableAllowance,
      refetchAllowance,
      updateActivity,
    ],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      if (!args.disableActivity) {
        updateActivity({
          status: 'error',
          error: error?.message,
        });
      }
      args.callbacks?.onWriteError?.(error);
    },
    [args.callbacks, args.disableActivity, updateActivity],
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
