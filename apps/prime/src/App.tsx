import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import {
  AdCards,
  AssetDepositedCard,
  GlobalStatsCard,
  InviteCard,
  trackEvent,
  trackPage,
  trackSentryError,
} from '@origin/prime/shared';
import { ErrorBoundary, ErrorCard, ErrorPage } from '@origin/shared/components';
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              px: { xs: 2, md: 3 },
              alignItems: 'start',
              gap: { xs: 8, sm: 0 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                width: 1,
                maxWidth: '250px',
              }}
            >
              <InviteCard mb={3} />
              <AdCards />
            </Box>
            <Box
              sx={{
                flexBasis: 'auto',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                px: { sm: 8 },
              }}
            >
              <Outlet />
            </Box>
            <Box
              sx={{
                width: { sm: '250px' },
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                pb: 12,
              }}
            >
              <Stack spacing={3}>
                {isSm && <InviteCard mt={3} />}
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <GlobalStatsCard />
                </ErrorBoundary>
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <AssetDepositedCard />
                </ErrorBoundary>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
