import { Badge } from '@mui/material';

import type { BadgeProps } from '@mui/material';
import type { ReactNode } from 'react';

export type BadgeIconProps = {
  children: ReactNode;
  badgeBkgColor?: string;
  badgeSize?: number;
} & BadgeProps;

export const BadgeIcon = ({
  children,
  badgeBkgColor = 'background.default',
  badgeSize = 16,
  ...rest
}: BadgeIconProps) => {
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
          width: badgeSize,
          height: badgeSize,
          mb: 0.75,
          border: '1px solid',
          borderColor: 'background.highlight',
          backgroundColor: badgeBkgColor,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      {children}
    </Badge>
  );
};
