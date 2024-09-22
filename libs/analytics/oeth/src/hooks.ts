import { useTokenPrice } from '@origin/shared/providers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toNumber } from 'dnum';
import { useConfig } from 'wagmi';

import {
  useAnalyticsOethStrategiesQuery,
  useOethStrategiesQuery,
} from './queries.generated';
import { getTotals } from './utils';

export const useBalanceSheet = () => {
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['useBalanceSheet'],
    queryFn: async () => {
      const res = await Promise.all([
        queryClient.fetchQuery({
          queryKey: useOethStrategiesQuery.getKey(),
          queryFn: useOethStrategiesQuery.fetcher(),
        }),
        queryClient.fetchQuery({
          queryKey: useTokenPrice.getKey('1:ETH_USD'),
          queryFn: useTokenPrice.fetcher(config, queryClient),
        }),
      ]);

      const today = res[0].today[0];
      const lastWeek = res[0].lastWeek[0];
      const ethPrice = res[1];

      const strategies = await queryClient.fetchQuery({
        queryKey: useAnalyticsOethStrategiesQuery.getKey({
          today: today.timestamp,
          lastWeek: lastWeek.timestamp,
        }),
        queryFn: useAnalyticsOethStrategiesQuery.fetcher({
          today: today.timestamp,
          lastWeek: lastWeek.timestamp,
        }),
      });

      const todayStrategies = strategies?.todayStrategies;
      const lastWeekStrategies = strategies?.lastWeekStrategies;

      function holding(day: typeof today, strategy: string, symbol?: string) {
        if (strategy === 'TOTAL') {
          return toNumber([BigInt(day?.totalSupply ?? 0), 18]);
        }
        if (strategy === 'DRIPPER') {
          return toNumber([BigInt(day?.dripperWETH ?? 0), 18]);
        }
        const strategyData = day.strategies?.find((s) => s.name === strategy);
        if (!strategyData) return 0;
        const holding = strategyData.holdings.find((h) => h.symbol === symbol);
        if (!holding) return 0;

        return toNumber([BigInt(holding.value), 18]);
      }

      function compareHolding(strategy: string, symbol?: string) {
        const todayData = holding(today, strategy, symbol);
        const lastWeekData = holding(lastWeek, strategy, symbol);
        return [todayData, lastWeekData];
      }

      const data = {
        assets: {
          'Native Staking': {
            ETH: [
              (todayStrategies ?? [])
                .filter((s) => s.name.includes('Native Staking'))
                .reduce(
                  (sum, s) =>
                    sum + toNumber([BigInt(s.balances[0].balance), 18]),
                  0,
                ),
              (lastWeekStrategies ?? [])
                .filter((s) => s.name.includes('Native Staking'))
                .reduce(
                  (sum, s) =>
                    sum + toNumber([BigInt(s.balances[0].balance), 18]),
                  0,
                ),
            ],
          },
          Vault: {
            WETH: compareHolding('VAULT', 'WETH'),
          },
          Convex: {
            ETH: compareHolding('CURVE', 'ETH'),
            OETH: compareHolding('CURVE', 'OETH'),
          },
          Dripper: { WETH: compareHolding('DRIPPER', 'WETH') },
        },
        liabilities: {
          'Token Supply': { OETH: compareHolding('TOTAL') },
        },
        assetTotals: [0, 0],
        liabilityTotals: [0, 0],
        netValueTotals: [0, 0],
      };

      const timestamp = new Date(today.timestamp);
      const timestampC = new Date(lastWeek.timestamp);

      data.assetTotals = getTotals(data.assets);
      data.liabilityTotals = getTotals(data.liabilities);
      data.netValueTotals = data.assetTotals.map(
        (val, index) => val - data.liabilityTotals[index],
      );

      return {
        data,
        timestamp,
        timestampC,
        ethPrice,
        blocknumber: today.blockNumber,
      };
    },
  });
};
