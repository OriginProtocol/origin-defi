import { tokenIdMap, tokenList } from './tokens';

import type { Chain } from 'viem/chains';

import type { TokenId } from './tokens';
import type { Token } from './types';

export const getNativeToken = (chain: Chain): Token => {
  return {
    ...chain.nativeCurrency,
    id: `${chain.id}:${chain.nativeCurrency.symbol}` as TokenId,
    chainId: chain.id,
    address: undefined,
    abi: [],
  };
};

export const getTokenByAddress = (
  address: string | undefined,
  chainId?: number,
) =>
  tokenList.find(
    (t) => t.address === address && (!chainId || t.chainId === chainId),
  );

export const getTokenBySymbol = (symbol: string, chainId?: number) =>
  tokenList.find(
    (t) => t.symbol === symbol && (!chainId || t.chainId === chainId),
  );

export const getTokenById = (tokenId: TokenId) => tokenIdMap[tokenId];
