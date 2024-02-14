import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';

import type { IVaultABI as VaultABI } from './abis/IVault';

export type Contract = {
  address: HexAddress;
  chainId: number;
  abi: Abi;
  name?: string;
};

export type Token = {
  address: HexAddress | undefined;
  chainId: number;
  abi: Abi;
  name?: string;
  symbol: string;
  decimals: number;
};

export type IVaultABI = typeof VaultABI;
