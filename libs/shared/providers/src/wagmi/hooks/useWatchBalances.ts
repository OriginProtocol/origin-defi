import { useEffect } from 'react';

import { isFulfilled, isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useIdle from 'react-use/lib/useIdle';
import { mainnet } from 'viem/chains';
import { useAccount, useBlockNumber, useConfig } from 'wagmi';

import { useTokenBalance } from './useTokenBalance';

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
    queryKey: ['useWatchBalances', addr, args.tokens?.map((t) => t.id)],
    queryFn: async () => {
      if (!args.tokens || isNilOrEmpty(args.tokens) || !addr) {
        return null;
      }

      let res = {} as Record<string, bigint>;

      const bals = await Promise.allSettled(
        args.tokens.map((t) =>
          queryClient.fetchQuery({
            queryKey: useTokenBalance.getKey(t, addr),
            queryFn: useTokenBalance.fetcher(config),
          }),
        ),
      );

      bals.forEach((bal, i) => {
        if (isFulfilled(bal)) {
          res = { ...res, [args.tokens[i].id]: bal.value };
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
