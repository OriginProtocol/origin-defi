import { keyframes } from '@emotion/react';
import { SvgIcon, useTheme } from '@mui/material';
import { Activity, Pending } from '@origin/shared/icons';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';

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
        <IoCloseCircle color={theme.palette.error.main} />
      </SvgIcon>
    ),
    success: (
      <SvgIcon {...rest}>
        <FaCircleCheck color={theme.palette.success.main} />
      </SvgIcon>
    ),
  }[status];
};
