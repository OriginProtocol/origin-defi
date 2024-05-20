import { Stack } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { useVisibleNotifications } from '../hooks';
import { NotificationStateProvider } from '../state';
import { NotificationAlert } from './NotificationAlert';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type NotificationsProviderProps = {
  children: ReactNode;
  maxVisible?: number;
  autoHideDuration?: number;
  containerProps?: StackProps;
};

const NotificationsWrapped = ({ children, ...rest }: StackProps) => {
  const visibleNotifications = useVisibleNotifications();

  return (
    <>
      {children}
      {!isNilOrEmpty(visibleNotifications) && (
        <Stack
          direction="column"
          spacing={1}
          {...rest}
          sx={{
            position: 'fixed',
            top: (theme) => theme.spacing(8),
            right: (theme) => theme.spacing(1),
            zIndex: (theme) => theme.zIndex.modal + 1,
            ...rest?.sx,
          }}
        >
          {visibleNotifications.map((notif) => (
            <NotificationAlert key={notif.id} notification={notif} />
          ))}
        </Stack>
      )}
    </>
  );
};

export const NotificationsProvider = ({
  maxVisible = 4,
  autoHideDuration = 5000,
  containerProps,
  children,
}: NotificationsProviderProps) => (
  <NotificationStateProvider
    initialState={{ notifications: [], maxVisible, autoHideDuration }}
  >
    <NotificationsWrapped {...containerProps}>{children}</NotificationsWrapped>
  </NotificationStateProvider>
);
