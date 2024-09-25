import { getTokenByAddress } from '@origin/shared/contracts';
import { isAddressEqual, isNilOrEmpty } from '@origin/shared/utils';
import { add, compare, from } from 'dnum';

import { strategiesConfig } from '../constants';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Dnum } from 'dnum';

import type { StrategyConfig } from '../constants';
import type { StrategyFragment } from '../queries';

export type StrategyBalanceMapped = {
  token: Token;
  amount: Dnum;
};

export type StrategyMapped = {
  balances: StrategyBalanceMapped[];
  total: Dnum;
} & StrategyConfig &
  StrategyFragment;

export const strategyMapper = (
  data: StrategyFragment[] | undefined | null,
  token: Token,
  options?: {
    strategyConfig?: Record<string, StrategyConfig>;
    showEmptyBalances?: boolean;
  },
): StrategyMapped[] => {
  if (!data) return [];

  const { strategyConfig = strategiesConfig, showEmptyBalances = false } =
    options ?? {};

  const strategyMap = new Map<string, StrategyMapped>();

  for (const curr of data) {
    if (
      !showEmptyBalances &&
      (isNilOrEmpty(curr.balances) ||
        curr.balances.every((b) => b.balance === '0'))
    ) {
      continue;
    }

    const config = Object.values(strategyConfig).find((c) =>
      c.addresses.some((a) => isAddressEqual(a, curr.address as HexAddress)),
    );

    if (!config) continue;

    let strategy = strategyMap.get(config.id);
    if (!strategy) {
      strategy = { ...config, ...curr, balances: [], total: from(0, 18) };
      strategyMap.set(config.id, strategy);
    }

    for (const balance of curr.balances) {
      if (!showEmptyBalances && balance.balance === '0') continue;

      const tok = getTokenByAddress(balance.asset, token.chainId);
      if (!tok) continue;

      const amount: Dnum = [BigInt(balance.balance), tok.decimals];
      const existingBalance = strategy.balances.find(
        (b) => b.token.id === tok.id,
      );

      if (existingBalance) {
        existingBalance.amount = add(existingBalance.amount, amount);
      } else {
        strategy.balances.push({ token: tok, amount });
      }

      strategy.total = add(strategy.total, amount);
    }
  }

  return Array.from(strategyMap.values()).sort((a, b) =>
    compare(b.total, a.total),
  );
};

export const collateralMapper = (
  data: StrategyFragment[] | undefined | null,
  token: Token,
  options?: { showEmptyBalances?: boolean },
): StrategyBalanceMapped[] => {
  if (!data) return [];

  const { showEmptyBalances = false } = options ?? {};
  const balanceMap = new Map<string, StrategyBalanceMapped>();

  for (const strategy of data) {
    if (
      !showEmptyBalances &&
      (isNilOrEmpty(strategy.balances) ||
        strategy.balances.every((b) => b.balance === '0'))
    ) {
      continue;
    }

    for (const bal of strategy.balances) {
      if (!showEmptyBalances && bal.balance === '0') continue;

      const tok = getTokenByAddress(bal.asset, token.chainId);
      if (!tok) continue;

      const amount: Dnum = [BigInt(bal.balance), tok.decimals];
      const existingBalance = balanceMap.get(tok.id);

      if (existingBalance) {
        existingBalance.amount = add(existingBalance.amount, amount);
      } else {
        balanceMap.set(tok.id, { token: tok, amount });
      }
    }
  }

  return Array.from(balanceMap.values());
};
