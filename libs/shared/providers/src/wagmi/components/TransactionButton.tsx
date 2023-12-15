import { useEffect, useRef, useState } from 'react';

import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import {
  TransactionNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../activities';
import { usePushNotification } from '../../notifications';
import { ConnectedButton } from './ConnectedButton';

import type { ButtonProps } from '@mui/material';
import type { Contract, Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';
import type { TransactionReceipt } from 'viem';

import type { Activity } from '../../activities';

export type TransactionButtonProps = {
  contract: Contract | Token;
  functionName: string;
  args?: unknown[];
  value?: bigint;
  label?: string;
  activityTitle?: ReactNode;
  activitySubtitle?: ReactNode;
  activityEndIcon?: ReactNode;
  onClick?: () => void;
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
  activityTitle,
  activitySubtitle,
  activityEndIcon,
  onClick,
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
  const [activity, setActivity] = useState<Activity>(null);
  const done = useRef(false);
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const { config, error: prepareError } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    value,
    enabled: isConnected && !!contract?.address && !disabled,
  });
  console.log(config);
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
    if (!isNilOrEmpty(txData) && !isTxLoading && isTxSuccess && !done.current) {
      onSuccess?.(txData);
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
            <TransactionNotification
              {...activity}
              title={
                activityTitle ??
                intl.formatMessage({ defaultMessage: 'Transaction executed' })
              }
              subtitle={
                activitySubtitle ??
                intl.formatMessage({
                  defaultMessage: 'Your operation has been executed',
                })
              }
              endIcon={activityEndIcon}
              status="success"
              txReceipt={txData}
            />
          ),
        });
      }
      done.current = true;
    }
  }, [
    activity,
    activityEndIcon,
    activitySubtitle,
    activityTitle,
    disableActivity,
    disableNotification,
    intl,
    isTxLoading,
    isTxSuccess,
    onSuccess,
    pushNotification,
    txData,
    updateActivity,
  ]);

  useEffect(() => {
    if (!isNilOrEmpty(writeError) && !isNilOrEmpty(activity) && !done.current) {
      if (isUserRejected(writeError)) {
        onUserReject?.();
        if (!disableActivity) {
          deleteActivity(activity.id);
        }
        if (!disableNotification) {
          pushNotification({
            content: (
              <TransactionNotification
                {...activity}
                title={intl.formatMessage({
                  defaultMessage: 'Operation Cancelled',
                })}
                subtitle={intl.formatMessage({
                  defaultMessage: 'User rejected operation',
                })}
                endIcon={activityEndIcon}
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
              <TransactionNotification
                {...activity}
                title={intl.formatMessage({
                  defaultMessage: 'Transaction error',
                })}
                subtitle={writeError.message}
                status="error"
                error={writeError.message}
                endIcon={activityEndIcon}
              />
            ),
          });
        }
      }
      done.current = true;
    }
  }, [
    activity,
    activityEndIcon,
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
    onClick?.();
    if (!disableActivity) {
      const activity = pushActivity({
        title: activityTitle,
        subtitle: activitySubtitle,
        type: 'transaction',
        status: 'pending',
        endIcon: activityEndIcon,
      });
      setActivity(activity);
    } else {
      setActivity({
        id: 'approval',
        createdOn: Date.now(),
        title: activityTitle,
        subtitle: activitySubtitle,
        type: 'transaction',
        status: 'pending',
        endIcon: activityEndIcon,
      });
    }
    done.current = false;
  };

  const buttonLabel = isWriteLoading
    ? intl.formatMessage({ defaultMessage: 'Waiting for signature' })
    : isTxLoading
      ? intl.formatMessage({ defaultMessage: 'Processing Transaction' })
      : isNilOrEmpty(label)
        ? intl.formatMessage({ defaultMessage: 'Execute' })
        : label;
  const buttonDisabled =
    !isConnected ||
    !isNilOrEmpty(prepareError) ||
    isWriteLoading ||
    isTxLoading ||
    disabled;

  return (
    <ConnectedButton {...rest} disabled={buttonDisabled} onClick={handleClick}>
      {buttonLabel}
    </ConnectedButton>
  );
};
