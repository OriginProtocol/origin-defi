import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract, readContracts } from '@wagmi/core';
import { secondsInMonth } from 'date-fns/constants';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { useOgvLockupsQuery } from './queries.generated';
import { getRewardsApy, getVAPY } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type { OgvLockupsQuery } from './queries.generated';

export const useTotalLockedUp = () => {
  const { address } = useAccount();

  return useOgvLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) =>
        data?.ogvLockups?.reduce(
          (acc, curr) => acc + BigInt(curr?.amount ?? 0n),
          0n,
        ) ?? 0n,
      enabled: !!address,
    },
  );
};

export const useStakingAPY = (
  amount: bigint | number,
  monthDuration: number,
  options?: Partial<
    UseQueryOptions<
      {
        stakingAPY: number;
        veOGVReceived: number;
      },
      Error,
      {
        stakingAPY: number;
        veOGVReceived: number;
      },
      ['useStakingAPY', string, number, Config]
    >
  >,
) => {
  const config = useConfig();

  return useQuery({
    queryKey: ['useStakingAPY', amount?.toString(), monthDuration, config],
    queryFn: async () => {
      const amt =
        typeof amount === 'bigint'
          ? amount
          : parseUnits(amount.toString(), tokens.mainnet.veOGV.decimals);

      const res = await readContracts(config, {
        contracts: [
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'previewPoints',
            args: [amt, BigInt(monthDuration * secondsInMonth)],
          },
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'totalSupply',
          },
        ],
        allowFailure: true,
      });

      const preview =
        res?.[0]?.status === 'success'
          ? +formatUnits(res[0].result[0], tokens.mainnet.veOGV.decimals)
          : 0;
      const veOgvTotalSupply =
        res?.[1]?.status === 'success'
          ? +formatUnits(res[1].result, tokens.mainnet.veOGV.decimals)
          : 100e6;

      return {
        stakingAPY: getRewardsApy(
          preview,
          +formatUnits(amt, tokens.mainnet.veOGV.decimals),
          veOgvTotalSupply,
        ),
        veOGVReceived: preview,
      };
    },
    ...options,
  });
};

export const useMyVApy = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const config = useConfig();

  return useQuery({
    queryKey: ['useMyVApy', address, config],
    enabled: !!address,
    queryFn: async () => {
      if (!address) {
        return 0;
      }

      const data = await Promise.all([
        queryClient.fetchQuery<OgvLockupsQuery>({
          queryKey: useOgvLockupsQuery.getKey({
            address: address ?? ZERO_ADDRESS,
          }),
          queryFn: useOgvLockupsQuery.fetcher({
            address: address ?? ZERO_ADDRESS,
          }),
        }),
        readContract(config, {
          address: tokens.mainnet.veOGV.address,
          abi: tokens.mainnet.veOGV.abi,
          functionName: 'totalSupply',
        }),
      ]);

      if (isNilOrEmpty(data?.[0]?.ogvLockups)) {
        return 0;
      }

      const total = data[0].ogvLockups.reduce(
        (acc, curr) =>
          acc +
          +formatUnits(BigInt(curr?.amount ?? 0n), tokens.mainnet.OGV.decimals),
        0,
      );

      return data[0].ogvLockups.reduce((acc, curr) => {
        const vAPY = getVAPY(
          +formatUnits(BigInt(curr.veogv), tokens.mainnet.veOGV.decimals),
          +formatUnits(BigInt(curr.amount), tokens.mainnet.OGV.decimals),
          +formatUnits(BigInt(data[1]), tokens.mainnet.veOGV.decimals),
        );

        const weight =
          +formatUnits(BigInt(curr.amount), tokens.mainnet.OGV.decimals) /
          total;

        return acc + weight * vAPY;
      }, 0);
    },
  });
};
