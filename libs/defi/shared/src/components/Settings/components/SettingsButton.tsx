import { useRef, useState } from 'react';

import { Button, Typography } from '@mui/material';
import { FaGearComplexRegular } from '@origin/shared/icons';
import { useSlippage, WARNING_THRESHOLD } from '@origin/shared/providers';
import { not } from 'ramda';
import { useIntl } from 'react-intl';

import { SettingsPopover } from './SettingsPopover';

export const SettingsButton = () => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { value } = useSlippage();

  return (
    <>
      <Button
        ref={ref}
        onClick={() => {
          setOpen(not);
        }}
        variant="outlined"
        color={value > WARNING_THRESHOLD ? 'warning' : 'secondary'}
        sx={[
          {
            borderRadius: 25,
            gap: 1,
          },
          value > WARNING_THRESHOLD && {
            backgroundColor: 'warning.faded',
          },
        ]}
      >
        <Typography
          variant="body3"
          sx={{
            color:
              value > WARNING_THRESHOLD ? 'warning.dark' : 'text.secondary',
          }}
        >
          {intl.formatMessage(
            { defaultMessage: '{slippage} slippage' },
            {
              slippage: intl.formatNumber(value, {
                style: 'percent',
                maximumFractionDigits: 2,
              }),
            },
          )}
        </Typography>
        <FaGearComplexRegular sx={{ fontSize: 20, color: 'text.secondary' }} />
      </Button>
      <SettingsPopover
        anchorEl={ref}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
