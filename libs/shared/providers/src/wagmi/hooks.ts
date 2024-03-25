import { useEffect } from 'react';

import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { getBalance, readContracts } from '@wagmi/core';
import { groupBy } from 'ramda';
import { erc20Abi } from 'viem';
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConfig,
  useReadContract,
  useReadContracts,
} from 'wagmi';

import { isNativeCurrency } from './utils';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';
import type {
  UseReadContractParameters,
  UseReadContractsParameters,
} from 'wagmi';

export const useWatchContract = <T extends Abi | readonly unknown[]>(
  config: UseReadContractParameters<T>,
) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const prev = usePrevious(Number(blockNumber));
  const res = useReadContract(config);

  useEffect(() => {
    if (Number(blockNumber) !== prev) {
      res?.refetch();
    }
  }, [blockNumber, prev, res]);

  return res;
};

export const useWatchContracts = <T extends Abi | readonly unknown[]>(
  config: UseReadContractsParameters<T>,
) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const prev = usePrevious(Number(blockNumber));
  const res = useReadContracts(config);

  useEffect(() => {
    if (Number(blockNumber) !== prev) {
      res?.refetch();
    }
  }, [blockNumber, prev, res]);

  return res;
};

export const useWatchBalance = (
  token: Token = tokens.mainnet.ETH,
  watchAddress?: `0x${string}`,
) => {
  const { address: connectedAddress } = useAccount();
  const address = watchAddress ?? connectedAddress;
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !!address },
    chainId: token.chainId,
  });
  const prev = usePrevious(Number(blockNumber));
  const resNative = useBalance({
    address,
    query: {
      enabled: !!address,
      select: (data) => data.value,
    },
    chainId: token.chainId,
  });
  const resToken = useReadContract({
    address: token.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address ?? ZERO_ADDRESS],
    query: {
      enabled: !!token.address && !!address,
    },
    chainId: token.chainId,
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(address)) {
      if (isNilOrEmpty(token.address)) {
        resNative?.refetch();
      } else {
        resToken?.refetch();
      }
    }
  }, [address, blockNumber, token.address, prev, resNative, resToken]);

  return isNilOrEmpty(token.address) ? resNative : resToken;
};

export const useWatchBalances = (tokens: Token[] | undefined | null) => {
  const config = useConfig();
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !isNilOrEmpty(tokens) },
  });
  const prev = usePrevious(Number(blockNumber));
  const res = useQuery({
    queryKey: [
      'useWatchBalances',
      address,
      tokens?.map((t) => t.symbol),
      config,
    ],
    queryFn: async () => {
      if (!tokens || isNilOrEmpty(tokens) || !address) {
        return null;
      }

      let res = {} as Record<string, bigint>;

      const { natives, others } = groupBy(
        (t) => (isNativeCurrency(t) ? 'natives' : 'others'),
        tokens,
      ) as { natives: Token[]; others: Token[] };

      for (const native of natives) {
        try {
          if (res[native.symbol]) {
            console.log(
              'Multiple natives with the same symbol received. Skipping...',
            );
            continue;
          }
          const nativeBalance = await getBalance(config, {
            address,
            chainId: native.chainId,
          });
          res = { ...res, [native.symbol]: nativeBalance.value };
        } catch {}
      }

      if (others) {
        try {
          const bals = await readContracts(config, {
            contracts: others?.map((t) => ({
              address: t.address as HexAddress,
              abi: t.abi,
              functionName: 'balanceOf',
              args: [address],
              chainId: t.chainId,
            })),
            allowFailure: true,
          });
          others.forEach((t, i) => {
            if (bals[i].status === 'success' && bals[i].result) {
              res = { ...res, [t.symbol]: bals[i].result as unknown as bigint };
            }
          });
        } catch {}
      }

      return res;
    },
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(tokens)) {
      res?.refetch();
    }
  }, [blockNumber, prev, res, tokens]);

  return res;
};
