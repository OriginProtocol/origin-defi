import { Alert, AlertTitle, Box, IconButton, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntervalEffect } from '@react-hookz/web';

import { useSetNotificationInvisible, useSetNotificationRead } from '../hooks';

import type { AlertProps, AlertTitleProps } from '@mui/material';
import type { Dispatch } from 'react';

import type { Notification } from '../types';

export type NotificationSnackProps = {
  notification: Notification;
  onClose?: Dispatch<Notification>;
  AlertProps?: Omit<AlertProps, 'severity'>;
  AlertTitleProps?: Omit<AlertTitleProps, 'children' | 'title'>;
};

export const NotificationSnack = ({
  notification,
  onClose,
  AlertProps,
  AlertTitleProps,
}: NotificationSnackProps) => {
  const { id, severity, title, message, content } = notification;
  const setNotificationViewed = useSetNotificationRead();
  const setNotificationInvisible = useSetNotificationInvisible();

  useIntervalEffect(() => {
    setNotificationInvisible(id);
  }, notification.hideDuration);

  const handleCloseClick = () => {
    if (onClose) {
      onClose(notification);
    }
    setNotificationViewed(id);
    setNotificationInvisible(id);
  };

  return (
    <Alert
      {...AlertProps}
      severity={severity}
      sx={{
        border: 1,
        borderRadius: 1,
        minWidth: { sm: 300, md: 400, lg: 500, xl: 600 },
        maxWidth: { sm: 400, md: 500, lg: 600, xl: 700 },
        ...AlertProps?.sx,
      }}
      action={
        <IconButton
          aria-label="close"
          onClick={handleCloseClick}
          sx={{ maxHeight: '1.375rem', maxWidth: '1.375rem' }}
        >
          <Box component="img" src={`/images/close.svg`} />
        </IconButton>
      }
    >
      {!isNilOrEmpty(title) && (
        <AlertTitle {...AlertTitleProps}>{title}</AlertTitle>
      )}
      {!isNilOrEmpty(message) && <Typography>{message}</Typography>}
      {!isNilOrEmpty(content) && content}
    </Alert>
  );
};
