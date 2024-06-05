import { useEffect, useRef } from 'react';

import { Button } from '@mui/material';
import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { erc20Abi } from 'viem';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { useActivity } from '../../activities';
import {
  useDeleteNotification,
  usePushNotification,
} from '../../notifications';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { TransactionReceipt } from 'viem';

import type { ConnectedButtonProps } from './ConnectedButton';

export type ApprovalButtonProps = {
  token: Token;
  spender: HexAddress;
  amount: bigint;
  label?: string;
  waitingSignatureLabel?: string;
  waitingTxLabel?: string;
  onClick?: () => void;
  onSuccess?: (txReceipt: TransactionReceipt) => void;
  onError?: (error: Error) => void;
  onUserReject?: () => void;
  disableActivity?: boolean;
} & Omit<ConnectedButtonProps, 'onClick'>;

export const ApprovalButton = ({
  token,
  spender,
  amount,
  label,
  waitingSignatureLabel,
  waitingTxLabel,
  onClick,
  onSuccess,
  onError,
  onUserReject,
  disabled,
  disableActivity,
  ...rest
}: ApprovalButtonProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const done = useRef(false);
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const { activity, pushActivity, updateActivity, deleteActivity } =
    useActivity();
  const { data: prepareData, error: prepareError } = useSimulateContract({
    address: token.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender, amount],
    chainId: token.chainId,
    query: {
      enabled: isConnected && amount > 0n && !disabled,
    },
  });
  const {
    writeContract,
    data: hash,
    error: writeError,
    isPending: isWriteLoading,
    reset: resetWriteContract,
  } = useWriteContract();
  const {
    data: approvalData,
    isLoading: isApprovalLoading,
    isSuccess: isApprovalSuccess,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isApprovalLoading) {
      deleteActivity('rejected');
    }
  }, [deleteActivity, isApprovalLoading]);

  useEffect(() => {
    if (
      !isNilOrEmpty(approvalData) &&
      !isApprovalLoading &&
      isApprovalSuccess &&
      !done.current
    ) {
      onSuccess?.(approvalData as TransactionReceipt);
      if (!disableActivity) {
        updateActivity({
          status: 'success',
          txHash: (approvalData as TransactionReceipt).transactionHash,
        });
      }
      resetWriteContract();
      done.current = true;
    }
  }, [
    approvalData,
    deleteNotification,
    disableActivity,
    isApprovalLoading,
    isApprovalSuccess,
    onSuccess,
    resetWriteContract,
    token.id,
    updateActivity,
  ]);

  useEffect(() => {
    if (!isNilOrEmpty(writeError) && !isNilOrEmpty(activity) && !done.current) {
      if (isUserRejected(writeError)) {
        onUserReject?.();
        if (!disableActivity) {
          deleteActivity('rejected');
        }
      } else {
        if (writeError) {
          onError?.(writeError);
        }
        if (!disableActivity) {
          updateActivity({
            status: 'error',
            error: writeError?.message,
          });
        }
      }
      resetWriteContract();
      done.current = true;
    }
  }, [
    activity,
    deleteActivity,
    deleteNotification,
    disableActivity,
    intl,
    onError,
    onUserReject,
    pushNotification,
    resetWriteContract,
    token.id,
    updateActivity,
    writeError,
  ]);

  const handleClick = () => {
    if (prepareData?.request) {
      writeContract(prepareData?.request);
    }
    onClick?.();
    if (!disableActivity) {
      pushActivity({
        tokenIdIn: token.id,
        type: 'approval',
        status: 'pending',
        amountIn: amount,
      });
    }
    done.current = false;
  };

  const buttonLabel = isWriteLoading
    ? waitingSignatureLabel ??
      intl.formatMessage({ defaultMessage: 'Waiting for signature' })
    : isApprovalLoading
      ? waitingTxLabel ??
        intl.formatMessage({ defaultMessage: 'Processing Transaction' })
      : isNilOrEmpty(label)
        ? intl.formatMessage({ defaultMessage: 'Approve' })
        : label;
  const buttonDisabled =
    !isConnected ||
    !isNilOrEmpty(prepareError) ||
    isWriteLoading ||
    isApprovalLoading ||
    disabled;

  return (
    <Button {...rest} disabled={buttonDisabled} onClick={handleClick}>
      {buttonLabel}
    </Button>
  );
};
