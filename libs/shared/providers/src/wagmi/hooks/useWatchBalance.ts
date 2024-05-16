import { useEffect } from 'react';

import { isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import useIdle from 'react-use/lib/useIdle';
import { mainnet } from 'viem/chains';
import { useAccount, useBlockNumber, useConfig } from 'wagmi';

import { useTokenBalance } from './useTokenBalance';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';

export const useWatchBalance = (args?: {
  token: Token;
  address?: HexAddress;
}) => {
  const config = useConfig();
  const { address } = useAccount();
  const addr = args?.address ?? address;
  const isIdle = useIdle();
  const { data: blockNumber } = useBlockNumber({
    chainId: mainnet.id,
    watch: true,
    query: { enabled: !isIdle && !!addr },
  });
  const prev = usePrevious(Number(blockNumber));

  const res = useQuery({
    queryKey: useTokenBalance.getKey(config, args?.token, addr),
    queryFn: useTokenBalance.fetcher,
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(addr)) {
      res?.refetch();
    }
  }, [addr, blockNumber, prev, res]);

  return res;
};
