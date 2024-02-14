import { useLocalStorageValue } from '@react-hookz/web';

export const useSlippage = (key = 'dapp') => {
  return useLocalStorageValue<number, number, true>(
    `@originprotocol/${key}-slippage`,
    {
      defaultValue: 0.001,
    },
  );
};
