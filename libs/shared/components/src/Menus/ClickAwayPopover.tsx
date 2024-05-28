import { useEffect, useRef } from 'react';

import { Box } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import type { PaperProps } from '@mui/material/Paper';
import type { PopperProps } from '@mui/material/Popper';
import type { Dispatch, MutableRefObject, ReactNode } from 'react';

export type ClickAwayPopoverProps = {
  open: boolean;
  anchorEl: MutableRefObject<HTMLElement | null>;
  onClose: Dispatch<void>;
  popperProps?: Partial<Omit<PopperProps, 'open' | 'anchorEl'>>;
  paperProps?: Partial<PaperProps>;
  children:
    | ReactNode
    | ((onClose: (event: Event | React.SyntheticEvent) => void) => ReactNode);
};

export const ClickAwayPopover = ({
  open,
  anchorEl,
  onClose,
  children,
  popperProps,
  paperProps,
}: ClickAwayPopoverProps) => {
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorEl?.current?.focus();
    }

    prevOpen.current = open;
  }, [anchorEl, open]);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorEl.current &&
      anchorEl.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    onClose();
  };

  return (
    <Popper
      transition
      placement="bottom-end"
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            altBoundary: true,
            rootBoundary: 'document',
            padding: 8,
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            altAxis: true,
            altBoundary: true,
            tether: true,
            rootBoundary: 'document',
            padding: 8,
          },
        },
      ]}
      {...popperProps}
      open={open}
      anchorEl={anchorEl.current}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper elevation={1} {...paperProps}>
            <ClickAwayListener onClickAway={handleClose}>
              <Box>
                {typeof children === 'function'
                  ? children(handleClose)
                  : children}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
