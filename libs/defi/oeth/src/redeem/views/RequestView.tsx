import { Stack } from '@mui/material';
import { trackEvent, trackSentryError } from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { redeemActions } from '../actions';
import { Swapper } from '../components/Swapper';
import { redeemRoutes } from '../constants';

export const RequestView = () => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
      }}
    >
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <Swapper
          swapActions={redeemActions}
          swapRoutes={redeemRoutes}
          onError={trackSentryError}
          trackEvent={trackEvent}
          sx={{ width: 1, maxWidth: 605 }}
        />
      </ErrorBoundary>
    </Stack>
  );
};
