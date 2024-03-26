import {
  isAddressEqual,
  isHexAddress,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { arbitrum, mainnet } from 'viem/chains';

import { tokens } from './tokens';

import type { HexAddress } from '@origin/shared/utils';

import type { Token } from './types';

export const getChainNameById = (chainId?: number) => {
  return (
    {
      [mainnet.id]: 'mainnet',
      [arbitrum.id]: 'arbitrum',
    } as const
  )[chainId ?? mainnet.id];
};

export const getTokenByAddress = (
  address: string | undefined,
  chainId?: number,
) => {
  if (!isHexAddress(address)) {
    return undefined;
  }
  const chainName = getChainNameById(chainId) ?? 'mainnet';

  return Object.values(tokens[chainName])?.find?.((t) =>
    isAddressEqual(t?.address ?? ZERO_ADDRESS, address as HexAddress),
  );
};

export const getTokenBySymbol = (symbol: string, chainId?: number) => {
  if (!symbol || isNilOrEmpty(symbol)) {
    return undefined;
  }

  const chainName = getChainNameById(chainId) ?? 'mainnet';

  return Object.values(tokens[chainName])?.find?.((t) => t.symbol === symbol);
};

export const getTokenById = (tokenId: string) => {
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
  if (isNilOrEmpty(tokenId) || !/^[a-zA-Z0-9]+:[0-9]+$/.test(tokenId)) {
    return undefined;
  }

  const res = /^(\w+):(\d+)$/.exec(tokenId);

  return { symbol: res?.[1], chainId: Number(res?.[2] ?? mainnet.id) };
};
