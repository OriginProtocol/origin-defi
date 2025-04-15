import { from } from 'dnum';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  plumeMainnet,
  sonic,
} from 'viem/chains';

export const supportedChains = {
  [mainnet.id.toString()]: mainnet,
  [arbitrum.id.toString()]: arbitrum,
  [optimism.id.toString()]: optimism,
  [plumeMainnet.id.toString()]: plumeMainnet,
  [base.id.toString()]: base,
  [sonic.id.toString()]: sonic,
} as const;

export const supportedChainNames = {
  [mainnet.id.toString()]: {
    short: 'Ethereum',
    long: 'Ethereum mainnet',
  },
  [arbitrum.id.toString()]: {
    short: 'Arbitrum',
    long: 'Arbitrum One',
  },
  [optimism.id.toString()]: {
    short: 'Optimism',
    long: 'Optimism',
  },
  [plumeMainnet.id.toString()]: {
    short: 'Plume',
    long: 'Plume',
  },
  [base.id.toString()]: {
    short: 'Base',
    long: 'Base',
  },
  [sonic.id.toString()]: {
    short: 'Sonic',
    long: 'Sonic',
  },
} as const;

// minimum amount of native token to leave on the user
// wallet so he can afford the transaction gas fees
export const nativeMinimumForGas = {
  [mainnet.id.toString()]: from(0.015, mainnet.nativeCurrency.decimals),
  [arbitrum.id.toString()]: from(0.0015, arbitrum.nativeCurrency.decimals),
  [optimism.id.toString()]: from(0.0015, optimism.nativeCurrency.decimals),
  [base.id.toString()]: from(0.0015, base.nativeCurrency.decimals),
  [plumeMainnet.id.toString()]: from(
    0.0015,
    plumeMainnet.nativeCurrency.decimals,
  ),
  [sonic.id.toString()]: from(0.0015, base.nativeCurrency.decimals),
};
