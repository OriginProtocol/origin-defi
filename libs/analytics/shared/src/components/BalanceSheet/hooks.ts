import { useCallback } from 'react';

import { OriginLabel } from '@origin/shared/icons';
import { getTokenPriceKey, useTokenPrice } from '@origin/shared/providers';
import { getPercentageDifference, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { add, from, lt, mul, toNumber } from 'dnum';
import { defineMessage } from 'react-intl';
import { useConfig } from 'wagmi';

import { oTokenConfig } from '../../constants';
import { useOTokenStatsQuery, useOTokenStrategiesQuery } from '../../queries';
import { dailyStatMapper, strategyMapper } from '../../utils';

import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

import type { OTokenStatsQuery, OTokenStrategiesQuery } from '../../queries';
import type { StrategyMapped } from '../../utils';

type BalanceSheetRow = {
  token: Token;
  todayValue: Dnum;
  lastWeekValue: Dnum;
  pctDifference: number;
};

type BalanceSheetMapped = {
  strategy: StrategyMapped;
  balances: BalanceSheetRow[];
};

export const useBalanceSheet = (token: Token) => {
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['useBalanceSheet', token.id],
    queryFn: async () => {
      const res = await Promise.all([
        queryClient.fetchQuery({
          queryKey: useOTokenStatsQuery.getKey({
            token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
            chainId: token.chainId,
            limit: 7,
          }),
          queryFn: useOTokenStatsQuery.fetcher({
            token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
            chainId: token.chainId,
            limit: 7,
          }),
        }),
        queryClient.fetchQuery({
          queryKey: useOTokenStrategiesQuery.getKey({
            token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
            chainId: token.chainId,
          }),
          queryFn: useOTokenStrategiesQuery.fetcher({
            token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
            chainId: token.chainId,
          }),
        }),
        queryClient.fetchQuery({
          queryKey: useTokenPrice.getKey(getTokenPriceKey(token)),
          queryFn: useTokenPrice.fetcher(config, queryClient),
        }),
      ]);
      const lastWeekRes = await queryClient.fetchQuery({
        queryKey: useOTokenStrategiesQuery.getKey({
          token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
          chainId: token.chainId,
          timestamp: res[0].oTokenDailyStats?.[6]?.timestamp,
        }),
        queryFn: useOTokenStrategiesQuery.fetcher({
          token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
          chainId: token.chainId,
          timestamp: res[0].oTokenDailyStats?.[6]?.timestamp,
        }),
      });

      return { res, lastWeekRes };
    },
    select: useCallback(
      (data: {
        res: [OTokenStatsQuery, OTokenStrategiesQuery, Dnum];
        lastWeekRes: OTokenStrategiesQuery;
      }) => {
        const { res, lastWeekRes } = data;
        const todayDailyStat = dailyStatMapper(
          res[0].oTokenDailyStats?.[0],
          token,
        );
        const lastWeekDailyStat = dailyStatMapper(
          res[0].oTokenDailyStats?.[6],
          token,
        );
        const todayStrategies = strategyMapper(res[1].strategies, token);
        const ethPrice = res[2];
        const lastWeekStrategies = strategyMapper(
          lastWeekRes.strategies,
          token,
        );

        const assets = [] as BalanceSheetMapped[];
        const totalAssets: BalanceSheetRow = {
          token,
          todayValue: from(0, token.decimals),
          lastWeekValue: from(0, token.decimals),
          pctDifference: 0,
        };
        for (const strategy of todayStrategies) {
          const lastWeekStrategy = lastWeekStrategies.find(
            (s) => s.id === strategy.id,
          );
          const balances = strategy.balances.reduce((acc, b) => {
            const todayValue = mul(b.amount, todayDailyStat.rateETH);

            if (lt(todayValue, 0.01)) return acc;

            const lastWeekBalance = lastWeekStrategy?.balances.find(
              (lb) => lb.token.id === b.token.id,
            );
            const lastWeekValue = mul(
              lastWeekBalance?.amount ?? from(0),
              lastWeekDailyStat.rateETH,
            );
            const pctDifference = toNumber(
              getPercentageDifference(todayValue, lastWeekValue),
            );

            return [
              ...acc,
              {
                token: b.token,
                todayValue,
                lastWeekValue,
                pctDifference,
              },
            ];
          }, [] as BalanceSheetRow[]);
          assets.push({
            strategy,
            balances,
          });
          totalAssets.todayValue = add(
            totalAssets.todayValue,
            mul(strategy.total, todayDailyStat.rateETH),
          );
          totalAssets.lastWeekValue = add(
            totalAssets.lastWeekValue,
            mul(lastWeekStrategy?.total ?? from(0), lastWeekDailyStat.rateETH),
          );
          totalAssets.pctDifference = toNumber(
            getPercentageDifference(
              totalAssets.todayValue,
              totalAssets.lastWeekValue,
            ),
          );
        }

        if (todayDailyStat.dripperWETH > 0) {
          const dripperToken = oTokenConfig[token.id].dripperToken;
          const todayValue = mul(
            from(todayDailyStat.dripperWETH, dripperToken.decimals) ?? from(0),
            todayDailyStat.rateETH,
          );
          const lastWeekValue = mul(
            from(lastWeekDailyStat.dripperWETH, dripperToken.decimals),
            lastWeekDailyStat.rateETH,
          );
          const pctDifference = toNumber(
            getPercentageDifference(todayValue, lastWeekValue),
          );
          assets.push({
            strategy: {
              id: 'dripper',
              name: 'Dripper',
              title: defineMessage({ defaultMessage: 'Dripper' }),
              total: from(todayDailyStat.dripperWETH),
              balances: [],
              icon: OriginLabel,
              color: '#000',
              description: defineMessage({ defaultMessage: 'Dripper' }),
              addresses: [],
              contractName: '',
              address: '',
              oTokenAddress: '',
              kind: '',
            },
            balances: [
              {
                token: dripperToken,
                todayValue,
                lastWeekValue,
                pctDifference,
              },
            ],
          });
          totalAssets.todayValue = add(totalAssets.todayValue, todayValue);
          totalAssets.lastWeekValue = add(
            totalAssets.lastWeekValue,
            lastWeekValue,
          );
          totalAssets.pctDifference = toNumber(
            getPercentageDifference(
              totalAssets.todayValue,
              totalAssets.lastWeekValue,
            ),
          );
        }

        const liabilities: BalanceSheetRow = {
          token,
          todayValue: mul(
            from(todayDailyStat.totalSupply, token.decimals),
            todayDailyStat.rateETH,
          ),
          lastWeekValue: mul(
            from(lastWeekDailyStat.totalSupply, token.decimals),
            lastWeekDailyStat.rateETH,
          ),
          pctDifference: toNumber(
            getPercentageDifference(
              from(todayDailyStat.totalSupply, token.decimals),
              from(lastWeekDailyStat.totalSupply, token.decimals),
            ),
          ),
        };

        return {
          ethPrice,
          todayDailyStat,
          lastWeekDailyStat,
          assets,
          totalAssets,
          liabilities,
          totalLiabilities: liabilities,
        };
      },
      [token],
    ),
  });
};
