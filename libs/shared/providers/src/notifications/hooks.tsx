import { useCallback, useMemo } from 'react';

import { produce } from 'immer';
import { descend, prop, propEq, take } from 'ramda';

import { ActivityNotification } from '../activities/components/ActivityNotification';
import { useTracked } from './state';

import type { AlertColor } from '@mui/material';
import type { ReactNode } from 'react';

import type { Activity } from '../activities';

type NotificationOptions = {
  severity?: AlertColor;
  title?: string;
  message?: string;
  content?: ReactNode;
  visible?: boolean;
  hideDuration?: number | undefined;
};

export const usePushNotification = () => {
  const [, setState] = useTracked();

  return useCallback(
    (options: NotificationOptions) => {
      const id = Date.now().toString();
      setState(
        produce((state) => {
          state.notifications.unshift({
            severity: 'info',
            visible: true,
            hideDuration: state.autoHideDuration,
            ...options,
            id,
            createdOn: Date.now(),
            read: false,
          });
        }),
      );

      return id;
    },
    [setState],
  );
};

export const usePushNotificationForActivity = () => {
  const pushNotification = usePushNotification();
  return useCallback(
    (activity?: Activity) => {
      if (activity) {
        return pushNotification({
          content: <ActivityNotification {...activity} />,
        });
      }
    },
    [pushNotification],
  );
};

export const useSetNotificationInvisible = () => {
  const [, setState] = useTracked();

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
  const [, setState] = useTracked();

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
  const [, setState] = useTracked();

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
  const [, setState] = useTracked();

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
  const [, setState] = useTracked();

  return useCallback(() => {
    setState(
      produce((state) => {
        state.notifications = [];
      }),
    );
  }, [setState]);
};

export const useVisibleNotifications = () => {
  const [{ notifications, maxVisible }] = useTracked();

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
  const [{ notifications }] = useTracked();

  return useMemo(
    () => notifications.reduce((acc, curr) => acc + (curr.read ? 0 : 1), 0),
    [notifications],
  );
};
