import {
  ChainlinkAggregatorABI,
  contracts,
  tokens,
} from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from 'wagmi';

const chainlinkOracles = {
  ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
} as const;

export const useTVL = () => {
  return useQuery({
    queryKey: ['useTVL'],
    queryFn: async () => {
      const data = await readContracts({
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

      const primeETHPrice = data?.[0]?.result ?? 0n;
      const tvl = (primeETHPrice * (data?.[1]?.result ?? 1n)) / 10n ** 18n;
      const tvlUsd = (tvl * (data?.[2]?.result ?? 0n)) / 10n ** 8n;

      return {
        tvl,
        tvlUsd,
      };
    },
  });
};
