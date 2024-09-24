import { getTokenByAddress } from '@origin/shared/contracts';
import { isAddressEqual, isNilOrEmpty } from '@origin/shared/utils';
import { add, compare, from } from 'dnum';
import { update } from 'ramda';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Dnum } from 'dnum';

import type { StrategyConfig } from '../components/Strategies/constants';
import type { StrategyFragment } from '../queries';

type Balance = {
  token: Token;
  amount: Dnum;
};

export type Strategy = {
  balances: Balance[];
  total: Dnum;
} & StrategyConfig;

export const strategyMapper = (
  d: StrategyFragment[] | undefined | null,
  token: Token,
  strategyConfig: Record<string, StrategyConfig>,
) => {
  return d
    ?.reduce((acc, curr) => {
      if (
        isNilOrEmpty(curr.balances) ||
        curr.balances.every((b) => b.balance === '0')
      ) {
        return acc;
      }

      const config = Object.values(strategyConfig).find((c) =>
        c.addresses.some((a) => isAddressEqual(a, curr.address as HexAddress)),
      );

      if (!config) {
        return acc;
      }

      const idx = acc.findIndex((c) => c.id === config?.id);
      if (idx === -1) {
        const balances = curr.balances.reduce((a, c) => {
          if (c.balance === '0') {
            return a;
          }

          const tok = getTokenByAddress(c.asset, token.chainId);

          if (!tok) {
            return a;
          }

          return [
            ...a,
            {
              token: tok,
              amount: [BigInt(c.balance), tok?.decimals] as Dnum,
            },
          ];
        }, [] as Balance[]);

        return [
          ...acc,
          {
            ...config,
            balances,
            total: balances.reduce((a, c) => add(a, c.amount), from(0)),
          },
        ];
      }

      const item = acc[idx];
      const balances = curr.balances.reduce((a, c) => {
        if (c.balance === '0') {
          return a;
        }

        const toAdd = item.balances.find((t) =>
          isAddressEqual(t.token.address, c.asset as HexAddress),
        );

        if (!toAdd) {
          const tok = getTokenByAddress(c.asset, token.chainId);

          if (!tok) {
            return a;
          }

          return [
            ...a,
            {
              token: tok,
              amount: [BigInt(c.balance), tok?.decimals] as Dnum,
            },
          ];
        }

        return [
          ...a,
          {
            ...toAdd,
            amount: add(toAdd.amount, [
              BigInt(c.balance),
              toAdd.token.decimals,
            ]),
          },
        ];
      }, [] as Balance[]);

      const newItem = {
        ...item,
        balances,
        total: balances.reduce((a, c) => add(a, c.amount), from(0)),
      };

      return update(idx, newItem, acc);
    }, [] as Strategy[])
    ?.toSorted((a, b) => compare(b.total, a.total));
};
