import { CircularProgress } from '@mui/material';
import {
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleInfoRegular,
  FaCircleXmarkRegular,
} from '@origin/shared/icons';

import type { AlertColor, SvgIconProps } from '@mui/material';

export type SeverityIconProps = {
  severity: AlertColor | string;
  size?: number;
} & SvgIconProps;

export const SeverityIcon = ({
  severity,
  size = 16,
  ...rest
}: SeverityIconProps) => {
  return {
    info: (
      <FaCircleInfoRegular
        sx={{ color: 'primary.main', fontSize: size, ...rest?.sx }}
      />
    ),
    warning: (
      <FaCircleExclamationRegular
        {...rest}
        sx={{ color: 'warning.main', fontSize: size, ...rest?.sx }}
      />
    ),
    error: (
      <FaCircleXmarkRegular
        {...rest}
        sx={{ color: 'error.main', fontSize: size, ...rest?.sx }}
      />
    ),
    success: (
      <FaCircleCheckRegular
        {...rest}
        sx={{ color: 'success.main', fontSize: size, ...rest?.sx }}
      />
    ),
    pending: <CircularProgress color="primary" size={size} />,
  }[severity];
};
