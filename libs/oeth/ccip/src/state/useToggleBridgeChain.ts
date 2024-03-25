import { useCallback } from 'react';

import { bridgeStateContainer } from './state';

export const useToggleBridgeChain = () => {
  const setState = bridgeStateContainer.useUpdate();
  return useCallback(() => {
    setState((state) => ({
      ...state,
      srcChain: state.dstChain,
      srcToken: state.dstToken,
      dstChain: state.srcChain,
      dstToken: state.srcToken,
    }));
  }, [setState]);
};
