import { useEffect, useRef, useState } from 'react';

import { Button } from '@mui/material';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { erc20Abi } from 'viem';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import {
  ApprovalNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../activities';
import {
  useDeleteNotification,
  usePushNotification,
} from '../../notifications';

import type { ButtonProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { TransactionReceipt } from 'viem';

import type { Activity } from '../../activities';

export type ApprovalButtonProps = {
  token: Token;
  spender: Token;
  amount: bigint;
  label?: string;
  onClick?: () => void;
  onSuccess?: (txReceipt: TransactionReceipt) => void;
  onError?: (error: Error) => void;
  onUserReject?: () => void;
  disableActivity?: boolean;
  disableNotification?: boolean;
} & Omit<ButtonProps, 'onClick'>;

export const ApprovalButton = ({
  token,
  spender,
  amount,
  label,
  onClick,
  onSuccess,
  onError,
  onUserReject,
  disabled,
  disableActivity,
  disableNotification,
  ...rest
}: ApprovalButtonProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [notifId, setNotifId] = useState(null);
  const [activity, setActivity] = useState<Activity>(null);
  const done = useRef(false);
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const { data: prepareData, error: prepareError } = useSimulateContract({
    address: token.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender.address, amount],
    query: {
      enabled: isConnected && amount > 0n && !disabled,
    },
  });
  const {
    writeContract,
    data: hash,
    error: writeError,
    isPending: isWriteLoading,
  } = useWriteContract();
  const {
    data: approvalData,
    isLoading: isApprovalLoading,
    isSuccess: isApprovalSuccess,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isApprovalLoading && !disableNotification) {
      setNotifId(
        pushNotification({
          hideDuration: null,
          content: (
            <NotificationSnack
              icon={<SeverityIcon severity="info" />}
              title={intl.formatMessage({
                defaultMessage: 'Processing approval',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'Your transaction is being processed on-chain.',
              })}
            />
          ),
        }),
      );
    }
  }, [disableNotification, intl, isApprovalLoading, pushNotification]);

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
          ...activity,
          status: 'success',
          txReceipt: approvalData as TransactionReceipt,
        });
      }
      if (!disableNotification) {
        if (!isNilOrEmpty(notifId)) {
          deleteNotification(notifId);
          setNotifId(null);
        }
        pushNotification({
          content: (
            <ApprovalNotification
              {...activity}
              status="success"
              txReceipt={approvalData as TransactionReceipt}
            />
          ),
        });
      }
      done.current = true;
    }
  }, [
    activity,
    approvalData,
    deleteNotification,
    disableActivity,
    disableNotification,
    isApprovalLoading,
    isApprovalSuccess,
    notifId,
    onSuccess,
    pushNotification,
    updateActivity,
  ]);

  useEffect(() => {
    if (!isNilOrEmpty(writeError) && !isNilOrEmpty(activity) && !done.current) {
      if (!isNilOrEmpty(notifId)) {
        deleteNotification(notifId);
        setNotifId(null);
      }
      if (isUserRejected(writeError)) {
        onUserReject?.();
        if (!disableActivity) {
          deleteActivity(activity.id);
        }
        if (!disableNotification) {
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
      } else {
        onError?.(writeError);
        if (!disableActivity) {
          updateActivity({
            ...activity,
            status: 'error',
            error: writeError?.message,
          });
        }
        if (!disableNotification) {
          pushNotification({
            content: (
              <ApprovalNotification
                {...activity}
                status="error"
                error={writeError.message}
              />
            ),
          });
        }
      }
      done.current = true;
    }
  }, [
    activity,
    deleteActivity,
    deleteNotification,
    disableActivity,
    disableNotification,
    intl,
    notifId,
    onError,
    onUserReject,
    pushNotification,
    updateActivity,
    writeError,
  ]);

  const handleClick = () => {
    writeContract(prepareData?.request);
    onClick?.();
    if (!disableActivity) {
      const activity = pushActivity({
        tokenIn: token,
        tokenOut: spender,
        type: 'approval',
        status: 'pending',
        amountIn: amount,
      });
      setActivity(activity);
    } else {
      setActivity({
        id: Date.now().toString(),
        createdOn: Date.now(),
        tokenIn: token,
        tokenOut: spender,
        type: 'approval',
        status: 'pending',
        amountIn: amount,
      });
    }
    done.current = false;
  };

  const buttonLabel = isWriteLoading
    ? intl.formatMessage({ defaultMessage: 'Waiting for signature' })
    : isApprovalLoading
      ? intl.formatMessage({ defaultMessage: 'Processing Transaction' })
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
