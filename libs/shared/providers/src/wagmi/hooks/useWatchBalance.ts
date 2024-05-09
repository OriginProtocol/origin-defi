import { useEffect } from 'react';

import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { getBalance } from '@wagmi/core';
import useIdle from 'react-use/lib/useIdle';
import { mainnet } from 'viem/chains';
import { useAccount, useBlockNumber, useConfig } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Config } from '@wagmi/core';

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
    queryKey: useWatchBalance.getKey(config, args?.token, addr),
    queryFn: useWatchBalance.fetcher,
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(addr)) {
      res?.refetch();
    }
  }, [addr, blockNumber, prev, res]);

  return res;
};

useWatchBalance.getKey = (
  config: Config,
  token?: Token,
  address?: HexAddress,
) => ['useWatchBalance', token, address, config] as const;

useWatchBalance.fetcher = ({
  queryKey: [, token, address, config],
}: {
  queryKey: ReturnType<typeof useWatchBalance.getKey>;
}) =>
  getBalance(config, {
    address: address ?? ZERO_ADDRESS,
    token: token?.address,
    chainId: token?.chainId ?? mainnet.id,
  }).then((bal) => bal.value);
