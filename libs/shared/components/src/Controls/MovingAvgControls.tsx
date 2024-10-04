import { useRef, useState } from 'react';

import { Button, MenuItem, Stack, Typography } from '@mui/material';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { not } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';

import { ClickAwayMenu } from '../Menus';

import type { ButtonProps } from '@mui/material';

const maOptions = {
  feesMovingAvg7Days: defineMessage({ defaultMessage: '7-Day MA' }),
  feesMovingAvg30Days: defineMessage({ defaultMessage: '30-Day MA' }),
};

export type MovingAvg = keyof typeof maOptions;

export type MovingAvgControlsProps = {
  ma: MovingAvg;
  setMa: (value: MovingAvg) => void;
} & Omit<ButtonProps, 'ref' | 'onClick'>;

export const MovingAvgControls = ({
  ma,
  setMa,
  ...rest
}: MovingAvgControlsProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        ref={anchorEl}
        onClick={() => {
          setOpen(not);
        }}
        {...rest}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography>{intl.formatMessage(maOptions[ma])}</Typography>
          <FaChevronDownRegular sx={{ fontSize: 12 }} />
        </Stack>
      </Button>
      <ClickAwayMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        paperProps={{ sx: { p: 0 } }}
      >
        {Object.entries(maOptions).map(([avg, label]) => (
          <MenuItem
            key={avg}
            value={avg}
            onClick={() => {
              setMa(avg as keyof typeof maOptions);
              setOpen(false);
            }}
            sx={[
              ...(avg === ma ? [{ backgroundColor: 'action.selected' }] : []),
            ]}
          >
            {intl.formatMessage(label)}
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  );
};
