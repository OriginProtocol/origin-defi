import { Card as MuiCard, CardContent, CardHeader } from '@mui/material';

import type { CardProps as MuiCardProps, SxProps } from '@mui/material';
import type { Theme } from '@origin/shared/theme';
import type { ReactNode } from 'react';

export type CardProps = {
  title: ReactNode;
  sxCardContent?: SxProps<Theme>;
  sxCardTitle?: SxProps<Theme>;
} & Omit<MuiCardProps, 'title'>;

export function Card({
  title,
  children,
  sxCardContent,
  sxCardTitle,
  ...rest
}: CardProps) {
  return (
    <MuiCard {...rest} sx={{ padding: 0, borderRadius: 1, ...rest?.sx }}>
      <CardHeader
        title={title}
        sx={{
          padding: (theme) => ({
            xs: theme.spacing(2, 1.5),
            md: 3,
          }),
          borderBlockEnd: '1px solid',
          borderColor: 'divider',
          color: 'primary.contrastText',
          fontWeight: 500,
          '& .MuiCardHeader-title': {
            fontSize: (theme) => theme.typography.pxToRem(14),
          },
          ...sxCardTitle,
        }}
      ></CardHeader>
      <CardContent
        sx={{
          padding: (theme) => ({
            xs: theme.spacing(2, 1.5),
            md: 3,
          }),
          ...sxCardContent,
        }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
}
