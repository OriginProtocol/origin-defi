import { tooltipClasses } from '@mui/material';

import { TooltipLabel } from './TooltipLabel';

import type { ReactNode } from 'react';

import type { TooltipLabelProps } from './TooltipLabel';

export type ErrorTooltipLabelProps = {
  children: ReactNode;
  lineClamp?: number;
} & Omit<TooltipLabelProps, 'children'>;

export const ErrorTooltipLabel = ({
  children,
  maxChars = 41,
  lineClamp = 1,
  ...rest
}: ErrorTooltipLabelProps) => {
  return (
    <TooltipLabel
      color="error"
      {...rest}
      maxChars={maxChars}
      tooltipProps={{
        PopperProps: {
          sx: {
            [`& .${tooltipClasses.tooltip}`]: {
              color: 'text.primary',
              p: 2,
              minWidth: 370,
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
            },
          },
        },
      }}
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lineClamp,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...rest?.sx,
      }}
    >
      {children}
    </TooltipLabel>
  );
};
