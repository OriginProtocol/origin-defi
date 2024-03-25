import { contracts } from '@origin/shared/contracts';
import { arbitrum, mainnet } from 'viem/chains';

import type { HexAddress } from '@origin/shared/utils';

export const ccipRouter: Record<
  string,
  {
    address: HexAddress;
    chainSelectorId: bigint;
    abi: typeof contracts.mainnet.ccipRouter.abi;
    chainId: number;
  }
> = {
  [mainnet.id]: {
    address: contracts.mainnet.ccipRouter.address,
    chainSelectorId: 5009297550715157269n,
    abi: contracts.mainnet.ccipRouter.abi,
    chainId: contracts.mainnet.ccipRouter.chainId,
  },
  [arbitrum.id]: {
    address: contracts.arbitrum.ccipRouter.address,
    chainSelectorId: 4949039107694359620n,
    abi: contracts.arbitrum.ccipRouter.abi,
    chainId: contracts.arbitrum.ccipRouter.chainId,
  },
};
