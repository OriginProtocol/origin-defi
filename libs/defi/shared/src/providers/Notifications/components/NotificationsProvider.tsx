import { Stack } from '@mui/material';
import {
  NotificationStateProvider,
  useVisibleNotifications,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';

import { NotificationAlert } from './NotificationAlert';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type NotificationsProviderProps = {
  children: ReactNode;
};

const NotificationsWrapped = ({ children }: StackProps) => {
  const visibleNotifications = useVisibleNotifications();

  return (
    <>
      {children}
      {!isNilOrEmpty(visibleNotifications) && (
        <Stack
          direction="column"
          spacing={1}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 40 },
            right: { xs: 16, sm: 40 },
            left: {
              xs: 16,
              sm: '30dvw',
              md: '50dvw',
              lg: '60dvw',
              xl: '70dvw',
            },
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
        >
          {visibleNotifications.map((notif) => (
            <NotificationAlert
              key={notif.id}
              notification={notif}
              sx={{ width: 1 }}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => (
  <NotificationStateProvider
    initialState={{ notifications: [], maxVisible: 4, autoHideDuration: 5000 }}
  >
    <NotificationsWrapped>{children}</NotificationsWrapped>
  </NotificationStateProvider>
);
