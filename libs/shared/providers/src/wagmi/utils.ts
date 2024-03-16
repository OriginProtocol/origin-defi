import { getAccount } from '@wagmi/core';
import { mainnet } from 'viem/chains';

import type { Config } from '@wagmi/core';

export const isNativeCurrency = (
  config: Config,
  token: { symbol: string } | undefined | null,
) => {
  const { chain } = getAccount(config);

  return (
    !!token?.symbol &&
    token.symbol ===
      (chain?.nativeCurrency?.symbol ?? mainnet.nativeCurrency.symbol)
  );
};
