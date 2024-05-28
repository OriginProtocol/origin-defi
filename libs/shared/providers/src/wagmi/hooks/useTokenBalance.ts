import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { getBalance } from '@wagmi/core';
import { mainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Config } from '@wagmi/core';

const getKey = (config: Config, token?: Token, address?: HexAddress) =>
  ['useTokenBalance', token, address, config] as const;

const fetcher = async ({
  queryKey: [, token, address, config],
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
    queryKey: getKey(config, args?.token, addr),
    queryFn: useTokenBalance.fetcher,
  });
};
useTokenBalance.getKey = getKey;
useTokenBalance.fetcher = fetcher;
