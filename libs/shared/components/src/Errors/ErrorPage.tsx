import { Button, Link, Stack, Typography } from '@mui/material';
import { DISCORD_URL } from '@origin/shared/constants';
import { useMountEffect } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { Dispatch, ReactNode } from 'react';

export type ErrorPageProps = {
  title?: string;
  subtitle?: string;
  message?: ReactNode;
  hideSupport?: boolean;
  tips?: ReactNode;
  onMount?: Dispatch<void>;
} & StackProps;

export const ErrorPage = ({
  title,
  subtitle,
  message,
  hideSupport,
  tips,
  onMount,
  ...rest
}: ErrorPageProps) => {
  const intl = useIntl();

  useMountEffect(() => {
    if (onMount) onMount();
  });

  return (
    <Stack direction="row" p={{ xs: 3, sm: 6 }} {...rest}>
      <Stack direction="column" alignItems="flex-start">
        <Typography
          py={3}
          sx={(theme) => ({
            fontSize: 64,
            fontWeight: 800,
            lineHeight: '64px',
            background: theme.palette.background.gradient2,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          {title ??
            intl.formatMessage({
              defaultMessage: 'Unhandled Error!',
            })}
        </Typography>
        <Typography variant="h4" pb={8} color="grey.600">
          {subtitle ??
            intl.formatMessage({
              defaultMessage: 'Ooops, something went wrong 😓',
            })}
        </Typography>
        {message}
        {!hideSupport && (
          <Stack direction="column" spacing={4} alignItems="flex-start">
            <Typography variant="body2">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'If the problem persists, you can contact us through our {support}.',
                },
                {
                  support: (
                    <Link
                      href={DISCORD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="secondary.main"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Discord support channel',
                      })}
                    </Link>
                  ),
                },
              )}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => {
                  window.location.reload();
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Reload Page',
                })}
              </Button>
              <Button href="/" color="secondary">
                {intl.formatMessage({
                  defaultMessage: 'Return to Home Page',
                })}
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
