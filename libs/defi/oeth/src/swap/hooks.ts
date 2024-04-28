import { groupBy } from 'ramda';
import { mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

import { supportedChainTokens } from './constants';

export const useSupportedChainTokens = () => {
  const { chain } = useAccount();

  const id = chain?.id ?? mainnet?.id;
  const { connected, disconnected } = groupBy(
    (t) => (t.chainId === id ? 'connected' : 'disconnected'),
    supportedChainTokens,
  );

  return { connected: connected?.[0] ?? supportedChainTokens[0], disconnected };
};
