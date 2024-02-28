import { getAccount } from '@wagmi/core';
import { mainnet } from 'viem/chains';

import type { Token } from '@origin/shared/contracts';
import type { Config } from '@wagmi/core';

export const isNativeCurrency = (
  config: Config,
  token: Token | undefined | null,
) => {
  const { chain } = getAccount(config);

  return (
    !!token?.symbol &&
    token.symbol ===
      (chain?.nativeCurrency?.symbol ?? mainnet.nativeCurrency.symbol)
  );
};
