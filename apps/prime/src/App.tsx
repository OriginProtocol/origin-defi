import { Stack } from '@mui/material';
import { trackEvent, trackPage, trackSentryError } from '@origin/prime/shared';
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
          <Stack direction="row">
            <LeftDrawer />
            <Outlet />
          </Stack>
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
