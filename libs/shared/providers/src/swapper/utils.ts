import { isNilOrEmpty } from '@origin/shared/utils';
import { mergeDeepRight, uniq } from 'ramda';
import { mainnet } from 'viem/chains';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem';

import type { SwapAction, SwapRoute, TokenSource } from './types';

export const getFilteredSwapRoutes = (
  swapRoutes: SwapRoute[],
  chain: Chain | undefined | null,
) => {
  if (isNilOrEmpty(swapRoutes)) {
    return swapRoutes;
  }
  const chainId = chain?.id ?? mainnet.id;

  let filtered = swapRoutes.filter((r) => r.tokenIn.chainId === chainId);

  if (isNilOrEmpty(filtered)) {
    filtered = swapRoutes.filter(
      (r) => r.tokenIn.chainId === swapRoutes[0].tokenIn.chainId,
    );
  }

  return filtered;
};

export const getAllAvailableChainIds = (swapRoutes: SwapRoute[]) => {
  if (isNilOrEmpty(swapRoutes)) {
    return [];
  }

  return swapRoutes.reduce(
    (acc, curr) => uniq([...acc, curr.tokenIn.chainId, curr.tokenOut.chainId]),
    [] as number[],
  );
};

export const getAllAvailableTokens = (
  swapRoutes: SwapRoute[],
  source: TokenSource,
) => {
  if (isNilOrEmpty(source)) {
    return [];
  }

  return swapRoutes.reduce((acc, curr) => {
    return uniq([...acc, curr[source]]);
  }, [] as Token[]);
};

export const getAvailableTokensForSource = (
  swapRoutes: SwapRoute[],
  source: TokenSource,
  token: Token,
) => {
  if (isNilOrEmpty(source) || isNilOrEmpty(token?.symbol)) {
    return [];
  }

  return swapRoutes.reduce((acc, curr) => {
    if (source === 'tokenIn' && curr.tokenIn.symbol === token.symbol) {
      return uniq([...acc, curr.tokenOut]);
    }

    if (source === 'tokenOut' && curr.tokenOut.symbol === token.symbol) {
      return uniq([...acc, curr.tokenIn]);
    }

    return acc;
  }, [] as Token[]);
};

export const getAvailableRoutes = <S = SwapAction, M = object>(
  swapRoutes: SwapRoute<S, M>[],
  tokenIn: Token,
  tokenOut: Token,
) => {
  if (isNilOrEmpty(tokenIn) || isNilOrEmpty(tokenOut)) {
    return [];
  }

  return swapRoutes.filter(
    (r) =>
      r.tokenIn.symbol === tokenIn.symbol &&
      r.tokenOut.symbol === tokenOut.symbol,
  );
};

export const getTokenMeta = (
  swapRoutes: SwapRoute[],
  source: TokenSource,
  token: Token,
) => {
  if (isNilOrEmpty(swapRoutes) || isNilOrEmpty(source) || isNilOrEmpty(token)) {
    return undefined;
  }

  const meta = swapRoutes.reduce((acc, curr) => {
    if (source === 'tokenIn' && curr.tokenIn.symbol === token.symbol) {
      return mergeDeepRight(acc, curr?.meta ?? {});
    }

    if (source === 'tokenOut' && curr.tokenOut.symbol === token.symbol) {
      return mergeDeepRight(acc, curr?.meta ?? {});
    }

    return acc;
  }, {});

  return isNilOrEmpty(meta) ? undefined : meta;
};

export const routeEq = (
  a: SwapRoute | undefined | null,
  b: SwapRoute | undefined | null,
) => {
  if (!a || !b) {
    return false;
  }

  return (
    a.tokenIn.id === b.tokenIn.id &&
    a.tokenOut.id === b.tokenOut.id &&
    a.action === b.action
  );
};
