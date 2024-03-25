import { bridgeStateContainer, getDefaultState } from './state';

export const useResetBridgeState = () => {
  const setState = bridgeStateContainer.useUpdate();
  const defaultState = getDefaultState();
  return () => setState(defaultState);
};
