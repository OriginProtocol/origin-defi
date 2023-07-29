import { IconButton, Stack } from '@mui/material';
import { SwapCard } from '@origin/shared/components';
import { useState } from 'react';
import { GasPopover } from './GasPopover';
import { useIntl } from 'react-intl';

export function Swap() {
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  return (
    <>
      <SwapCard
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            Swap
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <img src="https://app.oeth.com/images/settings-icon.svg" />
            </IconButton>
          </Stack>
        }
        baseTokenIcon="https://app.oeth.com/images/currency/oeth-icon-small.svg"
        baseTokenName={intl.formatMessage({ defaultMessage: 'OETH' })}
        exchangeTokenName="ETH"
        exchangeTokenIcon="https://app.oeth.com/images/currency/eth-icon-small.svg"
      />
      <GasPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
}
