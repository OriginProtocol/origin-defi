import { Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { ExternalLink } from '../Links';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

export type NotificationSnackProps = {
  icon?: ReactNode;
  title: ReactNode;
  href?: string;
  subtitle: ReactNode;
  endIcon?: ReactNode;
  titleProps?: TypographyProps;
  subtitleProps?: TypographyProps;
  sx?: StackProps['sx'];
};

export const NotificationSnack = ({
  icon,
  title,
  href,
  subtitle,
  endIcon,
  titleProps,
  subtitleProps,
  ...rest
}: NotificationSnackProps) => {
  return (
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          width: 1,
          justifyContent: 'space-between',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
          }}
        >
          {icon}
          {!isNilOrEmpty(href) && typeof title === 'string' ? (
            <ExternalLink href={href}>{title}</ExternalLink>
          ) : typeof title === 'string' ? (
            <Typography {...titleProps}>{title}</Typography>
          ) : (
            title
          )}
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
          }}
        >
          {typeof subtitle === 'string' ? (
            <Typography
              {...subtitleProps}
              sx={[
                {
                  color: 'text.secondary',
                },
                ...(subtitleProps?.sx
                  ? Array.isArray(subtitleProps.sx)
                    ? subtitleProps.sx
                    : [subtitleProps.sx]
                  : []),
              ]}
            >
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        {endIcon}
      </Stack>
    </Stack>
  );
};
