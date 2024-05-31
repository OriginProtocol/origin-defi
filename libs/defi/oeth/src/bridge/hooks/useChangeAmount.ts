import { useCallback } from 'react';

import { useBridgeState } from '../state';

export const useChangeAmount = () => {
  const [, setState] = useBridgeState();
  return useCallback(
    (amount: bigint) => {
      setState((state) => ({
        ...state,
        amount,
      }));
    },
    [setState],
  );
};
