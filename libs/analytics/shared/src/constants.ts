import { tokens } from '@origin/shared/contracts';

export const oTokenConfig = {
  [tokens.mainnet.OETH.id]: {
    from: '2023-06-01T00:00:00.000000Z',
  },
  [tokens.mainnet.OUSD.id]: {
    from: '2023-06-01T00:00:00.000000Z',
  },
  [tokens.base.superOETHb.id]: {
    from: '2024-08-28T00:00:00.000000Z',
  },
} as const;
