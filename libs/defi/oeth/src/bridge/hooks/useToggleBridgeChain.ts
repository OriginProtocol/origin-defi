import { useCallback } from 'react';

import { tokenPaths, useBridgeState } from '../state';

export const useToggleBridgeChain = () => {
  const [, setState] = useBridgeState();
  return useCallback(() => {
    setState((state) => {
      const { srcTokens, dstTokens } =
        tokenPaths[state.dstChain.id][state.srcChain.id];
      return {
        ...state,
        srcChain: state.dstChain,
        srcToken: srcTokens.find((t) => t.address === state.dstToken.address)
          ? state.dstToken
          : srcTokens[0],
        srcTokens,
        dstChain: state.srcChain,
        dstToken: dstTokens.find((t) => t.address === state.srcToken.address)
          ? state.srcToken
          : dstTokens[0],
        dstTokens,
      };
    });
  }, [setState]);
};
