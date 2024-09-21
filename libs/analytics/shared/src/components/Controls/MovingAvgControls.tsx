import { useRef, useState } from 'react';

import { Button, MenuItem, Stack, Typography } from '@mui/material';
import { ClickAwayMenu } from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { not } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';

import type { ButtonProps } from '@mui/material';

const maOptions = {
  feesMovingAvg7Days: defineMessage({ defaultMessage: '7-Day MA' }),
  feesMovingAvg30Days: defineMessage({ defaultMessage: '30-Day MA' }),
};

export type MA = keyof typeof maOptions;

export type MaControlsProps = {
  ma: MA;
  setMa: (value: MA) => void;
} & Omit<ButtonProps, 'ref' | 'onClick'>;

export const MAControls = ({ ma, setMa, ...rest }: MaControlsProps) => {
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
              (theme) => ({ typography: theme.typography.body3 }),
              ...(avg === ma ? [{ backgroundColor: 'secondary.main' }] : []),
            ]}
          >
            {intl.formatMessage(label)}
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  );
};
