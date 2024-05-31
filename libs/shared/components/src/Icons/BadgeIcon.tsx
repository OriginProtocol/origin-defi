import { Badge } from '@mui/material';

import type { BadgeProps, BadgeTypeMap } from '@mui/material';
import type { ReactNode } from 'react';

export type BadgeIconProps = {
  children: ReactNode;
  badgeSx?: BadgeTypeMap<'span', object>;
} & BadgeProps;

export const BadgeIcon = ({ children, badgeSx, ...rest }: BadgeIconProps) => {
  return (
    <Badge
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      {...rest}
      sx={{
        ...rest?.sx,
        '& .MuiBadge-badge': {
          p: 0,
          minWidth: 0,
          minHeight: 0,
          width: 16,
          height: 16,
          mb: 0.75,
          border: '1px solid',
          borderColor: 'background.highlight',
          backgroundColor: 'background.default',
          ...badgeSx,
        },
      }}
    >
      {children}
    </Badge>
  );
};
