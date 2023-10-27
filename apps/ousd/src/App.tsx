import { Container, Stack } from '@mui/material';
import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { TrackingProvider } from '@origin/shared/providers';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
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
