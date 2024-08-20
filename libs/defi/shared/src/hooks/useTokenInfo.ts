import { useMemo } from 'react';

import {
  getTokenPriceKey,
  useTokenPrice,
  useTvl,
  useWatchBalance,
} from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { from, mul } from 'dnum';
import { useAccount } from 'wagmi';

import { useOTokenApyQuery } from '../queries';

import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

type UseTokenInfoProps = { token: Token; enabled?: boolean };

export const useTokenInfo = ({ token, enabled }: UseTokenInfoProps) => {
  const { isConnected } = useAccount();
  const { data: apies, isLoading: isApiesLoading } = useOTokenApyQuery(
    {
      token: token.address ?? ZERO_ADDRESS,
      chainId: token.chainId,
    },
    {
      enabled,
      select: (data) => data?.oTokenApies?.[0],
    },
  );
  const { data: tvl, isLoading: isTvlLoading } = useTvl(token, {
    enabled,
  });
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(token),
  );
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token,
  });

  const tvlUsd = mul(tvl ?? from(0), price ?? from(0));

  return useMemo(
    () => ({
      isLoading:
        isApiesLoading ||
        isTvlLoading ||
        isPriceLoading ||
        (isConnected && isBalanceLoading),
      apies,
      tvl,
      tvlUsd,
      balance: [balance ?? 0n, token.decimals] as Dnum,
      yieldEarned: from(2.73), // TODO replace
    }),
    [
      apies,
      balance,
      isApiesLoading,
      isBalanceLoading,
      isConnected,
      isPriceLoading,
      isTvlLoading,
      token.decimals,
      tvl,
      tvlUsd,
    ],
  );
};
