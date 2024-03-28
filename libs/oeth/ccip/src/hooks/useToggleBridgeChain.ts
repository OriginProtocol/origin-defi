import { useCallback } from 'react';

import { useBridgeState } from '../state';

export const useToggleBridgeChain = () => {
  const [, setState] = useBridgeState();
  return useCallback(() => {
    setState((state) => ({
      ...state,
      srcChain: state.dstChain,
      srcToken: state.dstToken,
      dstChain: state.srcChain,
      dstToken: state.srcToken,
      approval: undefined,
    }));
  }, [setState]);
};
