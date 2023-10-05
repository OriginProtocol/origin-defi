import { Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { LinkIcon } from '../Icons';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type NotificationSnackProps = {
  icon?: ReactNode;
  title: ReactNode;
  href?: string;
  subtitle: ReactNode;
  endIcon?: ReactNode;
} & Omit<StackProps, 'onClick'>;

export const NotificationSnack = ({
  icon,
  title,
  href,
  subtitle,
  endIcon,
  ...rest
}: NotificationSnackProps) => {
  return (
    <Stack width={1} direction="row" justifyContent="space-between" {...rest}>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon}
          <Typography>{title}</Typography>
          {!isNilOrEmpty(href) && <LinkIcon size={10} url={href} />}
        </Stack>
        <Stack direction="row" alignItems="center">
          {subtitle}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {endIcon}
      </Stack>
    </Stack>
  );
};
