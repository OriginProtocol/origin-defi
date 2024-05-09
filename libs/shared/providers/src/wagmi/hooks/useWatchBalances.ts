import { useEffect } from 'react';

import { getTokenId } from '@origin/shared/contracts';
import { isFulfilled, isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useIdle from 'react-use/lib/useIdle';
import { mainnet } from 'viem/chains';
import { useAccount, useBlockNumber, useConfig } from 'wagmi';

import { useWatchBalance } from './useWatchBalance';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';

export const useWatchBalances = (args: {
  tokens: Token[];
  address?: HexAddress;
}) => {
  const config = useConfig();
  const isIdle = useIdle();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const addr = args?.address ?? address;
  const { data: blockNumber } = useBlockNumber({
    chainId: mainnet.id,
    watch: true,
    query: { enabled: !isIdle && !isNilOrEmpty(args.tokens) },
  });
  const prev = usePrevious(Number(blockNumber));
  const res = useQuery({
    queryKey: [
      'useWatchBalances',
      addr,
      args.tokens?.map((t) => t.symbol),
      config,
    ],
    queryFn: async () => {
      if (!args.tokens || isNilOrEmpty(args.tokens) || !addr) {
        return null;
      }

      let res = {} as Record<string, bigint>;

      const bals = await Promise.allSettled(
        args.tokens.map((t) =>
          queryClient.fetchQuery({
            queryKey: useWatchBalance.getKey(config, t, addr),
            queryFn: useWatchBalance.fetcher,
          }),
        ),
      );

      bals.forEach((bal, i) => {
        if (isFulfilled(bal)) {
          res = { ...res, [getTokenId(args.tokens[i])]: bal.value };
        }
      });

      return res;
    },
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(args.tokens)) {
      res?.refetch();
    }
  }, [args.tokens, blockNumber, prev, res]);

  return res;
};
