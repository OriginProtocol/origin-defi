import { tokens } from '@origin/shared/contracts';
import { arbitrum, base, mainnet } from 'viem/chains';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

export type OTokenConfig = {
  from: string;
  availableNetworks: Chain[];
  route: string;
  dripperToken: Token;
};

export const oTokenConfig: Record<string, OTokenConfig> = {
  [tokens.mainnet.OETH.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet, arbitrum],
    route: 'oeth',
    dripperToken: tokens.mainnet.WETH,
  },
  [tokens.mainnet.OUSD.id]: {
    from: '2023-06-01T00:00:00.000000Z',
    availableNetworks: [mainnet],
    route: 'ousd',
    dripperToken: tokens.mainnet.USDT,
  },
  [tokens.base.superOETHb.id]: {
    from: '2024-08-28T00:00:00.000000Z',
    availableNetworks: [base],
    route: 'super',
    dripperToken: tokens.base.WETH,
  },
};
