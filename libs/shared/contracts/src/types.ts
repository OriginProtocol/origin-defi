import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';

import type { TokenId } from './tokens';

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
