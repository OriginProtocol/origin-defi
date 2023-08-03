import { Box, Button, Stack } from '@mui/material';
import { APY, Portfolio, Swap } from '../components';
import { ConnectWallet } from '../components/shared';
import { WidgetContainer } from '@origin/shared/components';

export function SwapView() {
  return (
    <>
      <WidgetContainer>
        <APY />
        <Portfolio />
      </WidgetContainer>
      <Stack gap={3} mt={3}>
        <Swap />
        <ConnectWallet />
      </Stack>
    </>
  );
}
