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
      alignItems="center"
      py={6}
      {...rest}
      sx={{
        borderBottom: '1px solid',
        borderBottomColor: 'divider',
        ...rest?.sx,
      }}
    >
      {icon ? (
        <Box component={icon} sx={{ fontSize: 52 }} />
      ) : token ? (
        <TokenIcon token={token} sx={{ fontSize: 52 }} />
      ) : null}
      <Stack
        direction="row"
        alignItems="center"
        pt={1.5}
        pb={2}
        spacing={2}
        {...rest}
      >
        <Typography variant="h5" textAlign="center">
          {isSm && token && `${token.symbol} `}
          {title}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography variant="mono" color="text.secondary" textAlign="center">
          {subtitle}
        </Typography>
      )}
      {children}
    </Stack>
  );
};
