import { Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { LinkIcon } from '../Icons';

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
} & Omit<StackProps, 'onClick'>;

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
    <Stack width={1} direction="row" justifyContent="space-between" {...rest}>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon}
          {typeof title === 'string' ? (
            <Typography {...titleProps}>{title}</Typography>
          ) : (
            title
          )}
          {!isNilOrEmpty(href) && <LinkIcon size={10} url={href} />}
        </Stack>
        <Stack direction="row" alignItems="center">
          {typeof subtitle === 'string' ? (
            <Typography color="text.tertiary" {...subtitleProps}>
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {endIcon}
      </Stack>
    </Stack>
  );
};
