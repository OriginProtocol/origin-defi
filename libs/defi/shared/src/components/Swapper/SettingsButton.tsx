import { useRef, useState } from 'react';

import { Button, Stack } from '@mui/material';
import { ClickAwayPopover } from '@origin/shared/components';
import { FaGearComplexRegular } from '@origin/shared/icons';
import { SlippageFormControl } from '@origin/shared/providers';

import { trackEvent } from '../../clients';

import type { ButtonProps } from '@mui/material';

export type SettingsButtonProps = {
  iconSize?: number;
} & Omit<ButtonProps, 'onClick' | 'children'>;

export const SettingsButton = ({
  iconSize = 16,
  ...rest
}: SettingsButtonProps) => {
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  const handleSlippageChange = (val: number) => {
    trackEvent?.({
      name: 'change_price_tolerance',
      price_tolerance: val,
    });
  };

  return (
    <>
      <Button
        {...rest}
        ref={anchorEl}
        onClick={() => {
          setOpen(true);
        }}
      >
        <FaGearComplexRegular
          sx={{ fontSize: iconSize, color: 'text.secondary' }}
        />
      </Button>
      <ClickAwayPopover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Stack>
          <SlippageFormControl onChange={handleSlippageChange} />
        </Stack>
      </ClickAwayPopover>
    </>
  );
};
