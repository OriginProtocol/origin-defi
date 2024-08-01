import { Stack } from '@mui/material';
import { Footer, Topnav, trackSentryError } from '@origin/ledger/shared';
import { SwapView } from '@origin/ledger/swap';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';

export const App = () => {
  return (
    <>
      <Topnav />
      <Stack
        sx={{
          width: 1,
          minWidth: 370,
          px: 3,
          pt: { xs: 3, md: 6 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ErrorBoundary
          ErrorComponent={<ErrorPage height={1} width={1} />}
          onError={trackSentryError}
        >
          <SwapView sx={{ maxWidth: 600 }} />
        </ErrorBoundary>
      </Stack>
      <Footer
        sx={{
          position: 'fixed',
          bottom: 36,
          left: { xs: 16, md: 36 },
          width: 1,
        }}
      />
    </>
  );
};
