import { isNilOrEmpty } from '@origin/shared/utils';
import { mergeDeepRight, uniq, uniqWith } from 'ramda';
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
    (r) => r.tokenIn.id === tokenIn.id && r.tokenOut.id === tokenOut.id,
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

export const routeEq = <S = SwapAction, M = object>(
  a: SwapRoute<S, M> | undefined | null,
  b: SwapRoute<S, M> | undefined | null,
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

type GenerateSwapRoutesArgs<S = SwapAction, M = object> = {
  tokensIn: Token[];
  tokensOut: Token[];
  swapRoute: Omit<SwapRoute<S, M>, 'tokenIn' | 'tokenOut'>;
  includeReturn?: boolean;
};

export const generateSwapRoutes = <S = SwapAction, M = object>({
  tokensIn,
  tokensOut,
  swapRoute,
  includeReturn = false,
}: GenerateSwapRoutesArgs<S, M>): SwapRoute<S, M>[] => {
  if (!tokensIn.length || !tokensOut.length) {
    return [];
  }

  const forwardRoutes = tokensIn.flatMap((tokenIn) =>
    tokensOut
      .filter((tokenOut) => tokenIn.id !== tokenOut.id)
      .map((tokenOut) => ({
        ...swapRoute,
        tokenIn,
        tokenOut,
      })),
  );

  if (!includeReturn) {
    return forwardRoutes;
  }

  const returnRoutes = tokensOut.flatMap((tokenIn) =>
    tokensIn
      .filter((tokenOut) => tokenIn.id !== tokenOut.id)
      .map((tokenOut) => ({
        ...swapRoute,
        tokenIn,
        tokenOut,
      })),
  );

  return uniqWith(routeEq<S, M>, [...forwardRoutes, ...returnRoutes]);
};
