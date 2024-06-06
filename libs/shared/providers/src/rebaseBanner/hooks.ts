import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useAccount, useReadContract } from 'wagmi';

export const useIsRebaseBannerVisible = () => {
  const { address, isConnected, connector } = useAccount();
  const { data, isLoading } = useReadContract({
    address: tokens.mainnet.OETH.address,
    abi: tokens.mainnet.OETH.abi,
    functionName: 'rebaseState',
    chainId: tokens.mainnet.OETH.chainId,
    args: [address ?? ZERO_ADDRESS],
    query: { enabled: !!address },
  });

  return isConnected && !isLoading && data === 0 && connector?.id === 'safe';
};
