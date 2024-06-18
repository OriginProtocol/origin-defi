import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useAccount, useReadContract } from 'wagmi';

import { useIsContract } from '../wagmi';

export const useIsRebaseBannerVisible = () => {
  const { address, isConnected } = useAccount();
  const { data: isContract, isLoading: isIscontractLoading } = useIsContract();
  const { data, isLoading } = useReadContract({
    address: tokens.mainnet.OETH.address,
    abi: tokens.mainnet.OETH.abi,
    functionName: 'rebaseState',
    chainId: tokens.mainnet.OETH.chainId,
    args: [address ?? ZERO_ADDRESS],
    query: { enabled: isConnected && !isIscontractLoading && isContract },
  });

  return (
    isConnected &&
    !isIscontractLoading &&
    !isLoading &&
    data !== undefined &&
    isContract &&
    [0, 1].includes(data)
  );
};
