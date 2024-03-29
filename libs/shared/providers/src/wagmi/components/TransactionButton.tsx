import { useEffect, useRef, useState } from 'react';

import { capitalize } from '@mui/material';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import {
  formatError,
  isNilOrEmpty,
  isUserRejected,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
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

import type { Activity, ActivityInput } from '../../activities';

export type TransactionButtonProps = {
  contract: Contract | Token;
  functionName: string;
  args?: unknown[];
  value?: bigint;
  label?: string;
  waitingSignatureLabel?: string;
  waitingTxLabel?: string;
  notificationTitle?: ReactNode;
  notificationSubtitle?: ReactNode;
  notificationEndIcon?: ReactNode;
  onClick?: () => void;
  onSuccess?: (txReceipt: TransactionReceipt) => void;
  onError?: (error: Error) => void;
  onUserReject?: () => void;
  disableActivity?: boolean;
  createActivityFn?: () => ActivityInput;
  disableNotification?: boolean;
} & Omit<ButtonProps, 'onClick' | 'value'>;

export const TransactionButton = ({
  contract,
  functionName,
  args,
  value,
  label,
  waitingSignatureLabel,
  waitingTxLabel,
  notificationTitle,
  notificationSubtitle,
  notificationEndIcon,
  onClick,
  onSuccess,
  onError,
  onUserReject,
  disabled,
  disableActivity,
  createActivityFn,
  disableNotification,
  ...rest
}: TransactionButtonProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [notifId, setNotifId] = useState<string | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const done = useRef(false);
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const { data: prepareData, error: prepareError } = useSimulateContract({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    value,
    query: {
      enabled: isConnected && !!contract?.address && !disabled,
    },
  });
  const {
    writeContract,
    data: hash,
    error: writeError,
    isPending: isWriteLoading,
  } = useWriteContract();
  const {
    data: txData,
    error: txError,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isTxLoading && !disableNotification) {
      const id = pushNotification({
        hideDuration: undefined,
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
      });
      setNotifId(id);
    }
  }, [disableNotification, intl, isTxLoading, pushNotification]);

  useEffect(() => {
    if (
      !isNilOrEmpty(txData) &&
      !isTxLoading &&
      isTxSuccess &&
      !done.current &&
      activity
    ) {
      onSuccess?.(txData as TransactionReceipt);
      if (!disableActivity) {
        updateActivity({
          ...activity,
          status: 'success',
          txReceipt: txData as TransactionReceipt,
        });
      }
      if (!disableNotification) {
        if (notifId) {
          deleteNotification(notifId);
          setNotifId(null);
        }
        pushNotification({
          content: (
            <TransactionNotification
              {...activity}
              title={
                notificationTitle ??
                intl.formatMessage({ defaultMessage: 'Transaction executed' })
              }
              subtitle={
                notificationSubtitle ??
                intl.formatMessage({
                  defaultMessage: 'Your operation has been executed',
                })
              }
              endIcon={notificationEndIcon}
              status="success"
              txReceipt={txData as TransactionReceipt}
            />
          ),
        });
      }
      done.current = true;
    }
  }, [
    activity,
    notificationEndIcon,
    notificationSubtitle,
    notificationTitle,
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
      activity &&
      !done.current
    ) {
      const err = isNilOrEmpty(writeError) ? txError : writeError;
      if (notifId) {
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
        if (err) {
          onError?.(err);
        }
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
                subtitle={formatError(err)}
                status="error"
                error={formatError(err)}
              />
            ),
          });
        }
      }
      done.current = true;
    }
  }, [
    activity,
    notificationEndIcon,
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
    if (prepareData?.request) {
      writeContract(prepareData.request);
      onClick?.();
      if (!disableActivity) {
        const activity = pushActivity(
          createActivityFn?.() ?? {
            title: notificationTitle,
            subtitle: notificationSubtitle,
            type: 'transaction',
            status: 'pending',
            endIcon: notificationEndIcon,
          },
        );
        setActivity(activity);
      } else {
        setActivity({
          id: Date.now().toString(),
          createdOn: Date.now(),
          title: notificationTitle,
          subtitle: notificationSubtitle,
          type: 'transaction',
          status: 'pending',
          endIcon: notificationEndIcon,
        });
      }
      done.current = false;
    }
  };

  const buttonLabel = isWriteLoading
    ? waitingSignatureLabel ??
      intl.formatMessage({ defaultMessage: 'Waiting for signature' })
    : isTxLoading
      ? waitingTxLabel ??
        intl.formatMessage({ defaultMessage: 'Processing Transaction' })
      : isNilOrEmpty(label)
        ? capitalize(functionName)
        : label;

  // Alert if an error has occurred.
  useEffect(() => {
    if (!prepareError) return;
    console.log(prepareError);
  }, [prepareError]);

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
