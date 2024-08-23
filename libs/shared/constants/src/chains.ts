import { arbitrum, base, mainnet, optimism } from 'viem/chains';

export const supportedChains = {
  [mainnet.id.toString()]: mainnet,
  [arbitrum.id.toString()]: arbitrum,
  [optimism.id.toString()]: optimism,
  [base.id.toString()]: base,
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
} as const;
