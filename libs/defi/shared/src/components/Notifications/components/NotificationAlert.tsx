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
    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
      <Alert
        {...rest}
        ref={ref}
        severity={severity as AlertColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={[
          {
            borderRadius: 3,
            '&.MuiAlert-message': {
              width: 1,
            },
          },
          hideDuration
            ? {
                borderTopRightRadius: (theme) => theme.shape.borderRadius * 3,
                borderTopLeftRadius: (theme) => theme.shape.borderRadius * 3,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }
            : {
                borderRadius: 3,
              },
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
        {...((!!content || !!icon) && { icon: false })}
        onClose={handleCloseClick}
      >
        {isNilOrEmpty(content) ? (
          <Stack spacing={1.5}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: 'center',
              }}
            >
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
      </Alert>
      {!!hideDuration && (
        <CountDown
          value={countdown}
          color={severity === 'pending' ? 'primary' : (severity as AlertColor)}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 1,
            width: 1,
          }}
        />
      )}
    </Box>
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
