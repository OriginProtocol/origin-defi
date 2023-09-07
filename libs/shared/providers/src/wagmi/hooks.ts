import { useMemo } from 'react';

import { usePublicClient, useWalletClient } from 'wagmi';

import { publicClientToProvider, walletClientToSigner } from './utils';

export const useEthersProvider = ({ chainId }: { chainId?: number } = {}) => {
  const publicClient = usePublicClient({ chainId });

  return useMemo(() => publicClientToProvider(publicClient), [publicClient]);
};

export const useEthersSigner = ({ chainId }: { chainId?: number } = {}) => {
  const { data: walletClient } = useWalletClient({ chainId });

  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  );
};
