import { useCallback } from 'react';

import { defaultState, useBridgeState } from '../state';

import type { BridgeState } from '../state';

export const useResetBridgeState = () => {
  const [, setState] = useBridgeState();

  return useCallback(
    (partial?: Partial<BridgeState>) => {
      setState({ ...defaultState, ...partial });
    },
    [setState],
  );
};
