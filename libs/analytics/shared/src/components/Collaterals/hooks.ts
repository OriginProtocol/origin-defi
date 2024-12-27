import { useCallback } from 'react';

import { useStrategiesConfig } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { from, gt } from 'dnum';

import { useOTokenStrategiesQuery } from '../../queries';
import { collateralMapper, strategyMapper } from '../../utils';

import type { Token } from '@origin/shared/contracts';
import type { StrategyConfig } from '@origin/shared/providers';

import type { OTokenStrategiesQuery } from '../../queries';

export const useCollaterals = (token: Token) => {
  return useOTokenStrategiesQuery(
    {
      token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
      chainId: token.chainId,
    },
    {
      select: useCallback(
        (data: OTokenStrategiesQuery) => {
          return collateralMapper(data?.strategies, token, {
            showEmptyBalances: false,
          })?.filter((c) => gt(c.amount, from(1, c.token.decimals)));
        },
        [token],
      ),
    },
  );
};

export const useStrategyAllocations = (token: Token) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['strategy-allocations', token.id],
    queryFn: async () => {
      return await Promise.all([
        queryClient.fetchQuery({
          queryKey: useStrategiesConfig.getKey({
            apiKey: import.meta.env.VITE_STRAPI_API_KEY,
            url: import.meta.env.VITE_STRAPI_URL,
          }),
          queryFn: useStrategiesConfig.fetcher,
        }),
        queryClient.fetchQuery({
          queryKey: useOTokenStrategiesQuery.getKey({
            token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
            chainId: token.chainId,
          }),
          queryFn: useOTokenStrategiesQuery.fetcher({
            token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
            chainId: token.chainId,
          }),
        }),
      ]);
    },
    select: useCallback(
      (res: [StrategyConfig[], OTokenStrategiesQuery]) => {
        return strategyMapper(res[1]?.strategies, token, res[0], {
          showEmptyBalances: false,
        });
      },
      [token],
    ),
  });
};
