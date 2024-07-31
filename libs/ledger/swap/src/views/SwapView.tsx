import { Swapper, trackEvent } from '@origin/ledger/shared';

import { oethSwapActions } from '../actions';
import { oethSwapRoutes } from '../constants';

import type { SwapperProps } from '@origin/ledger/shared';

export const SwapView = (
  props: Omit<
    SwapperProps,
    'swapActions' | 'swapRoutes' | 'buttonsProps' | 'trackEvent'
  >,
) => {
  return (
    <Swapper
      {...props}
      swapActions={oethSwapActions}
      swapRoutes={oethSwapRoutes}
      buttonsProps={{ variant: 'action' }}
      trackEvent={trackEvent}
    />
  );
};
