import { useRef, useState } from 'react';

import { Button, MenuItem, Stack, Typography } from '@mui/material';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { not } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';

import { ClickAwayMenu } from '../Menus';

import type { ButtonProps } from '@mui/material';

export const trailingOptions = {
  apy7: defineMessage({ defaultMessage: '7-Day' }),
  apy14: defineMessage({ defaultMessage: '14-Day' }),
  apy30: defineMessage({ defaultMessage: '30-Day' }),
} as const;

export const trailingToDays = {
  apy7: 7,
  apy14: 14,
  apy30: 30,
} as const;

export type Trailing = keyof typeof trailingOptions;

export type TrailingControlsProps = {
  trailing: Trailing;
  setTrailing: (value: Trailing) => void;
} & Omit<ButtonProps, 'ref' | 'onClick'>;

export const TrailingControls = ({
  trailing,
  setTrailing,
  ...rest
}: TrailingControlsProps) => {
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
          <Typography>
            {intl.formatMessage(trailingOptions[trailing])}
          </Typography>
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
        {Object.entries(trailingOptions).map(([trail, label]) => (
          <MenuItem
            key={trail}
            value={trail}
            onClick={() => {
              setTrailing(trail as keyof typeof trailingOptions);
              setOpen(false);
            }}
            sx={[
              ...(trail === trailing
                ? [{ backgroundColor: 'action.selected' }]
                : []),
            ]}
          >
            {intl.formatMessage(label)}
          </MenuItem>
        ))}
      </ClickAwayMenu>
    </>
  );
};
