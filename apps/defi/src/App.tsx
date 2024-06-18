import { Stack } from '@mui/material';
import {
  RebasingBanner,
  trackEvent,
  trackPage,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { TrackingProvider } from '@origin/shared/providers';
import { Outlet } from 'react-router-dom';

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
        <Stack minWidth={370}>
          <Topnav />
          <RebasingBanner token={tokens.mainnet.OETH} />
          <Outlet />
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
