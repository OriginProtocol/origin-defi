import { useCallback, useMemo, useState } from 'react';

import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { produce } from 'immer';
import { descend, prop, propEq, take } from 'ramda';
import { useIntl } from 'react-intl';

import { ActivityNotification } from '../activities';
import { useNotificationState } from './state';

import type { Activity } from '../activities';
import type { NotificationOptions } from './types';

export const useNotification = () => {
  const [id, setId] = useState<string>();
  const _pushNotification = usePushNotification();
  const _pushNotificationForActivity = usePushNotificationForActivity();
  const _deleteNotification = useDeleteNotification();

  return {
    id,
    pushNotification: useCallback(
      (input: NotificationOptions) => {
        const id = _pushNotification(input);
        setId(id);
        return id;
      },
      [_pushNotification],
    ),
    pushNotificationForActivity: useCallback(
      (input: Activity) => {
        const id = _pushNotificationForActivity(input);
        setId(id);
        return id;
      },
      [_pushNotificationForActivity],
    ),
    deleteNotification: useCallback(() => {
      if (id) {
        setId(undefined);
        _deleteNotification(id);
      }
      return id;
    }, [_deleteNotification, setId, id]),
  };
};

export const usePushNotification = () => {
  const [, setState] = useNotificationState();

  return useCallback(
    (options: NotificationOptions) => {
      const id = options.id ?? Date.now().toString();
      setState(
        produce((state) => {
          const existing = state.notifications.find((n) => n.id === id);
          if (existing) {
            Object.assign(existing, { ...options, read: false, visible: true });
          } else {
            state.notifications.unshift({
              severity: 'info',
              visible: true,
              hideDuration: state.autoHideDuration,
              ...options,
              id,
              createdOn: Date.now(),
              read: false,
            });
          }
        }),
      );

      return id;
    },
    [setState],
  );
};

export const usePushNotificationForActivity = () => {
  const intl = useIntl();
  const [state] = useNotificationState();
  const pushNotification = usePushNotification();
  return useCallback(
    (activity?: Activity, context?: { reason?: 'rejected' }) => {
      if (activity) {
        if (context?.reason === 'rejected') {
          return pushNotification({
            id: activity.id,
            hideDuration: state.autoHideDuration,
            content: (
              <NotificationSnack
                icon={<SeverityIcon severity="info" />}
                title={intl.formatMessage({
                  defaultMessage: 'Operation Cancelled',
                })}
                subtitle={intl.formatMessage({
                  defaultMessage: 'User rejected operation',
                })}
              />
            ),
          });
        } else {
          return pushNotification({
            id: activity.id,
            hideDuration:
              activity.status === 'pending'
                ? undefined
                : state.autoHideDuration,
            content: <ActivityNotification activity={activity} />,
            blockExplorerLinkProps: {
              hash: activity.txHash,
            },
          });
        }
      }
    },
    [intl, state, pushNotification],
  );
};

export const useSetNotificationInvisible = () => {
  const [, setState] = useNotificationState();

  return useCallback(
    (id: string) => {
      setState(
        produce((state) => {
          const idx = state.notifications.findIndex(propEq(id, 'id'));
          if (idx > -1) {
            state.notifications[idx].visible = false;
          }
        }),
      );
    },
    [setState],
  );
};

export const useSetNotificationRead = () => {
  const [, setState] = useNotificationState();

  return useCallback(
    (id: string) => {
      setState(
        produce((state) => {
          const idx = state.notifications.findIndex(propEq(id, 'id'));
          if (idx > -1) {
            state.notifications[idx].read = true;
          }
        }),
      );
    },
    [setState],
  );
};

export const useMarkAllNotificationsAsRead = () => {
  const [, setState] = useNotificationState();

  return useCallback(() => {
    setState(
      produce((state) => {
        state.notifications.forEach(
          (notification) => (notification.read = true),
        );
      }),
    );
  }, [setState]);
};

export const useDeleteNotification = () => {
  const [, setState] = useNotificationState();

  return useCallback(
    (id: string) => {
      setState(
        produce((state) => {
          const idx = state.notifications.findIndex(propEq(id, 'id'));
          if (idx > -1) {
            state.notifications.splice(idx, 1);
          }
        }),
      );
    },
    [setState],
  );
};

export const useClearAllNotifications = () => {
  const [, setState] = useNotificationState();

  return useCallback(() => {
    setState(
      produce((state) => {
        state.notifications = [];
      }),
    );
  }, [setState]);
};

export const useVisibleNotifications = () => {
  const [{ notifications, maxVisible }] = useNotificationState();

  return useMemo(
    () =>
      take(
        maxVisible,
        notifications.filter(prop('visible')).sort(descend(prop('createdOn'))),
      ),
    [maxVisible, notifications],
  );
};

export const useUnreadNotificationsCount = () => {
  const [{ notifications }] = useNotificationState();

  return useMemo(
    () => notifications.reduce((acc, curr) => acc + (curr.read ? 0 : 1), 0),
    [notifications],
  );
};
