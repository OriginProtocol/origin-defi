import { bridgeStateContainer, useDefaultState } from './state';

export const useResetBridgeState = () => {
  const [, setState] = bridgeStateContainer.useTracked();
  const defaultState = useDefaultState();
  return () => setState(defaultState);
};
