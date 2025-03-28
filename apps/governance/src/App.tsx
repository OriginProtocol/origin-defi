import { Container, Stack } from '@mui/material';
import {
  trackEvent,
  trackPage,
  trackSentryError,
} from '@origin/governance/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { TrackingProvider } from '@origin/shared/providers';
import { Outlet } from 'react-router';

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
        <Stack
          sx={{
            minWidth: 370,
          }}
        >
          <Topnav />
          <Container
            sx={{
              mt: 3,
              mb: 10,
            }}
            maxWidth="lg"
          >
            <Outlet />
          </Container>
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
