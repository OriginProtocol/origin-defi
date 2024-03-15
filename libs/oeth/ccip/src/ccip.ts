import { arbitrum, mainnet } from 'viem/chains';

import type { HexAddress } from '@origin/shared/utils';

export const ccipRouter: Record<
  string,
  {
    address: HexAddress;
    chainSelectorId: bigint;
  }
> = {
  [mainnet.id]: {
    address: '0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D',
    chainSelectorId: 5009297550715157269n,
  },
  [arbitrum.id]: {
    address: '0x141fa059441E0ca23ce184B6A78bafD2A517DdE8',
    chainSelectorId: 4949039107694359620n,
  },
};
