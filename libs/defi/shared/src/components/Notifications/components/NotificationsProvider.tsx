import { Box, Collapse, Stack } from '@mui/material';
import {
  NotificationStateProvider,
  useVisibleNotifications,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { TransitionGroup } from 'react-transition-group';

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
      <Box>
        {!isNilOrEmpty(visibleNotifications) && (
          <Stack
            direction="column"
            sx={{
              position: 'fixed',
              bottom: { xs: 16, sm: 40 },
              right: { xs: 16, sm: 40 },
              width: {
                xs: 'calc(100% - 32px)',
                sm: 416,
              },
              zIndex: (theme) => theme.zIndex.modal + 1,
            }}
          >
            <TransitionGroup>
              {visibleNotifications.map((notif) => (
                <Collapse appear key={notif.id}>
                  <NotificationAlert
                    notification={notif}
                    sx={{ width: 1, mt: 1 }}
                  />
                </Collapse>
              ))}
            </TransitionGroup>
          </Stack>
        )}
      </Box>
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
