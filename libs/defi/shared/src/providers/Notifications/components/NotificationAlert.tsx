import { useState } from 'react';

import {
  Alert,
  AlertTitle,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { SeverityIcon } from '@origin/shared/components';
import {
  BlockExplorerLink,
  useSetNotificationInvisible,
  useSetNotificationRead,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntervalEffect } from '@react-hookz/web';

import type { AlertProps, LinearProgressProps } from '@mui/material';
import type { Notification } from '@origin/shared/providers';
import type { Dispatch } from 'react';

export type NotificationAlertProps = {
  notification: Notification;
  onClose?: Dispatch<Notification>;
} & AlertProps;

export const NotificationAlert = ({
  notification,
  onClose,
  ...rest
}: NotificationAlertProps) => {
  const {
    id,
    severity,
    title,
    message,
    icon,
    content,
    hideDuration,
    blockExplorerLinkProps,
  } = notification;
  const setNotificationViewed = useSetNotificationRead();
  const setNotificationInvisible = useSetNotificationInvisible();

  useIntervalEffect(() => {
    setNotificationInvisible(id);
  }, hideDuration);

  const handleCloseClick = () => {
    if (onClose) {
      onClose(notification);
    }
    setNotificationViewed(id);
    setNotificationInvisible(id);
  };

  return (
    <Alert
      {...rest}
      severity={severity}
      color={severity}
      sx={{
        position: 'relative',
        ...(hideDuration
          ? {
              borderTopRightRadius: (theme) => theme.shape.borderRadius * 4,
              borderTopLeftRadius: (theme) => theme.shape.borderRadius * 4,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }
          : {
              borderRadius: 4,
            }),
        '.MuiAlert-message': {
          width: 1,
        },
        ...rest?.sx,
      }}
      {...((!isNilOrEmpty(content) || !!icon) && { icon: false })}
      onClose={handleCloseClick}
    >
      {isNilOrEmpty(content) ? (
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {!!notification?.icon && icon}
            <Stack spacing={0.75}>
              {!isNilOrEmpty(title) && (
                <AlertTitle
                  sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    ...theme.typography.body3,
                    fontWeight: 'medium',
                  })}
                >
                  <SeverityIcon severity={severity} sx={{ fontSize: 14 }} />
                  {title}
                </AlertTitle>
              )}
              {!isNilOrEmpty(message) && (
                <Typography variant="caption1">{message}</Typography>
              )}
            </Stack>
          </Stack>
          {!!blockExplorerLinkProps && (
            <BlockExplorerLink
              variant="caption1"
              {...blockExplorerLinkProps}
              sx={{ color: 'text.secondary' }}
            />
          )}
        </Stack>
      ) : (
        content
      )}
      {!!hideDuration && (
        <CountDown
          duration={hideDuration}
          color={severity}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 1,
            borderBottomRightRadius: (theme) => theme.shape.borderRadius * 4,
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius * 4,
          }}
        />
      )}
    </Alert>
  );
};

type CountDownProps = { duration: number } & Omit<
  LinearProgressProps,
  'value' | 'variant'
>;

function CountDown({ duration, ...rest }: CountDownProps) {
  const [timer, setTimer] = useState(100);

  useIntervalEffect(() => {
    setTimer((prev) => prev - 1);
  }, duration / 110);

  return <LinearProgress {...rest} variant="determinate" value={timer} />;
}
