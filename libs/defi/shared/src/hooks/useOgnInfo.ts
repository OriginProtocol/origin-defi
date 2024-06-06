import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

type Key = ['useOgnInfo', HexAddress | undefined];

const getKey = (address: HexAddress | undefined): Key => [
  'useOgnInfo',
  address,
];

type OgnInfo = {
  ognTotalSupply: bigint;
  xOgnTotalSupply: bigint;
  ognBalance: bigint;
  xOgnBalance: bigint;
  xOgnRewards: bigint;
  votingPowerPercent: number;
  ognTotalLocked: bigint;
  ognTotalLockedPercent: number;
  ognxOgnAllowance: bigint;
};

const fetcher: (config: Config) => QueryFunction<OgnInfo, Key> =
  (config) =>
  async ({ queryKey: [, address] }) => {
    const data = await readContracts(config, {
      contracts: [
        {
          address: tokens.mainnet.OGN.address,
          abi: tokens.mainnet.OGN.abi,
          functionName: 'totalSupply',
          chainId: tokens.mainnet.OGN.chainId,
        },
        {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'totalSupply',
          chainId: tokens.mainnet.xOGN.chainId,
        },
        {
          address: tokens.mainnet.OGN.address,
          abi: tokens.mainnet.OGN.abi,
          functionName: 'balanceOf',
          args: [address ?? ZERO_ADDRESS],
          chainId: tokens.mainnet.OGN.chainId,
        },
        {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'balanceOf',
          args: [address ?? ZERO_ADDRESS],
          chainId: tokens.mainnet.xOGN.chainId,
        },
        {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'previewRewards',
          args: [address ?? ZERO_ADDRESS],
          chainId: tokens.mainnet.xOGN.chainId,
        },
        {
          address: tokens.mainnet.OGN.address,
          abi: tokens.mainnet.OGN.abi,
          functionName: 'balanceOf',
          args: [tokens.mainnet.xOGN.address],
          chainId: tokens.mainnet.OGN.chainId,
        },
        {
          address: tokens.mainnet.OGN.address,
          abi: tokens.mainnet.OGN.abi,
          functionName: 'allowance',
          args: [address ?? ZERO_ADDRESS, tokens.mainnet.xOGN.address],
          chainId: tokens.mainnet.OGN.chainId,
        },
      ],
      allowFailure: true,
    });

    const [
      ognTotalSupply,
      xOgnTotalSupply,
      ognBalance,
      xOgnBalance,
      xOgnRewards,
      ognTotalLocked,
      ognxOgnAllowance,
    ] = data.map((d) => (d.status === 'success' ? d.result : 0n));

    const votingPowerPercent =
      +formatUnits(xOgnBalance, tokens.mainnet.xOGN.decimals) /
      +formatUnits(xOgnTotalSupply, tokens.mainnet.xOGN.decimals);
    const ognTotalLockedPercent =
      +formatUnits(ognTotalLocked, tokens.mainnet.OGN.decimals) /
      +formatUnits(ognTotalSupply, tokens.mainnet.OGN.decimals);

    return {
      ognTotalSupply,
      xOgnTotalSupply,
      ognBalance,
      xOgnBalance,
      xOgnRewards,
      votingPowerPercent,
      ognTotalLocked,
      ognTotalLockedPercent,
      ognxOgnAllowance,
    };
  };

export const useOgnInfo = (
  options?: UseQueryOptions<OgnInfo, Error, OgnInfo, Key>,
) => {
  const { address } = useAccount();
  const config = useConfig();

  return useQuery({
    ...options,
    queryKey: getKey(address),
    queryFn: fetcher(config),
  });
};
useOgnInfo.getKey = getKey;
useOgnInfo.fetcher = fetcher;
