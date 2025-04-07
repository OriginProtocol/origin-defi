import { Stack } from '@mui/material';
import { trackSentryError } from '@origin/marketing/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { Outlet } from 'react-router';

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
        <Outlet />
      </Stack>
    </ErrorBoundary>
  );
};
