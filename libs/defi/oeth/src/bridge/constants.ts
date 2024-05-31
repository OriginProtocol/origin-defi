import { contracts } from '@origin/shared/contracts';
import { arbitrum, mainnet } from 'viem/chains';

import type { Contract } from '@origin/shared/contracts';

export const ccipRouter: Record<
  number,
  Contract<typeof contracts.arbitrum.ccipRouter.abi> & {
    chainSelectorId: bigint;
  }
> = {
  [mainnet.id]: {
    chainSelectorId: 5009297550715157269n,
    ...contracts.mainnet.ccipRouter,
  },
  [arbitrum.id]: {
    chainSelectorId: 4949039107694359620n,
    ...contracts.arbitrum.ccipRouter,
  },
};
