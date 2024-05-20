import { arbitrum, mainnet, optimism } from 'viem/chains';

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
} as const;
