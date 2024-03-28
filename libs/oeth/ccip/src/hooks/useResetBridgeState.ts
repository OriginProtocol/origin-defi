import { getDefaultState, useBridgeState } from '../state';

export const useResetBridgeState = () => {
  const [, setState] = useBridgeState();
  const defaultState = getDefaultState();
  return () => setState(defaultState);
};
