import { tokens } from '@origin/shared/contracts';
import { formatUnits } from 'viem';

import { useProductCardQuery } from './queries.generated';

import type { Token } from '@origin/shared/contracts';

export const useTokenInfo = (token: Token) =>
  useProductCardQuery(undefined, {
    select: (data) => {
      const info = { apy30DayAvg: 0, tvl: 0 };

      if (token.symbol === tokens.mainnet.OETH.symbol) {
        info.apy30DayAvg = data?.oethDailyStats?.at(0)?.apy30DayAvg;
        info.tvl = +formatUnits(
          BigInt(data?.oethDailyStats?.at(0)?.totalSupply ?? '0'),
          tokens.mainnet.OETH.decimals,
        );
      }

      if (token.symbol === tokens.mainnet.OUSD.symbol) {
        info.apy30DayAvg = data?.ousdapies?.at(0)?.apy30DayAvg;
        info.tvl = +formatUnits(
          BigInt(data?.ousds?.at(0)?.totalSupply ?? '0'),
          tokens.mainnet.OUSD.decimals,
        );
      }

      return info;
    },
  });
