import { keyframes } from '@emotion/react';
import { Box, Fade } from '@mui/material';

import type { BoxProps } from '@mui/material';

export type ActivityIconStatus = 'idle' | 'pending' | 'success' | 'error';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const iconPaths: Record<ActivityIconStatus, string> = {
  idle: '/images/activity.svg',
  pending: '/images/pending.svg',
  error: '/images/failed.svg',
  success: '/images/success.svg',
};

type ActivityIconProps = {
  status: ActivityIconStatus;
  disablePendingSpin?: boolean;
} & BoxProps<'img'>;

export const ActivityIcon = ({
  status,
  disablePendingSpin,
  ...rest
}: ActivityIconProps) => {
  return (
    <Fade in appear>
      <Box
        {...rest}
        component="img"
        src={iconPaths[status]}
        alt={`Activity-${status}`}
        {...(status === 'pending' &&
          !disablePendingSpin && {
            sx: {
              animation: `${spin} 3s linear infinite`,
              ...rest?.sx,
            },
          })}
      />
    </Fade>
  );
};
