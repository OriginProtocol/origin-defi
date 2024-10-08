import { Card, Stack, Typography } from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';

import type { CardProps, StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

export type SectionCardProps = {
  title: ReactNode;
  titleProps?: TypographyProps;
  titleInfoTooltip?: string;
  cardProps?: CardProps;
  children?: ReactNode;
} & StackProps;

export const SectionCard = ({
  title,
  titleProps,
  titleInfoTooltip,
  cardProps,
  children,
  ...rest
}: SectionCardProps) => {
  return (
    <Stack spacing={1.5} {...rest}>
      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          alignItems: 'center',
        }}
      >
        {typeof title === 'string' ? (
          <Typography {...titleProps}>{title}</Typography>
        ) : (
          title
        )}
        {titleInfoTooltip && <InfoTooltip tooltipLabel={titleInfoTooltip} />}
      </Stack>
      {!!children && <Card {...cardProps}>{children}</Card>}
    </Stack>
  );
};
