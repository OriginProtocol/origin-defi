import { keyframes } from '@mui/material';
import {
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleXmarkRegular,
  Pending,
} from '@origin/shared/icons';

import type { AlertColor, SvgIconProps } from '@mui/material';

export type SeverityIconProps = {
  severity: AlertColor;
  disablePendingSpin?: boolean;
} & SvgIconProps;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SeverityIcon = ({
  severity,
  disablePendingSpin,
  ...rest
}: SeverityIconProps) => {
  return {
    info: (
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
    warning: (
      <FaCircleExclamationRegular
        {...rest}
        sx={{ color: 'warning.main', fontSize: 20, ...rest?.sx }}
      />
    ),
    error: (
      <FaCircleXmarkRegular
        {...rest}
        sx={{ color: 'error.main', fontSize: 20, ...rest?.sx }}
      />
    ),
    success: (
      <FaCircleCheckRegular
        {...rest}
        sx={{ color: 'success.main', fontSize: 20, ...rest?.sx }}
      />
    ),
  }[severity];
};
