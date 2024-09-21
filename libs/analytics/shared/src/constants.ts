import { tokens } from '@origin/shared/contracts';
import { arbitrum, base, mainnet } from 'viem/chains';

export const oTokenConfig = {
  [tokens.mainnet.OETH.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet, arbitrum],
    route: 'oeth',
  },
  [tokens.mainnet.OUSD.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet],
    route: 'ousd',
  },
  [tokens.base.superOETHb.id]: {
    from: '2024-08-28T00:00:00.000000Z',
    availableNetworks: [base],
    route: 'super',
  },
} as const;
