import { getTokenPriceKey, useTokenPrices } from '@origin/shared/providers';
import { uniq } from 'ramda';

import { useBridgeState } from '../state';

export const useBridgePrices = () => {
  const [state] = useBridgeState();
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
