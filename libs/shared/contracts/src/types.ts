/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HexAddress } from '@origin/shared/utils';

export type Contract = {
  address: undefined | HexAddress;
  chainId: number;
  abi: any;
  name?: string;
  icon?: string;
};

export type Token = { symbol: string; decimals: number } & Contract;
