import { useRef, useState } from 'react';

import { Stack } from '@mui/material';
import { OriginLabel } from '@origin/shared/icons';
import { OpenAccountModalButton } from '@origin/shared/providers';
import { useAccount } from 'wagmi';

import { AccountPopover } from '../AccountPopover';

import type { StackProps } from '@mui/material';

export const Topnav = (props: StackProps) => {
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  return (
    <>
      <Stack
        {...props}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={{ xs: 2, md: 4 }}
        pt={2}
      >
        <OriginLabel sx={{ width: 120, height: 36 }} />
        <OpenAccountModalButton
          ref={anchorEl}
          onClick={() => {
            if (isConnected) {
              setOpen(true);
            }
          }}
          sx={{ px: 2 }}
          connectedProps={{ color: 'secondary' }}
          disconnectedProps={{
            color: 'primary',
            sx: { '&&&': { minWidth: 80, borderRadius: 2 } },
          }}
          hideWrongNetwork
        />
      </Stack>
      <AccountPopover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
