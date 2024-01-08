/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HexAddress } from '@origin/shared/utils';

import type { IVaultABI as VaultABI } from './abis/IVault';

export type Contract<Abi = any> = {
  address: undefined | HexAddress;
  chainId: number;
  abi: Abi;
  name?: string;
};

export type Token<Abi = any> = {
  symbol: string;
  decimals: number;
} & Contract<Abi>;

export type IVaultABI = typeof VaultABI;
