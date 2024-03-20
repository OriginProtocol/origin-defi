import { useState } from 'react';

import { IconButton } from '@mui/material';
import { FaGearComplexRegular } from '@origin/shared/icons';

import { SettingsPopover } from './SettingsPopover';

import type { ButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';

import type { SettingsPopoverProps } from './SettingsPopover';

export type SettingsButtonProps = {
  iconSize?: number;
  popoverProps?: Omit<SettingsPopoverProps, 'open' | 'onClose' | 'anchorEl'>;
} & ButtonProps;

export const SettingsButton = ({
  iconSize = 16,
  popoverProps,
  onClick,
  ...rest
}: SettingsButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSettingClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
    onClick?.(evt);
  };

  return (
    <>
      <IconButton {...rest} onClick={handleSettingClick}>
        <FaGearComplexRegular sx={{ fontSize: iconSize }} />
      </IconButton>
      <SettingsPopover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        {...popoverProps}
      />
    </>
  );
};
