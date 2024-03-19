import { Box, Stack, Typography } from '@mui/material';

import type { StackProps, SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';

export type PageTitleProps = {
  title: string;
  subtitle?: string;
  icon: ComponentType<SvgIconProps>;
} & StackProps;

export const PageTitle = ({
  title,
  icon,
  subtitle,
  ...rest
}: PageTitleProps) => {
  return (
    <Stack alignItems="center" spacing={2} py={5} {...rest}>
      <Stack direction="row" alignItems="center" spacing={2} {...rest}>
        <Box component={icon} sx={{ fontSize: 32 }} />
        <Typography variant="h2">{title}</Typography>
      </Stack>
      {subtitle && (
        <Typography color="text.secondary" textAlign="center">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};
