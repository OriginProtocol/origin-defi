import { Container, Stack } from '@mui/material';
import { trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { Outlet } from 'react-router';

import { Topnav } from './components/Topnav';

export const App = () => {
  return (
    <ErrorBoundary
      ErrorComponent={<ErrorPage height={1} width={1} />}
      onError={trackSentryError}
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
    </ErrorBoundary>
  );
};
