import {
  CardContent,
  CardHeader,
  Card as MuiCard,
  SxProps,
} from '@mui/material';

export const cardStyles = {
  paddingBlock: 3.5,
  paddingInline: 5,
} as const;

interface Props {
  title: string | React.ReactNode;
  children: React.ReactNode;
  sxCardContent?: SxProps;
}

export function Card({ title, children, sxCardContent }: Props) {
  return (
    <MuiCard sx={{ padding: 0, borderRadius: 1 }}>
      <CardHeader
        title={title}
        sx={{
          ...cardStyles,
          borderBlockEnd: '1px solid',
          borderColor: 'background.default',
          '& .MuiCardHeader-title': {
            fontSize: (theme) => theme.typography.pxToRem(14),
          },
        }}
      ></CardHeader>
      <CardContent
        sx={{
          paddingBlock: 3.5,
          paddingInline: 5,
          '&:last-child': {
            paddingBottom: 0,
          },
          ...sxCardContent,
        }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
}
