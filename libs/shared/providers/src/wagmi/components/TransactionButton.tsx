import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import {
  SwapNotification,
  useDeleteActivity,
  useUpdateActivity,
} from '../../activities';
import { usePushNotification } from '../../notifications';

import type { ButtonProps } from '@mui/material';
import type { Contract, Token } from '@origin/shared/contracts';
import type { TransactionReceipt } from 'viem';

import type { Activity } from '../../activities';

export type TransactionButtonProps = {
  contract: Contract | Token;
  functionName: string;
  args?: unknown[];
  value?: bigint;
  label?: string;
  onSuccess?: (txReceipt: TransactionReceipt) => void;
  onError?: (error: Error) => void;
  onUserReject?: () => void;
  disableActivity?: boolean;
  disableNotification?: boolean;
} & Omit<ButtonProps, 'onClick'>;

export const TransactionButton = ({
  contract,
  functionName,
  args,
  value,
  label,
  onSuccess,
  onError,
  onUserReject,
  disabled,
  disableActivity,
  disableNotification,
  ...rest
}: TransactionButtonProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [activity] = useState<Activity>(null);
  const pushNotification = usePushNotification();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const { config } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    value,
    enabled: isConnected && !!contract?.address,
  });
  const {
    write,
    data: writeData,
    error: writeError,
    isLoading: isWriteLoading,
  } = useContractWrite(config);
  const {
    data: txData,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransaction({ hash: writeData?.hash });

  useEffect(() => {
    if (!isNilOrEmpty(txData) && !isTxLoading && isTxSuccess) {
      if (onSuccess) {
        onSuccess(txData);
      }
      if (!disableActivity) {
        updateActivity({
          ...activity,
          status: 'success',
          txReceipt: txData,
        });
      }
      if (!disableNotification) {
        pushNotification({
          content: (
            <SwapNotification
              {...activity}
              status="success"
              txReceipt={txData}
            />
          ),
        });
      }
    }
  }, [
    activity,
    disableActivity,
    disableNotification,
    isTxLoading,
    isTxSuccess,
    onSuccess,
    pushNotification,
    txData,
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
              <SwapNotification
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
  };

  const buttonLabel = isWriteLoading
    ? intl.formatMessage({ defaultMessage: 'Waiting for signature' })
    : isTxLoading
      ? intl.formatMessage({ defaultMessage: 'Processing Transaction' })
      : isNilOrEmpty(label)
        ? intl.formatMessage({ defaultMessage: 'Swap' })
        : label;
  const buttonDisabled =
    !isConnected || isWriteLoading || isTxLoading || disabled;

  return (
    <Button {...rest} disabled={buttonDisabled} onClick={handleClick}>
      {buttonLabel}
    </Button>
  );
};
