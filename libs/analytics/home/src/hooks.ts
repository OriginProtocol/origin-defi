import { useCallback } from 'react';

import { isSameDay } from 'date-fns';
import { add, from, mul, toNumber } from 'dnum';

import { useCumulativeRevenueQuery } from './queries.generated';

import type { Dnum } from 'dnum';

import type { CumulativeRevenueQuery } from './queries.generated';

export const useCumulativeProtocolRevenue = () =>
  useCumulativeRevenueQuery(undefined, {
    select: useCallback((data: CumulativeRevenueQuery) => {
      const largestSet = [data.oeth, data.ousd, data.super].reduce(
        (acc, curr) => (curr.length > acc.length ? curr : acc),
        [],
      );

      const serie = [];
      const total = {
        oeth: from(0, 18),
        ousd: from(0, 18),
        superOeth: from(0, 18),
      };
      for (const set of largestSet) {
        const timestamp = set.timestamp;
        const ousd = data.ousd.find((d) =>
          isSameDay(new Date(d.timestamp), new Date(timestamp)),
        );
        const oeth = data.oeth.find((d) =>
          isSameDay(new Date(d.timestamp), new Date(timestamp)),
        );
        const superOeth = data.super.find((d) =>
          isSameDay(new Date(d.timestamp), new Date(timestamp)),
        );

        const ousdFee = computeItem(ousd);
        const oethFee = computeItem(oeth);
        const superOethFee = computeItem(superOeth);

        total.ousd = add(total.ousd, ousdFee);
        total.oeth = add(total.oeth, oethFee);
        total.superOeth = add(total.superOeth, superOethFee);

        serie.push({
          timestamp: new Date(set.timestamp).getTime(),
          ousd: toNumber(ousdFee),
          oeth: toNumber(oethFee),
          superOeth: toNumber(superOethFee),
          total: toNumber(
            [ousdFee, oethFee, superOethFee].reduce(
              (acc, curr) => add(acc, curr),
              from(0, 18),
            ),
          ),
          ousdCumulated: toNumber(total.ousd),
          oethCumulated: toNumber(total.oeth),
          superOethCumulated: toNumber(total.superOeth),
          totalCumulated: toNumber(
            [total.ousd, total.oeth, total.superOeth].reduce(
              (acc, curr) => add(acc, curr),
              from(0, 18),
            ),
          ),
        });
      }

      return { serie, total };
    }, []),
  });

const computeItem = (item?: CumulativeRevenueQuery['oeth'][number]) => {
  if (!item) {
    return from(0, 18);
  }
  const rateETH = [BigInt(item?.rateETH ?? 0), 18] as Dnum;
  const fees = [BigInt(item?.fees ?? 0), 18] as Dnum;

  return mul(fees, rateETH);
};
