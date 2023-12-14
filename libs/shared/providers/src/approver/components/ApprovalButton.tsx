import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import {
  ApprovalNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../activities';
import { usePushNotification } from '../../notifications';

import type { ButtonProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { TransactionReceipt } from 'viem';

import type { Activity } from '../../activities';

export type ApprovalButtonProps = {
  token: Token;
  spender: Token;
  amount: bigint;
  label?: string;
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
  const [activity, setActivity] = useState<Activity>(null);
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const { config } = usePrepareContractWrite({
    address: token.address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender.address, amount],
    enabled: amount > 0n,
  });
  const {
    write,
    data: writeData,
    error: writeError,
    isLoading: isWriteLoading,
  } = useContractWrite(config);
  const {
    data: approvalData,
    isLoading: isApprovalLoading,
    isSuccess: isApprovalSuccess,
  } = useWaitForTransaction({ hash: writeData?.hash });

  useEffect(() => {
    if (
      !isNilOrEmpty(approvalData) &&
      !isApprovalLoading &&
      isApprovalSuccess
    ) {
      if (onSuccess) {
        onSuccess(approvalData);
      }
      if (!disableActivity) {
        updateActivity({
          ...activity,
          status: 'success',
          txReceipt: approvalData,
        });
      }
      if (!disableNotification) {
        pushNotification({
          content: (
            <ApprovalNotification
              {...activity}
              status="success"
              txReceipt={approvalData}
            />
          ),
        });
      }
    }
  }, [
    activity,
    approvalData,
    disableActivity,
    disableNotification,
    isApprovalLoading,
    isApprovalSuccess,
    onSuccess,
    pushNotification,
    updateActivity,
  ]);

  useEffect(() => {
    if (!isNilOrEmpty(writeError) && !isNilOrEmpty(activity)) {
      if (isUserRejected(writeError)) {
        if (onUserReject) {
          onUserReject();
        }
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
        if (onError) {
          onError(writeError);
        }
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
    }
  }, [
    activity,
    deleteActivity,
    disableActivity,
    disableNotification,
    intl,
    onError,
    onUserReject,
    pushNotification,
    updateActivity,
    writeError,
  ]);

  const handleClick = () => {
    write?.();
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
        id: 'approval',
        createdOn: Date.now(),
        tokenIn: token,
        tokenOut: spender,
        type: 'approval',
        status: 'pending',
        amountIn: amount,
      });
    }
  };

  const buttonLabel = isWriteLoading
    ? intl.formatMessage({ defaultMessage: 'Waiting for signature' })
    : isApprovalLoading
      ? intl.formatMessage({ defaultMessage: 'Processing Transaction' })
      : isNilOrEmpty(label)
        ? intl.formatMessage({ defaultMessage: 'Approve' })
        : label;
  const buttonDisabled =
    !isConnected || isWriteLoading || isApprovalLoading || disabled;

  return (
    <Button {...rest} disabled={buttonDisabled} onClick={handleClick}>
      {buttonLabel}
    </Button>
  );
};
