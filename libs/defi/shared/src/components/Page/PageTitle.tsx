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
  children,
  ...rest
}: PageTitleProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      {...rest}
      sx={[
        {
          alignItems: 'center',
          py: 6,
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
          ...rest?.sx,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {icon ? (
        <Box component={icon} sx={{ fontSize: 52 }} />
      ) : token ? (
        <TokenIcon token={token} sx={{ fontSize: 52 }} />
      ) : null}
      <Stack
        direction="row"
        spacing={2}
        {...rest}
        sx={[
          {
            alignItems: 'center',
            pt: 1.5,
            pb: 2,
          },
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            px: 3,
          }}
        >
          {isSm && token && `${token.symbol} `}
          {title}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography
          variant="mono"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            px: 3,
          }}
        >
          {subtitle}
        </Typography>
      )}
      {children}
    </Stack>
  );
};
