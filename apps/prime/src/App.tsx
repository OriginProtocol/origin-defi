import { Container, Stack, useMediaQuery, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  AdCards,
  AssetDepositedCard,
  GlobalStatsCard,
  InviteCard,
  trackEvent,
  trackPage,
  trackSentryError,
} from '@origin/prime/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { TrackingProvider, useReferrerTracker } from '@origin/shared/providers';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  useReferrerTracker('Origin');

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
          <Container maxWidth="xl" sx={{ pt: 3 }}>
            <Grid2 container spacing={{ xs: 3, md: 6 }}>
              <Grid2
                xs={0}
                md={3}
                height={1}
                display={{ xs: 'none', md: 'block' }}
              >
                <InviteCard mb={3} />
                <AdCards />
              </Grid2>
              <Grid2
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '>*': {
                    maxWidth: 520,
                  },
                }}
              >
                <Outlet />
              </Grid2>
              <Grid2 xs={12} md={3}>
                <Stack spacing={3}>
                  {isSm && <InviteCard mt={3} />}
                  <GlobalStatsCard />
                  <AssetDepositedCard />
                </Stack>
              </Grid2>
            </Grid2>
          </Container>
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
