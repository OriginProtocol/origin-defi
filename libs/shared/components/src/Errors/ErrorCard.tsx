import { Link, Stack, Typography } from '@mui/material';
import { DISCORD_URL } from '@origin/shared/constants';
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
        sx={[
          {
            pb: 3,
          },
          (theme) => ({
            fontSize: 20,
            fontWeight: 800,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }),
        ]}
      >
        {title ??
          intl.formatMessage({
            defaultMessage: 'Unhandled Error!',
          })}
      </Typography>
      <Typography
        sx={{
          pb: 2,
        }}
      >
        {subtitle ??
          intl.formatMessage({
            defaultMessage:
              'There was an error while loading this component, you can try to reload.',
          })}
      </Typography>
      {message}
      {!hideSupport && (
        <Typography>
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
                  sx={{
                    color: 'primary.main',
                  }}
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
