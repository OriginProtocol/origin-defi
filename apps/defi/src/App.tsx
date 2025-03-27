import { Stack } from '@mui/material';
import { Topnav, trackEvent, trackSentryError } from '@origin/defi/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { TrackingProvider } from '@origin/shared/providers';
import { Outlet } from 'react-router';

import { routes } from './routes';

export const App = () => {
  return (
    <ErrorBoundary
      ErrorComponent={<ErrorPage height={1} width={1} />}
      onError={trackSentryError}
    >
      <TrackingProvider
        onWalletConnect={(connect_address, connect_wallet) => {
          trackEvent({ name: 'connect', connect_address, connect_wallet });
        }}
      >
        <Stack
          sx={{
            minWidth: 370,
          }}
        >
          <Topnav routes={routes} />
          <Outlet />
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
