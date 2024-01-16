import { keyframes, SvgIcon, useTheme } from '@mui/material';
import { Pending } from '@origin/shared/icons';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import { RiErrorWarningLine } from 'react-icons/ri';

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
  const theme = useTheme();

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
      <SvgIcon {...rest}>
        <RiErrorWarningLine color={theme.palette.warning.main} fontSize={20} />
      </SvgIcon>
    ),
    error: (
      <SvgIcon {...rest}>
        <IoCloseCircle color={theme.palette.error.main} fontSize={20} />
      </SvgIcon>
    ),
    success: (
      <SvgIcon {...rest}>
        <FaCircleCheck color={theme.palette.success.main} fontSize={20} />
      </SvgIcon>
    ),
  }[severity];
};
