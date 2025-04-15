import { contracts } from './contracts';
import { tokens } from './tokens';

export const vaults = {
  [tokens.mainnet.OETH.id]: contracts.mainnet.OETHVault,
  [tokens.mainnet.OUSD.id]: contracts.mainnet.OUSDVault,
  [tokens.base.superOETHb.id]: contracts.base.superOETHbVault,
  [tokens.sonic.OS.id]: contracts.sonic.osVault,
  [tokens.plume.superOETHp.id]: contracts.plume.superOETHpVault,
} as const;
