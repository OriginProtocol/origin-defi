import { bridgeStateContainer, defaultState } from './state';

export const useResetBridgeState = () => {
  const [, setState] = bridgeStateContainer.useTracked();
  return () => setState(defaultState);
};
