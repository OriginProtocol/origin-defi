import { from } from 'dnum';
import { arbitrum, base, mainnet, optimism, sonic } from 'viem/chains';

export const supportedChains = {
  [mainnet.id.toString()]: mainnet,
  [arbitrum.id.toString()]: arbitrum,
  [optimism.id.toString()]: optimism,
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
  [sonic.id.toString()]: from(0.0015, base.nativeCurrency.decimals),
};
