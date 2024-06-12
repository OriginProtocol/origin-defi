import { useRef, useState } from 'react';

import { SvgIcon, Tooltip, Typography } from '@mui/material';
import { CircleInfo } from '@origin/shared/icons';
import { isTouchScreen } from '@origin/shared/utils';
import { not } from 'ramda';

import { ClickAwayPopover } from '../Menus';

import type { SvgIconProps, TooltipProps } from '@mui/material';
import type { ReactNode } from 'react';

export type InfoTooltipProps = {
  tooltipLabel: ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  iconSize?: number;
  iconColor?: string;
} & SvgIconProps;

export function InfoTooltip(props: InfoTooltipProps) {
  const {
    tooltipLabel,
    tooltipProps,
    iconSize = 14,
    iconColor = 'text.secondary',
    ...rest
  } = props;

  if (isTouchScreen()) {
    return <InfoPopover {...props} />;
  }

  return (
    <Tooltip
      {...tooltipProps}
      title={
        <Typography color="text.secondary" variant="body2">
          {tooltipLabel}
        </Typography>
      }
    >
      <SvgIcon
        {...rest}
        sx={{
          width: iconSize,
          height: iconSize,
          color: iconColor,
          ...rest?.sx,
        }}
      >
        <CircleInfo />
      </SvgIcon>
    </Tooltip>
  );
}

function InfoPopover({
  tooltipLabel,
  tooltipProps,
  iconSize = 14,
  iconColor = 'text.secondary',
  ...rest
}: InfoTooltipProps) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <SvgIcon
        {...rest}
        ref={ref}
        onClick={() => {
          setOpen(not);
        }}
        role="button"
        sx={{
          width: iconSize,
          height: iconSize,
          color: iconColor,
          ...rest?.sx,
        }}
      >
        <CircleInfo />
      </SvgIcon>
      <ClickAwayPopover
        anchorEl={ref}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        paperProps={{ sx: { p: 0.5 } }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: 'small',
          }}
        >
          {tooltipLabel}
        </Typography>
      </ClickAwayPopover>
    </>
  );
}
