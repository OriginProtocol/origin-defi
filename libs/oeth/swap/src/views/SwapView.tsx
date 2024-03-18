import { Container, Stack } from '@mui/material';
import { ApyHeader, trackEvent, trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { Swapper } from '@origin/shared/providers';
import { RequireChain } from '@origin/shared/providers';
import { mainnet } from 'viem/chains';

import { swapActions } from '../actions';
import { swapRoutes } from '../constants';

export const SwapView = () => {
  return (
    <Container
      sx={{
        mt: 3,
        mb: 10,
      }}
      maxWidth="sm"
    >
      <RequireChain sectionName={'Swap'} chain={mainnet}>
        <Stack spacing={3}>
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            <ApyHeader />
          </ErrorBoundary>
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            <Swapper
              swapActions={swapActions}
              swapRoutes={swapRoutes}
              onError={trackSentryError}
              trackEvent={trackEvent}
              buttonsProps={{ variant: 'action' }}
            />
          </ErrorBoundary>
        </Stack>
      </RequireChain>
    </Container>
  );
};
