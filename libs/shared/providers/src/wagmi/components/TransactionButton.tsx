import { useEffect, useRef, useState } from 'react';

import { capitalize } from '@mui/material';
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
  TransactionNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../../activities';
import {
  useDeleteNotification,
  usePushNotification,
} from '../../notifications';
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
  const [notifId, setNotifId] = useState(null);
  const [activity, setActivity] = useState<Activity>(null);
  const done = useRef(false);
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
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
  const {
    write,
    data: writeData,
    error: writeError,
    isLoading: isWriteLoading,
  } = useContractWrite(config);
  const {
    data: txData,
    error: txError,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransaction({ hash: writeData?.hash });

  useEffect(() => {
    if (isTxLoading && !disableNotification) {
      setNotifId(
        pushNotification({
          hideDuration: null,
          content: (
            <NotificationSnack
              icon={<SeverityIcon severity="info" />}
              title={intl.formatMessage({
                defaultMessage: 'Processing transaction',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'Your transaction is being processed on-chain.',
              })}
            />
          ),
        }),
      );
    }
  }, [disableNotification, intl, isTxLoading, pushNotification]);

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
        if (!isNilOrEmpty(notifId)) {
          deleteNotification(notifId);
          setNotifId(null);
        }
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
    deleteNotification,
    disableActivity,
    disableNotification,
    intl,
    isTxLoading,
    isTxSuccess,
    notifId,
    onSuccess,
    pushNotification,
    txData,
    updateActivity,
  ]);

  useEffect(() => {
    if (
      (!isNilOrEmpty(writeError) || !isNilOrEmpty(txError)) &&
      !isNilOrEmpty(activity) &&
      !done.current
    ) {
      const err = isNilOrEmpty(writeError) ? txError : writeError;
      if (!isNilOrEmpty(notifId)) {
        deleteNotification(notifId);
        setNotifId(null);
      }
      if (isUserRejected(err)) {
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
        onError?.(err);
        if (!disableActivity) {
          updateActivity({
            ...activity,
            status: 'error',
            error: err?.message,
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
                subtitle={err.message}
                status="error"
                error={err.message}
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
    deleteNotification,
    disableActivity,
    disableNotification,
    intl,
    notifId,
    onError,
    onUserReject,
    pushNotification,
    txError,
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
        id: Date.now().toString(),
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
        ? capitalize(functionName)
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
