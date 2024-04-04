import { useCallback, useState } from 'react';

import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { OETH } from '@origin/shared/icons';
import { formatError } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import {
  TransactionNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../activities';
import { useDeleteNotification, usePushNotification } from '../notifications';

import type { TransactionReceipt } from 'viem';

import type { Activity, SwapActivity } from '../activities';
import type { WriteTransactionCallbacks } from '../wagmi';

export type TxButtonConfig = {
  disableActivity?: boolean;
  disableNotification?: boolean;
  activity?: Partial<
    Pick<SwapActivity, 'title' | 'subtitle' | 'endIcon' | 'type'>
  >;
  callbacks?: WriteTransactionCallbacks;
};

export const useTxButtonCallbacks = (
  args: TxButtonConfig | undefined,
): WriteTransactionCallbacks => {
  const intl = useIntl();
  const [notifId, setNotifId] = useState<string | null>(null);
  const [act, setAct] = useState<Activity | null>(null);
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  const {
    disableActivity = false,
    disableNotification = false,
    activity = {},
    callbacks = {},
  } = args ?? {};

  const onWrite = useCallback(() => {
    const act = {
      type: activity?.type ?? 'transaction',
      title:
        activity?.title ??
        intl.formatMessage({ defaultMessage: 'On-chain Transaction' }),
      subtitle:
        activity?.subtitle ??
        intl.formatMessage({ defaultMessage: 'Transaction' }),
      endIcon: activity?.endIcon ?? <OETH />,
      status: 'pending',
    } as const;
    if (!disableActivity) {
      const activity = pushActivity(act);
      setAct(activity);
    } else {
      setAct({
        id: Date.now().toString(),
        createdOn: Date.now(),
        ...act,
      });
    }
    callbacks?.onWrite?.();
  }, [
    activity?.endIcon,
    activity?.subtitle,
    activity?.title,
    activity?.type,
    callbacks,
    disableActivity,
    intl,
    pushActivity,
  ]);

  const onTxSigned = useCallback(() => {
    if (!disableNotification) {
      const id = pushNotification({
        hideDuration: undefined,
        content: (
          <NotificationSnack
            icon={<SeverityIcon severity="info" />}
            title={intl.formatMessage({
              defaultMessage: 'Processing transaction',
            })}
            subtitle={
              activity?.title ??
              intl.formatMessage({
                defaultMessage: 'Your transaction is being processed on-chain.',
              })
            }
          />
        ),
      });
      setNotifId(id);
    }
    callbacks?.onTxSigned?.();
  }, [activity?.title, callbacks, disableNotification, intl, pushNotification]);

  const onUserReject = useCallback(() => {
    if (!disableActivity && act?.id) {
      deleteActivity(act.id);
    }
    if (notifId) {
      deleteNotification(notifId);
      setNotifId(null);
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
    callbacks?.onUserReject?.();
  }, [
    act?.id,
    callbacks,
    deleteActivity,
    deleteNotification,
    disableActivity,
    disableNotification,
    intl,
    notifId,
    pushNotification,
  ]);

  const onSimulateError = useCallback(
    (error: Error) => {
      if (!disableNotification) {
        pushNotification({
          content: (
            <NotificationSnack
              icon={<SeverityIcon severity="error" />}
              title={intl.formatMessage({
                defaultMessage: 'Impossible to execute',
              })}
              subtitle={formatError(error)}
            />
          ),
        });
      }
      callbacks?.onSimulateError?.(error);
    },
    [callbacks, disableNotification, intl, pushNotification],
  );

  const onWriteSuccess = useCallback(
    (txReceipt: TransactionReceipt) => {
      if (!disableActivity) {
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
      if (!disableNotification) {
        pushNotification({
          content: (
            <TransactionNotification
              title={intl.formatMessage({
                defaultMessage: 'Transaction executed',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'Your operation has been executed',
              })}
              status="success"
              txReceipt={txReceipt}
            />
          ),
        });
      }
      callbacks?.onWriteSuccess?.(txReceipt);
    },
    [
      act,
      callbacks,
      deleteNotification,
      disableActivity,
      disableNotification,
      intl,
      notifId,
      pushNotification,
      updateActivity,
    ],
  );

  const onWriteError = useCallback(
    (error: Error) => {
      if (!disableActivity && act?.id) {
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
      if (!disableNotification) {
        pushNotification({
          content: (
            <TransactionNotification
              title={intl.formatMessage({
                defaultMessage: 'Transaction error',
              })}
              subtitle={formatError(error)}
              error={formatError(error)}
              status="error"
            />
          ),
        });
      }
      callbacks?.onWriteError?.(error);
    },
    [
      act,
      callbacks,
      deleteNotification,
      disableActivity,
      disableNotification,
      intl,
      notifId,
      pushNotification,
      updateActivity,
    ],
  );

  return {
    onWrite,
    onTxSigned,
    onUserReject,
    onSimulateError,
    onWriteSuccess,
    onWriteError,
  };
};
