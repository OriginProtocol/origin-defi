import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';

import type { StackProps, SvgIconProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ComponentType } from 'react';

export type PageTitleProps = {
  title: string;
  subtitle?: string;
  token?: Token;
  icon?: ComponentType<SvgIconProps>;
} & StackProps;

export const PageTitle = ({
  title,
  token,
  icon,
  subtitle,
  ...rest
}: PageTitleProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack alignItems="center" spacing={2} py={15} {...rest}>
      <Stack direction="row" alignItems="center" spacing={2} {...rest}>
        {icon ? (
          <Box component={icon} sx={{ fontSize: 32 }} />
        ) : token ? (
          <TokenIcon token={token} sx={{ fontSize: 32 }} />
        ) : null}
        <Typography variant="h5">
          {isSm && token && `${token.symbol} `}
          {title}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography color="text.secondary" textAlign="center">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};
