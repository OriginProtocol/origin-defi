import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  AdCards,
  GlobalStatsCard,
  trackEvent,
  trackPage,
  trackSentryError,
  YNBanner,
} from '@origin/prime/shared';
import { ErrorBoundary, ErrorCard, ErrorPage } from '@origin/shared/components';
import { TrackingProvider, useReferrerTracker } from '@origin/shared/providers';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
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
          <YNBanner />
          <Topnav />
          <Box px={{ xs: 2, md: 4 }}>
            <Grid2 container spacing={4}>
              <Grid2 xs={12} md={3} sx={{ order: { xs: 2, md: 1 } }}>
                <AdCards
                  sx={{
                    gap: 3,
                    maxWidth: { xs: 1, md: 250 },
                    flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                  }}
                />
              </Grid2>
              <Grid2 xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                <Outlet />
              </Grid2>
              <Grid2 xs={12} md={3} sx={{ order: 3 }}>
                <Stack alignItems="flex-end">
                  <ErrorBoundary
                    ErrorComponent={<ErrorCard />}
                    onError={trackSentryError}
                  >
                    <GlobalStatsCard
                      sx={{ width: 1, maxWidth: { xs: 1, md: 250 } }}
                    />
                  </ErrorBoundary>
                </Stack>
              </Grid2>
            </Grid2>
          </Box>
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
