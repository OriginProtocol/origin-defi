import { useState } from 'react';

import { IconButton } from '@mui/material';
import { ActivityIcon } from '@origin/shared/components';

import { useGlobalStatus } from '../hooks';
import { ActivityPopover } from './ActivityPopover';

import type { IconButtonProps } from '@mui/material';

export const ActivityButton = (
  props: Omit<IconButtonProps, 'children' | 'onClick'>,
) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const status = useGlobalStatus();

  return (
    <>
      <IconButton
        {...props}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          img: {
            height: 24,
            width: 24,
          },
          ...props?.sx,
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <ActivityIcon status={status} />
      </IconButton>
      <ActivityPopover anchor={anchorEl} setAnchor={setAnchorEl} />
    </>
  );
};
