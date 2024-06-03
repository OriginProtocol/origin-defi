import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { getBalance } from '@wagmi/core';
import { mainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { QueryFunction } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

type Key = ['useTokenBalance', Token | undefined, HexAddress | undefined];

const getKey = (token?: Token, address?: HexAddress): Key => [
  'useTokenBalance',
  token,
  address,
];

const fetcher: (config: Config) => QueryFunction<bigint, Key> =
  (config) =>
  async ({
    queryKey: [, token, address],
  }: {
    queryKey: ReturnType<typeof useTokenBalance.getKey>;
  }) => {
    if (!address) {
      return 0n;
    }

    const bal = await getBalance(config, {
      address: address ?? ZERO_ADDRESS,
      token: token?.address,
      chainId: token?.chainId ?? mainnet.id,
    });

    return bal.value;
  };

export const useTokenBalance = (args?: {
  token: Token;
  address?: HexAddress;
}) => {
  const config = useConfig();
  const { address } = useAccount();
  const addr = args?.address ?? address;

  return useQuery({
    queryKey: getKey(args?.token, addr),
    queryFn: useTokenBalance.fetcher(config),
  });
};
useTokenBalance.getKey = getKey;
useTokenBalance.fetcher = fetcher;
