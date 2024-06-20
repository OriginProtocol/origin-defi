import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useAccount, useReadContract } from 'wagmi';

import { useIsContract } from '../wagmi';

import type { Token } from '@origin/shared/contracts';

export const useIsRebaseBannerVisible = (token: Token) => {
  const { address, isConnected } = useAccount();
  const { data: isContract, isLoading: isIscontractLoading } = useIsContract();
  const { data, isLoading } = useReadContract({
    address: token.address,
    abi: token.abi,
    functionName: 'rebaseState',
    chainId: token.chainId,
    args: [address ?? ZERO_ADDRESS],
    query: { enabled: isConnected && !isIscontractLoading && isContract },
  });

  return (
    isConnected &&
    !isIscontractLoading &&
    !isLoading &&
    data !== undefined &&
    isContract &&
    [0, 1].includes(Number(data))
  );
};
