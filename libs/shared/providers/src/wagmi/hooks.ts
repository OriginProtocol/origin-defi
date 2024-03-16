import { useCallback, useEffect } from 'react';

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

import type { NativeToken, Token } from '@origin/shared/contracts';
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

export const useWatchBalance = (config?: {
  token?: HexAddress;
  address?: HexAddress;
  chainId?: number;
}) => {
  const { address: connectedAddress } = useAccount();
  const address = config?.address ?? connectedAddress;
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !!address },
    chainId: config?.chainId,
  });
  const prev = usePrevious(Number(blockNumber));
  const resNative = useBalance({
    address,
    query: {
      enabled: isNilOrEmpty(config?.token) && !!address,
      select: (data) => data.value,
    },
    chainId: config?.chainId,
  });
  const resToken = useReadContract({
    address: config?.token,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address ?? ZERO_ADDRESS],
    query: {
      enabled: !!config?.token && !!address,
    },
    chainId: config?.chainId,
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(address)) {
      if (isNilOrEmpty(config?.token)) {
        resNative?.refetch();
      } else {
        resToken?.refetch();
      }
    }
  }, [address, blockNumber, config?.token, prev, resNative, resToken]);

  return isNilOrEmpty(config?.token) ? resNative : resToken;
};

export const useWatchBalances = (
  tokens: (NativeToken | Token)[] | undefined | null,
) => {
  const config = useConfig();
  const isNative = useIsNativeCurrency();
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

      const { native, others } = groupBy(
        (t) => (isNative(t) ? 'native' : 'others'),
        tokens,
      ) as { native: NativeToken[]; others: Token[] };

      if (native?.length === 1) {
        try {
          const nativeBalance = await getBalance(config, { address });
          res = { [native[0].symbol]: nativeBalance.value };
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

export const useIsNativeCurrency = () => {
  const config = useConfig();

  return useCallback(
    (token: { symbol: string } | undefined | null) =>
      isNativeCurrency(config, token),
    [config],
  );
};
