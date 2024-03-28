import { useState } from 'react';

import { Button } from '@mui/material';
import { ActivityIcon } from '@origin/shared/components';

import { useActivitiesStatus } from '../hooks';
import { ActivityPopover } from './ActivityPopover';

import type { ButtonProps } from '@mui/material';
import type { MouseEvent, ReactNode } from 'react';

export type ActivityButtonProps = {
  activityIcon?: ReactNode;
  iconSize?: number;
} & Omit<ButtonProps, 'children'>;

export const ActivityButton = ({
  activityIcon,
  iconSize = 24,
  ...rest
}: ActivityButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const status = useActivitiesStatus();

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    rest?.onClick?.(evt);
    setAnchorEl(evt.currentTarget);
  };

  return (
    <>
      <Button
        {...rest}
        sx={{
          svg: {
            height: iconSize,
            width: iconSize,
          },
          ...rest?.sx,
        }}
        onClick={handleClick}
      >
        <ActivityIcon status={status} iconMapping={{ idle: activityIcon }} />
      </Button>
      <ActivityPopover anchor={anchorEl} setAnchor={setAnchorEl} />
    </>
  );
};
