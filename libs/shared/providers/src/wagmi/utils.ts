import type { Token } from '@origin/shared/contracts';
import type { Config } from '@wagmi/core';

export const isNativeCurrency = (token: Token | undefined | null) =>
  Boolean(token && token.address === undefined);

export const getChain = (config: Config, chainId: number) => {
  return config.chains.find((c) => c.id === chainId);
};
