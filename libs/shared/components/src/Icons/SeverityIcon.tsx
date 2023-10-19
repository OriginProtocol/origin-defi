import { Box } from '@mui/material';

import type { AlertColor, BoxProps } from '@mui/material';

export type SeverityIconProps = {
  severity: AlertColor;
} & BoxProps<'img'>;

const iconPaths: Record<AlertColor, string> = {
  info: '/images/pending.svg',
  warning: '/images/warn.webp',
  error: '/images/failed.svg',
  success: '/images/success.svg',
};

export const SeverityIcon = ({ severity, ...rest }: SeverityIconProps) => {
  return (
    <Box
      width={20}
      {...rest}
      component="img"
      alt={`${severity}-icon`}
      src={iconPaths[severity]}
    />
  );
};
