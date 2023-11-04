import { useLocalStorageValue } from '@react-hookz/web';

export const useSlippage = (key = 'dapp') => {
  return useLocalStorageValue(`@originprotocol/${key}-slippage`, {
    defaultValue: 0.001,
  });
};
