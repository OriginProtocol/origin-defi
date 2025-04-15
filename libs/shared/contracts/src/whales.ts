// This is a list of addresses of big token holders, they are used for simulating Tx and estimate gas fees

import { tokens } from './tokens';

export const whales = {
  [tokens.mainnet.ETH.id]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [tokens.mainnet.OETH.id]: '0x94B17476A93b3262d87B9a326965D1E91f9c13E7',
  [tokens.mainnet.wOETH.id]: '0xC460B0b6c9b578A4Cb93F99A691e16dB96Ee5833',
  [tokens.mainnet.OUSD.id]: '0x70fCE97d671E81080CA3ab4cc7A59aAc2E117137',
  [tokens.mainnet.wOUSD.id]: '0x3dD413Fd4D03b1d8fD2C9Ed34553F7DeC3B26F5C',
  [tokens.mainnet.WETH.id]: '0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E',
  [tokens.arbitrum.ETH.id]: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
  [tokens.arbitrum.wOETH.id]: '0x9f4D6f98F29c1D482bCF0F85683155E0B3e015f5',
  [tokens.arbitrum.WETH.id]: '0x70d95587d40A2caf56bd97485aB3Eec10Bee6336',
  [tokens.base.superOETHb.id]: '0x6446021F4E396dA3df4235C62537431372195D38',
  [tokens.base.ETH.id]: '0x4200000000000000000000000000000000000006',
  [tokens.base.WETH.id]: '0xcDAC0d6c6C59727a65F871236188350531885C43',
  [tokens.sonic.OS.id]: '0x0000000000000000000000000000000000000000',
  [tokens.sonic.wOS.id]: '0x0000000000000000000000000000000000000000',
  [tokens.plume.PLUME.id]: '0x0000000000000000000000000000000000000000',
  [tokens.plume.WETH.id]: '0x0000000000000000000000000000000000000000',
  [tokens.plume.superOETHp.id]: '0x0000000000000000000000000000000000000000',
  [tokens.plume.wsuperOETHp.id]: '0x0000000000000000000000000000000000000000',
} as const;
