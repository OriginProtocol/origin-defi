import { useEffect } from 'react';

import { useSearchParams } from 'react-router';
import { useAccount, useSwitchChain } from 'wagmi';

export const useChainIdListener = () => {
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [search, setSearch] = useSearchParams();

  const chainIdParam = search.get('chainId');

  useEffect(() => {
    try {
      if (chainIdParam && Number(chainIdParam) !== chainId) {
        switchChain({ chainId: Number(chainIdParam) });
        setSearch((prev) => {
          prev.delete('chainId');
          return prev;
        });
      }
    } catch {}
  }, [chainId, chainIdParam, switchChain, setSearch]);
};
