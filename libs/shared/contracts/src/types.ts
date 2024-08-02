import type { supportedChains } from '@origin/shared/constants';
import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';

import type { tokenList } from './tokens';

export type SupportedChainId = keyof typeof supportedChains;

export type Contract<A = Abi> = {
  address: HexAddress;
  chainId: number;
  abi: A;
  name?: string;
};

export type Token<A = Abi> = {
  id: TokenId;
  address: HexAddress | undefined;
  chainId: number;
  abi: A;
  name?: string;
  symbol: string;
  decimals: number;
};

type TokenList = typeof tokenList;
export type TokenListItem = TokenList[number];
export type TokenSymbol = TokenListItem['symbol'];
export type TokenId = TokenListItem['id'];
