import { useCallback, useState } from 'react';

import {
  useDeleteNotification,
  usePushNotification,
} from '@origin/shared/providers';

import type { NotificationOptions } from '@origin/shared/providers';

export const useNotification = () => {
  const [id, setId] = useState<string | undefined>();
  const pushNotification = usePushNotification();
  const deleteNotification = useDeleteNotification();

  return {
    pushNotification: useCallback(
      (notif: NotificationOptions) => {
        const id = pushNotification(notif);
        setId(id);
      },
      [pushNotification],
    ),
    deleteNotification: useCallback(() => {
      if (id) {
        deleteNotification(id);
        setId(undefined);
      }
    }, [deleteNotification, id]),
  };
};
