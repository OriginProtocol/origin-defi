import { Container, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  PrimeETHStatsCard,
  trackEvent,
  trackPage,
  trackSentryError,
} from '@origin/prime/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { TrackingProvider } from '@origin/shared/providers';
import { Outlet } from 'react-router-dom';

import { LeftDrawer } from './components/LeftDrawer';
import { Topnav } from './components/Topnav';

export const App = () => {
  return (
    <ErrorBoundary
      ErrorComponent={<ErrorPage height={1} width={1} />}
      onError={trackSentryError}
    >
      <TrackingProvider
        onPageChange={trackPage}
        onWalletConnect={(connect_address, connect_wallet) => {
          trackEvent({ name: 'connect', connect_address, connect_wallet });
        }}
      >
        <Stack minWidth={370} mb={5}>
          <Topnav />
          <Container maxWidth="xl">
            <Grid2 container spacing={3} disableEqualOverflow>
              <Grid2 xs={0} sm={3} height={{ xs: 0, sm: 1 }}>
                <LeftDrawer />
              </Grid2>
              <Grid2 xs={12} sm={9} md={6}>
                <Outlet />
              </Grid2>
              <Grid2 xs={12} sm={9} md={3} smOffset={3} mdOffset={0}>
                <Stack>
                  <PrimeETHStatsCard />
                </Stack>
              </Grid2>
            </Grid2>
          </Container>
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
