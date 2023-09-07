import { isNilOrEmpty } from '@origin/shared/utils';
import { uniq } from 'ramda';

import { swapRoutes } from './constants';

import type { Token } from '@origin/shared/contracts';

import type { SwapRoute, TokenSource } from './types';

export const getAllAvailableTokens = (source: TokenSource) => {
  if (isNilOrEmpty(source)) {
    return [];
  }

  return swapRoutes.reduce((acc, curr) => {
    return uniq([...acc, curr[source]]);
  }, []);
};

export const getAvailableTokensForSource = (
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
  }, []);
};

export const getAvailableRoutes = (tokenIn: Token, tokenOut: Token) => {
  if (isNilOrEmpty(tokenIn) || isNilOrEmpty(tokenOut)) {
    return [];
  }

  return swapRoutes.filter(
    (r) =>
      r.tokenIn.symbol === tokenIn.symbol &&
      r.tokenOut.symbol === tokenOut.symbol,
  );
};

export const routeEq = (a: SwapRoute, b: SwapRoute) => {
  if (isNilOrEmpty(a) || isNilOrEmpty(b)) {
    return false;
  }

  return (
    a.tokenIn.symbol === b.tokenIn.symbol &&
    a.tokenOut.symbol === b.tokenOut.symbol &&
    a.action === b.action
  );
};
