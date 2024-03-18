import { getTokenPriceKey, useTokenPrices } from '@origin/shared/providers';
import { uniq } from 'ramda';

import { bridgeStateContainer } from './state';

export const useBridgePrices = () => {
  const [state] = bridgeStateContainer.useTracked();
  return useTokenPrices(
    uniq([
      getTokenPriceKey(state.dstToken, 'USD'),
      getTokenPriceKey(state.srcToken, 'USD'),
    ]),
  );
};
