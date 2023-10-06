import { Link, Stack, Typography } from '@mui/material';
import { DISCORD_URL } from '@origin/constants';
import { useMountEffect } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { Dispatch, ReactNode } from 'react';

export type ErrorCardProps = {
  title?: string;
  subtitle?: string;
  message?: ReactNode;
  hideSupport?: boolean;
  onMount?: Dispatch<void>;
} & StackProps;

export const ErrorCard = ({
  title,
  subtitle,
  message,
  hideSupport,
  onMount,
  ...rest
}: ErrorCardProps) => {
  const intl = useIntl();

  useMountEffect(() => {
    if (onMount) onMount();
  });

  return (
    <Stack
      {...rest}
      sx={{
        p: 3,
        borderRadius: 1,
        backgroundColor: 'background.paper',
        ...rest?.sx,
      }}
    >
      <Typography
        pb={3}
        sx={(theme) => ({
          fontSize: 20,
          fontWeight: 800,
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
      <Typography pb={2}>
        {subtitle ??
          intl.formatMessage({
            defaultMessage:
              'There was an error while loading this component, you can try to reload.',
          })}
      </Typography>
      {message}
      {!hideSupport && (
        <Typography variant="body2">
          {intl.formatMessage(
            {
              defaultMessage:
                'If the problem persists, contact us on our {support}.',
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
      )}
    </Stack>
  );
};
