import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';

import type { IVaultABI as VaultABI } from './abis/IVault';

export type Contract<A = Abi> = {
  address: HexAddress;
  chainId: number;
  abi: A;
  name?: string;
};

export type NativeToken = {
  address: '0x0000000000000000000000000000000000000000';
  chainId: number;
  name?: string;
  symbol: string;
  decimals: number;
};

export type Token<A = Abi> = {
  address: HexAddress;
  chainId: number;
  abi: A;
  name?: string;
  symbol: string;
  decimals: number;
};

export type IVaultABI = typeof VaultABI;
