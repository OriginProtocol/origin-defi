import { Tooltip, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { TooltipProps, TypographyProps } from '@mui/material';

export type TooltipLabelProps = {
  maxChars?: number;
  tooltipProps?: TooltipProps;
} & TypographyProps;

export const TooltipLabel = ({
  maxChars = 10,
  children,
  tooltipProps,
  ...rest
}: TooltipLabelProps) => {
  if (isNilOrEmpty(children)) {
    return null;
  }

  if (typeof children !== 'string' || children.length <= maxChars) {
    return <Typography {...rest}>{children}</Typography>;
  }

  return (
    <Tooltip title={children} {...tooltipProps}>
      <Typography {...rest}>{children}</Typography>
    </Tooltip>
  );
};
