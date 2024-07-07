import {
  ChainlinkAggregatorABI,
  contracts,
  tokens,
} from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { mul } from 'dnum';
import { useConfig } from 'wagmi';

import type { Dnum } from 'dnum';

const chainlinkOracles = {
  ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
} as const;

export const useTVL = () => {
  const config = useConfig();

  return useQuery({
    queryKey: ['useTVL'],
    queryFn: async () => {
      const data = await readContracts(config, {
        contracts: [
          {
            address: contracts.mainnet.lrtOracle.address,
            abi: contracts.mainnet.lrtOracle.abi,
            functionName: 'primeETHPrice',
          },
          {
            address: tokens.mainnet.primeETH.address,
            abi: tokens.mainnet.primeETH.abi,
            functionName: 'totalSupply',
          },
          {
            address: chainlinkOracles.ETH_USD,
            abi: ChainlinkAggregatorABI,
            functionName: 'latestAnswer',
          },
        ],
      });

      const primeETHPrice = [
        data?.[0]?.result ?? 0n,
        tokens.mainnet.primeETH.decimals,
      ] as Dnum;
      const totalSupply = [
        data?.[1]?.result ?? 1n,
        tokens.mainnet.primeETH.decimals,
      ] as Dnum;
      const ethPrice = [data?.[2]?.result ?? 0, 8] as Dnum;

      return {
        tvl: mul(totalSupply, primeETHPrice),
        tvlUsd: mul(totalSupply, ethPrice),
      };
    },
  });
};
