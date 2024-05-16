import {
  isAddressEqual,
  isHexAddress,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { arbitrum, mainnet } from 'viem/chains';

import { tokens } from './tokens';

import type { HexAddress } from '@origin/shared/utils';
import type { Chain } from 'viem/chains';

import type { Token } from './types';

export const getChainNameById = (chainId?: number) => {
  return (
    {
      [mainnet.id]: 'mainnet',
      [arbitrum.id]: 'arbitrum',
    } as const
  )[chainId ?? mainnet.id];
};

export const getNativeToken = (chain: Chain): Token => {
  return {
    ...chain.nativeCurrency,
    chainId: chain.id,
    address: undefined,
    abi: [],
  };
};

export const getTokenByAddress = <T extends Token = Token>(
  address: string | undefined,
  chainId?: number,
): T | undefined => {
  const chainName = getChainNameById(chainId) ?? 'mainnet';

  if (address === undefined) {
    return Object.values(tokens[chainName]).find(
      (v) => v.address === undefined,
    );
  }

  if (!isHexAddress(address)) {
    return undefined;
  }

  return Object.values(tokens[chainName])?.find?.((t) =>
    isAddressEqual(t?.address ?? ZERO_ADDRESS, address as HexAddress),
  );
};

export const getTokenBySymbol = <T extends Token = Token>(
  symbol: string,
  chainId?: number,
): T | undefined => {
  if (!symbol || isNilOrEmpty(symbol)) {
    return undefined;
  }

  const chainName = getChainNameById(chainId) ?? 'mainnet';

  return Object.values(tokens[chainName])?.find?.(
    (t) => t.symbol === symbol,
  ) as T | undefined;
};

export const getTokenById = <T extends Token = Token>(
  tokenId: string,
): T | undefined => {
  if (isNilOrEmpty(tokenId)) {
    return undefined;
  }

  const parsed = parseTokenId(tokenId);

  if (!parsed?.symbol || isNilOrEmpty(parsed?.chainId)) {
    return undefined;
  }

  return getTokenBySymbol(parsed?.symbol, parsed?.chainId);
};

export const getTokenId = (token: Token) => {
  if (token.chainId === mainnet.id) {
    return token.symbol;
  }

  return `${token.symbol}:${token.chainId}`;
};

export const parseTokenId = (tokenId: string) => {
  if (isNilOrEmpty(tokenId)) {
    return undefined;
  }

  if (/^\w+:\d+$/.test(tokenId)) {
    const res = /^(\w+):(\d+)$/.exec(tokenId);

    return { symbol: res?.[1], chainId: Number(res?.[2]) };
  }

  return { symbol: tokenId, chainId: mainnet.id };
};
