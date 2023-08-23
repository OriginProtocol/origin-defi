import { Card as MuiCard, CardContent, CardHeader } from '@mui/material';

import type { SxProps } from '@mui/material';
import type { Theme } from '@origin/shared/theme';

export const cardStyles = {
  paddingBlock: 2.5,
  paddingInline: 2,
} as const;

interface Props {
  title: string | React.ReactNode;
  children: React.ReactNode;
  sxCardContent?: SxProps<Theme>;
  sxCardTitle?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

export function Card({
  title,
  children,
  sxCardContent,
  sxCardTitle,
  sx,
}: Props) {
  return (
    <MuiCard sx={{ padding: 0, borderRadius: 2, ...(sx as SxProps) }}>
      <CardHeader
        title={title}
        sx={{
          ...cardStyles,
          borderBlockEnd: '1px solid',
          borderColor: 'divider',
          color: 'primary.contrastText',
          fontWeight: 500,
          '& .MuiCardHeader-title': {
            fontSize: (theme) => theme.typography.pxToRem(14),
          },
          ...(sxCardTitle as SxProps),
        }}
      ></CardHeader>
      <CardContent
        sx={{
          '&:last-child': {
            paddingBottom: 2,
          },
          paddingInline: {
            xs: 1.5,
            md: 3,
          },
          paddingBlock: {
            xs: 2,
            md: 3,
          },
          ...(sxCardContent as SxProps),
        }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
}
