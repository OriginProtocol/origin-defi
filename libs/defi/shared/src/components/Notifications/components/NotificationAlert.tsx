import { forwardRef, useState } from 'react';

import { Alert, AlertTitle, Box, LinearProgress, Stack } from '@mui/material';
import { TooltipLabel } from '@origin/shared/components';
import {
  BlockExplorerLink,
  useSetNotificationInvisible,
  useSetNotificationRead,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntervalEffect } from '@react-hookz/web';

import { SeverityIcon } from '../../../components';

import type {
  AlertColor,
  AlertProps,
  LinearProgressProps,
} from '@mui/material';
import type { Notification } from '@origin/shared/providers';
import type { Dispatch } from 'react';

export type NotificationAlertProps = {
  notification: Notification;
  onClose?: Dispatch<Notification>;
} & AlertProps;

export const NotificationAlert = forwardRef<
  HTMLDivElement,
  NotificationAlertProps
>(({ notification, onClose, ...rest }, ref) => {
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
  const [countdown, setCountdown] = useState(100);
  const [duration, setDuration] = useState(hideDuration);
  const [timers, setTimers] = useState({
    duration: hideDuration,
    countdown: hideDuration ? hideDuration / 100 : undefined,
  });

  useIntervalEffect(() => {
    setCountdown((prev) => prev - 1);
  }, timers.countdown);

  useIntervalEffect(() => {
    setNotificationInvisible(id);
  }, timers.duration);

  const handleCloseClick = () => {
    onClose?.(notification);
    setNotificationViewed(id);
    setNotificationInvisible(id);
  };

  const handleMouseEnter = () => {
    setTimers({ duration: undefined, countdown: undefined });
    setDuration((prev) => (prev ? (countdown / 100) * prev : undefined));
  };

  const handleMouseLeave = () => {
    setTimers({
      duration,
      countdown: duration ? duration / countdown : undefined,
    });
  };

  return (
    <Alert
      {...rest}
      ref={ref}
      severity={severity as AlertColor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        ...(hideDuration
          ? {
              borderTopRightRadius: (theme) => theme.shape.borderRadius,
              borderTopLeftRadius: (theme) => theme.shape.borderRadius,
              borderBottomRightRadius: 1,
              borderBottomLeftRadius: 1,
            }
          : {
              borderRadius: 1,
            }),
        '.MuiAlert-message': {
          width: 1,
        },
        ...rest?.sx,
      }}
      {...((!!content || !!icon) && { icon: false })}
      onClose={handleCloseClick}
    >
      {isNilOrEmpty(content) ? (
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {!!notification?.icon && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  fontSize: 36,
                }}
              >
                {icon}
              </Box>
            )}
            <Stack spacing={1}>
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
                  {!!icon && <SeverityIcon severity={severity} />}
                  {title}
                </AlertTitle>
              )}
              {!isNilOrEmpty(message) && (
                <TooltipLabel
                  maxChars={200}
                  variant="caption1"
                  sx={{
                    maxWidth: 1,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {message}
                </TooltipLabel>
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
          value={countdown}
          color={severity === 'pending' ? 'primary' : (severity as AlertColor)}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 1,
            borderBottomRightRadius: (theme) => theme.shape.borderRadius,
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
          }}
        />
      )}
    </Alert>
  );
});
NotificationAlert.displayName = 'NotificationAlert';

type CountDownProps = { color: string } & Omit<
  LinearProgressProps,
  'variant' | 'color'
>;

function CountDown({ color, ...rest }: CountDownProps) {
  const col = color === 'pending' ? 'primary' : (color as AlertColor);

  return (
    <LinearProgress
      {...rest}
      color={col}
      variant="determinate"
      sx={{
        '& .MuiLinearProgress-bar': { transitionDuration: '50ms', width: 1 },
        ...rest?.sx,
      }}
    />
  );
}
