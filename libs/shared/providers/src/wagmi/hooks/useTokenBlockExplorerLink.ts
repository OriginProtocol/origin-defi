import { useConfig } from 'wagmi';

import { getChain, isNativeCurrency } from '../utils';

import type { Token } from '@origin/shared/contracts';

export const useTokenBlockExplorerLink = (token: Token) => {
  const config = useConfig();

  const chain = getChain(config, token.chainId);

  if (isNativeCurrency(token)) {
    return chain?.blockExplorers?.default?.url;
  }

  return `${chain?.blockExplorers?.default?.url}/token/${token.address}`;
};
