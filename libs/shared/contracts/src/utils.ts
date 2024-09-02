import { supportedChains } from '@origin/shared/constants';

import { tokenIdMap, tokenList } from './tokens';

import type { Chain } from 'viem/chains';

import type { SupportedChainId, Token, TokenId } from './types';

export const getNativeToken = (chain: Chain): Token => {
  return {
    ...chain.nativeCurrency,
    id: `${chain.id}:${chain.nativeCurrency.symbol}` as TokenId,
    chainId: chain.id,
    address: undefined,
    abi: [],
  };
};

export const getNativeTokenByChainId = (chainId: SupportedChainId): Token => {
  const chain = supportedChains[chainId];

  return getNativeToken(chain);
};

export const getTokenByAddress = (
  address: string | undefined,
  chainId?: number,
) =>
  tokenList.find(
    (t) =>
      t.address?.toLowerCase() === address?.toLowerCase() &&
      (!chainId || t.chainId === chainId),
  );

export const getTokenBySymbol = (symbol: string, chainId?: number) =>
  tokenList.find(
    (t) => t.symbol === symbol && (!chainId || t.chainId === chainId),
  );

export const getTokenById = (tokenId: TokenId) => tokenIdMap[tokenId];

export const getTokenIconUrl = (token: Token) =>
  `https://raw.githubusercontent.com/OriginProtocol/origin-defi/main/libs/shared/icons/src/tokens/${token.symbol}.svg`;
