import { trackEvent, trackSentryError } from '@origin/ousd/shared';
import { Swapper } from '@origin/shared/providers';

import { swapActions } from '../actions';
import { swapRoutes } from '../constants';

export const SwapView = () => {
  return (
    <Swapper
      swapActions={swapActions}
      swapRoutes={swapRoutes}
      trackEvent={trackEvent}
      onError={trackSentryError}
    />
  );
};
