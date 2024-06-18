import { useAccount, useBytecode } from 'wagmi';

import type { Hex } from 'viem';

export const useIsContract = (address?: Hex, chainId?: number) => {
  const account = useAccount();
  const addr = address ?? account?.address;
  const cid = chainId ?? account?.chainId;
  const res = useBytecode({
    address: addr,
    chainId: cid,
    query: { enabled: !!addr && !!cid },
  });

  return { ...res, data: !!addr && !!cid && (res?.data?.length ?? 0) > 0 };
};
