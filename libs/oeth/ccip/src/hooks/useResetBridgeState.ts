import { useCallback } from 'react';

import { defaultState, useBridgeState } from '../state';

export const useResetBridgeState = () => {
  const [, setState] = useBridgeState();

  return useCallback(() => {
    setState(defaultState);
  }, [setState]);
};
