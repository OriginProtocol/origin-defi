import { Tooltip, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { TooltipProps, TypographyProps } from '@mui/material';

export type TooltipLabelProps = {
  maxChars?: number;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
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

  const strLength = Array.isArray(children)
    ? children.filter((c) => typeof c === 'string').join('').length
    : (children?.toString().length ?? 0);

  if (strLength <= maxChars) {
    return <Typography {...rest}>{children}</Typography>;
  }

  return (
    <Tooltip title={children} {...tooltipProps}>
      <Typography {...rest}>{children}</Typography>
    </Tooltip>
  );
};
