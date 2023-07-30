import {
  CardContent,
  CardHeader,
  Card as MuiCard,
  SxProps,
} from '@mui/material';

import type { Theme } from '@origin/shared/theme';

export const cardStyles = {
  paddingBlock: 3.5,
  paddingInline: 5,
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
    <MuiCard sx={{ padding: 0, borderRadius: 1, ...(sx as SxProps) }}>
      <CardHeader
        title={title}
        sx={{
          ...cardStyles,
          borderBlockEnd: '1px solid',
          borderColor: 'background.default',
          '& .MuiCardHeader-title': {
            fontSize: (theme) => theme.typography.pxToRem(14),
          },
          ...(sxCardTitle as SxProps),
        }}
      ></CardHeader>
      <CardContent
        sx={{
          '&:last-child': {
            paddingBottom: 3.5,
          },
          padding: (theme) => theme.spacing(3.5, 5),
          ...(sxCardContent as SxProps),
        }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
}
