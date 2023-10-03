import { keyframes } from '@emotion/react';
import { Box, Fade } from '@mui/material';

import type { BoxProps } from '@mui/material';

import type { GlobalActivityStatus } from '../types';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const iconPaths: Record<GlobalActivityStatus, string> = {
  idle: '/images/activity.svg',
  pending: '/images/pending.svg',
  error: '/images/failed.svg',
  success: '/images/success.svg',
};

type ActivityIconProps = { status: GlobalActivityStatus } & BoxProps<'img'>;

export const ActivityIcon = ({ status, ...rest }: ActivityIconProps) => {
  return (
    <Fade in appear>
      <Box
        {...rest}
        component="img"
        src={iconPaths[status]}
        alt={`Activity-${status}`}
        {...(status === 'pending' && {
          sx: {
            animation: `${spin} 3s linear infinite`,
            ...rest?.sx,
          },
        })}
      />
    </Fade>
  );
};
