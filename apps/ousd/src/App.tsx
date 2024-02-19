import { Container, Stack } from '@mui/material';
import { trackSentryError } from '@origin/ousd/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import {
  TrackingProvider,
  useCurve,
  useTxTracker,
} from '@origin/shared/providers';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
  useCurve();
  useTxTracker('ousd.com');

  return (
    <ErrorBoundary
      ErrorComponent={<ErrorPage height={1} width={1} />}
      onError={trackSentryError}
    >
      <TrackingProvider>
        <Stack minWidth={370}>
          <Topnav />
          <Container
            sx={{
              mt: 3,
              mb: 10,
            }}
            maxWidth="sm"
          >
            <Outlet />
          </Container>
        </Stack>
      </TrackingProvider>
    </ErrorBoundary>
  );
};
