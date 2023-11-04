import { Stack } from '@mui/material';
import { ApyHeader, trackEvent, trackSentryError } from '@origin/ousd/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { Swapper } from '@origin/shared/providers';

import { swapActions } from '../actions';
import { swapRoutes } from '../constants';

export const SwapView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ApyHeader />
      </ErrorBoundary>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <Swapper
          swapActions={swapActions}
          swapRoutes={swapRoutes}
          onError={trackSentryError}
          trackEvent={trackEvent}
        />
      </ErrorBoundary>
    </Stack>
  );
};
