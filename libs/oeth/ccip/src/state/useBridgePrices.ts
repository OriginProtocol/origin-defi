import { getTokenPriceKey, useTokenPrices } from '@origin/shared/providers';
import { uniq } from 'ramda';

import { bridgeStateContainer } from './state';

export const useBridgePrices = () => {
  const [state] = bridgeStateContainer.useTracked();
  const result = useTokenPrices(
    uniq([
      getTokenPriceKey(state.dstToken, 'USD'),
      getTokenPriceKey(state.srcToken, 'USD'),
    ]),
  );
  const srcPrice = result.data?.[getTokenPriceKey(state.srcToken)];
  const dstPrice = result.data?.[getTokenPriceKey(state.dstToken)];
  return {
    isLoading: result.isLoading,
    isError: result.isError,
    srcPrice,
    dstPrice,
  };
};
