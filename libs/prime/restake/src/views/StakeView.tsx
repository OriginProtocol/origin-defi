import { trackEvent } from '@origin/prime/shared';

import { restakeActions } from '../actions';
import { Swapper } from '../components/Swapper';
import { restakeRoutes } from '../constants';

export const StakeView = () => {
  return (
    <Swapper
      swapRoutes={restakeRoutes}
      swapActions={restakeActions}
      trackEvent={trackEvent}
    />
  );
};
