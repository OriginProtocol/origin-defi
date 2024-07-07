import { getTokenPriceKey, useTokenPrices } from '@origin/shared/providers';
import { from } from 'dnum';
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
  const srcPrice = result.data?.[getTokenPriceKey(state.srcToken)] ?? from(0);
  const dstPrice = result.data?.[getTokenPriceKey(state.dstToken)] ?? from(0);

  return {
    isLoading: result.isLoading,
    isError: result.isError,
    srcPrice,
    dstPrice,
  };
};
