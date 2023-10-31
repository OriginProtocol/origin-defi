import { useLocalStorageValue } from '@react-hookz/web';

export const useSlippage = () => {
  return useLocalStorageValue('@originprotocol/oeth-slippage', {
    defaultValue: 0.001,
  });
};
