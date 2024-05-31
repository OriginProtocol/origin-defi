import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

type Key = ['useOgnInfo', HexAddress | undefined, Config];

const getKey = (address: HexAddress | undefined, config: Config): Key => [
  'useOgnInfo',
  address,
  config,
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

const fetcher: QueryFunction<OgnInfo, Key> = async ({
  queryKey: [, address, config],
}) => {
  const data = await readContracts(config, {
    contracts: [
      {
        address: tokens.mainnet.OGN.address,
        abi: tokens.mainnet.OGN.abi,
        functionName: 'totalSupply',
      },
      {
        address: tokens.mainnet.xOGN.address,
        abi: tokens.mainnet.xOGN.abi,
        functionName: 'totalSupply',
      },
      {
        address: tokens.mainnet.OGN.address,
        abi: tokens.mainnet.OGN.abi,
        functionName: 'balanceOf',
        args: [address ?? ZERO_ADDRESS],
      },
      {
        address: tokens.mainnet.xOGN.address,
        abi: tokens.mainnet.xOGN.abi,
        functionName: 'balanceOf',
        args: [address ?? ZERO_ADDRESS],
      },
      {
        address: tokens.mainnet.xOGN.address,
        abi: tokens.mainnet.xOGN.abi,
        functionName: 'previewRewards',
        args: [address ?? ZERO_ADDRESS],
      },
      {
        address: tokens.mainnet.OGN.address,
        abi: tokens.mainnet.OGN.abi,
        functionName: 'balanceOf',
        args: [tokens.mainnet.xOGN.address],
      },
      {
        address: tokens.mainnet.OGN.address,
        abi: tokens.mainnet.OGN.abi,
        functionName: 'allowance',
        args: [address ?? ZERO_ADDRESS, tokens.mainnet.xOGN.address],
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
    queryKey: getKey(address, config),
    queryFn: fetcher,
  });
};
useOgnInfo.getKey = getKey;
useOgnInfo.fetcher = fetcher;
