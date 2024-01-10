import { tokens } from '@origin/shared/contracts';
import { useAccount, useReadContract } from 'wagmi';

export const useIsRebaseBannerVisible = () => {
  const { address, isConnected, connector } = useAccount();
  const { data, isLoading } = useReadContract({
    address: tokens.mainnet.OETH.address,
    abi: tokens.mainnet.OETH.abi,
    functionName: 'rebaseState',
    args: [address],
    query: { enabled: !!address },
  });

  return isConnected && !isLoading && data === 0 && connector?.id === 'safe';
};
