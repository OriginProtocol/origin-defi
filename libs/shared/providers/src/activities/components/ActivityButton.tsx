import { useState } from 'react';

import { IconButton } from '@mui/material';
import { ActivityIcon } from '@origin/shared/components';

import { useGlobalStatus } from '../hooks';
import { ActivityPopover } from './ActivityPopover';

import type { IconButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';

export const ActivityButton = (props: Omit<IconButtonProps, 'children'>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const status = useGlobalStatus();

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (props?.onClick) {
      props.onClick(evt);
    }
    setAnchorEl(evt.currentTarget);
  };

  return (
    <>
      <IconButton
        {...props}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          svg: {
            height: 24,
            width: 24,
          },
          ...props?.sx,
        }}
        onClick={handleClick}
      >
        <ActivityIcon status={status} />
      </IconButton>
      <ActivityPopover anchor={anchorEl} setAnchor={setAnchorEl} />
    </>
  );
};
