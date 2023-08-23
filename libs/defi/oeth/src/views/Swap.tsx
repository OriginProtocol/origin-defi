import { Stack } from '@mui/material';

import { APY, Swap } from '../components';

export function SwapView() {
  return (
    <>
      <APY
        value={6.71}
        balance={0}
        pendingYield={0}
        earnings={0}
        tokenIcon="https://app.oeth.com/images/oeth.svg"
      />

      <Stack gap={3} mt={3}>
        <Swap />
      </Stack>
    </>
  );
}
