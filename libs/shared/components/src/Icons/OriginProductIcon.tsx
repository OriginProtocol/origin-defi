import { Stack, Typography } from '@mui/material';
import { OriginLabel } from '@origin/shared/icons';

import type { StackProps } from '@mui/material';

export type OriginProductIconProps = {
  name: string;
  textColor?: string;
} & StackProps;

export const OriginProductIcon = ({
  name,
  textColor,
  ...rest
}: OriginProductIconProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          justifyContent: 'flex-start',
          alignItems: 'baseline',
          flexWrap: 'nowrap',
          svg: { width: { xs: 80, md: 100 }, height: 1 },
          '.name': {
            textDecoration: 'none',
            fontSize: { xs: 16, md: 18 },
            fontWeight: 'medium',
            color: textColor ?? 'text.primary',
            transform: 'translateY(-1px)',
          },
        },
      ]}
    >
      <OriginLabel />
      <Typography className="name">{name}</Typography>
    </Stack>
  );
};
