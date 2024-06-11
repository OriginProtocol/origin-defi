import { CircularProgress, SvgIcon, useTheme } from '@mui/material';
import {
  Activity,
  FaCircleCheckRegular,
  FaCircleXmarkRegular,
} from '@origin/shared/icons';

import type { SvgIconProps } from '@mui/material';
import type { ReactNode } from 'react';

export type ActivityIconStatus =
  | 'idle'
  | 'pending'
  | 'signed'
  | 'success'
  | 'error';

export type ActivityIconProps = {
  status: ActivityIconStatus;
  disablePendingSpin?: boolean;
  iconMapping?: Partial<Record<ActivityIconStatus, ReactNode>>;
} & SvgIconProps;

export const ActivityIcon = ({
  status,
  disablePendingSpin,
  iconMapping,
  ...rest
}: ActivityIconProps) => {
  const theme = useTheme();

  const custom = iconMapping
    ? Object.fromEntries(
        Object.entries(iconMapping).filter(([k, v]) => !!k && !!v),
      )
    : {};

  return {
    idle: <Activity {...rest} />,
    pending: <CircularProgress size={16} />,
    signed: <CircularProgress size={16} />,
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
    ...custom,
  }[status];
};
