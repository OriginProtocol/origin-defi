import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

type Key = ['useOgvInfo', HexAddress | undefined];

const getKey = (address: HexAddress | undefined): Key => [
  'useOgvInfo',
  address,
];

type OgvInfo = {
  ogvTotalSupply: bigint;
  veOgvTotalSupply: bigint;
  ogvBalance: bigint;
  veOgvBalance: bigint;
  veOgvRewards: bigint;
  votingPowerPercent: number;
  ogvTotalLocked: bigint;
  ogvTotalLockedPercent: number;
  ogvVeOgvAllowance: bigint;
};

const fetcher: (config: Config) => QueryFunction<OgvInfo, Key> =
  (config) =>
  async ({ queryKey: [, address] }) => {
    const data = await readContracts(config, {
      contracts: [
        {
          address: tokens.mainnet.OGV.address,
          abi: tokens.mainnet.OGV.abi,
          functionName: 'totalSupply',
          chainId: tokens.mainnet.OGV.chainId,
        },
        {
          address: tokens.mainnet.veOGV.address,
          abi: tokens.mainnet.veOGV.abi,
          functionName: 'totalSupply',
          chainId: tokens.mainnet.veOGV.chainId,
        },
        {
          address: tokens.mainnet.OGV.address,
          abi: tokens.mainnet.OGV.abi,
          functionName: 'balanceOf',
          args: [address ?? ZERO_ADDRESS],
          chainId: tokens.mainnet.OGV.chainId,
        },
        {
          address: tokens.mainnet.veOGV.address,
          abi: tokens.mainnet.veOGV.abi,
          functionName: 'balanceOf',
          args: [address ?? ZERO_ADDRESS],
          chainId: tokens.mainnet.veOGV.chainId,
        },
        {
          address: tokens.mainnet.veOGV.address,
          abi: tokens.mainnet.veOGV.abi,
          functionName: 'previewRewards',
          args: [address ?? ZERO_ADDRESS],
          chainId: tokens.mainnet.veOGV.chainId,
        },
        {
          address: tokens.mainnet.OGV.address,
          abi: tokens.mainnet.OGV.abi,
          functionName: 'balanceOf',
          args: [tokens.mainnet.veOGV.address],
          chainId: tokens.mainnet.OGV.chainId,
        },
        {
          address: tokens.mainnet.OGV.address,
          abi: tokens.mainnet.OGV.abi,
          functionName: 'allowance',
          args: [address ?? ZERO_ADDRESS, tokens.mainnet.veOGV.address],
          chainId: tokens.mainnet.OGV.chainId,
        },
      ],
      allowFailure: true,
    });

    const [
      ogvTotalSupply,
      veOgvTotalSupply,
      ogvBalance,
      veOgvBalance,
      veOgvRewards,
      ogvTotalLocked,
      ogvVeOgvAllowance,
    ] = data.map((d) => (d.status === 'success' ? d.result : 0n));

    const votingPowerPercent =
      +formatUnits(veOgvBalance, tokens.mainnet.veOGV.decimals) /
      +formatUnits(veOgvTotalSupply, tokens.mainnet.veOGV.decimals);
    const ogvTotalLockedPercent =
      +formatUnits(ogvTotalLocked, tokens.mainnet.OGV.decimals) /
      +formatUnits(ogvTotalSupply, tokens.mainnet.OGV.decimals);

    return {
      ogvTotalSupply,
      veOgvTotalSupply,
      ogvBalance,
      veOgvBalance,
      veOgvRewards,
      votingPowerPercent,
      ogvTotalLocked,
      ogvTotalLockedPercent,
      ogvVeOgvAllowance,
    };
  };

export const useOgvInfo = (
  options?: UseQueryOptions<OgvInfo, Error, OgvInfo, Key>,
) => {
  const { address } = useAccount();
  const config = useConfig();

  return useQuery({
    ...options,
    queryKey: getKey(address),
    queryFn: fetcher(config),
  });
};
useOgvInfo.getKey = getKey;
useOgvInfo.fetcher = fetcher;
