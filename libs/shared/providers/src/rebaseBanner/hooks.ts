import { contracts } from '@origin/shared/contracts';
import { useAccount, useContractRead } from 'wagmi';

export const useIsRebaseBannerVisible = () => {
  const { address, isConnected, connector } = useAccount();
  const { data, isLoading } = useContractRead({
    address: contracts.mainnet.OETH.address,
    abi: contracts.mainnet.OETH.abi,
    functionName: 'rebaseState',
    args: [address],
  });

  return isConnected && !isLoading && data === 0 && connector?.id === 'safe';
};
