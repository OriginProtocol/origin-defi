import { Stack } from '@mui/material';
import { trackSentryError } from '@origin/ledger/shared';
import { SwapView } from '@origin/ledger/swap';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';

export const App = () => {
  return (
    <ErrorBoundary
      ErrorComponent={<ErrorPage height={1} width={1} />}
      onError={trackSentryError}
    >
      <Stack
        minWidth={370}
        px={{ xs: 1, md: 3 }}
        pt={{ xs: 5, md: 10 }}
        alignItems="center"
      >
        <SwapView sx={{ maxWidth: 600 }} />
      </Stack>
    </ErrorBoundary>
  );
};
