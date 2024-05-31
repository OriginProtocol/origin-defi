import { useEffect, useRef } from 'react';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import type { MenuListProps } from '@mui/material/MenuList';
import type { PaperProps } from '@mui/material/Paper';
import type { PopperProps } from '@mui/material/Popper';
import type {
  Dispatch,
  KeyboardEvent,
  MutableRefObject,
  ReactNode,
} from 'react';

export type ClickAwayMenuProps = {
  open: boolean;
  anchorEl: MutableRefObject<HTMLElement | null>;
  onClose: Dispatch<void>;
  popperProps?: Partial<Omit<PopperProps, 'open' | 'anchorEl'>>;
  menuListProps?: Partial<MenuListProps>;
  paperProps?: Partial<PaperProps>;
  children:
    | ReactNode
    | ((onClose: (event: Event | React.SyntheticEvent) => void) => ReactNode);
};

export const ClickAwayMenu = ({
  open,
  anchorEl,
  onClose,
  children,
  popperProps,
  menuListProps,
  paperProps,
}: ClickAwayMenuProps) => {
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

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
    if (menuListProps?.onKeyDown) {
      menuListProps.onKeyDown(event);
    }
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
          <Paper
            elevation={1}
            {...paperProps}
            sx={{
              padding: 2,
              ...paperProps?.sx,
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                {...menuListProps}
                onKeyDown={handleListKeyDown}
                sx={{ py: 0, ...menuListProps?.sx }}
              >
                {typeof children === 'function'
                  ? children(handleClose)
                  : children}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
