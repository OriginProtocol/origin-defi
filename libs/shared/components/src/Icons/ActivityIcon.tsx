import { keyframes } from '@emotion/react';
import { SvgIcon, useTheme } from '@mui/material';
import {
  Activity,
  FaCircleCheckRegular,
  FaCircleXmarkRegular,
  Pending,
} from '@origin/shared/icons';

import type { SvgIconProps } from '@mui/material';

export type ActivityIconStatus = 'idle' | 'pending' | 'success' | 'error';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

type ActivityIconProps = {
  status: ActivityIconStatus;
  disablePendingSpin?: boolean;
} & SvgIconProps;

export const ActivityIcon = ({
  status,
  disablePendingSpin,
  ...rest
}: ActivityIconProps) => {
  const theme = useTheme();

  return {
    idle: <Activity {...rest} />,
    pending: (
      <Pending
        {...rest}
        {...(!disablePendingSpin && {
          sx: {
            animation: `${spin} 3s linear infinite`,
            ...rest?.sx,
          },
        })}
      />
    ),
    error: (
      <SvgIcon {...rest}>
        <FaCircleXmarkRegular sx={{ color: theme.palette.error.main }} />
      </SvgIcon>
    ),
    success: (
      <SvgIcon {...rest}>
        <FaCircleCheckRegular sx={{ color: theme.palette.success.main }} />
      </SvgIcon>
    ),
  }[status];
};
