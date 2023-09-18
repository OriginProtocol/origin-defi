import { erc20ABI, mainnet } from 'wagmi';

import type { Token } from '@origin/shared/contracts';

export const MIX_TOKEN: Token = {
  address: undefined,
  chainId: mainnet.id,
  abi: erc20ABI,
  decimals: 18,
  name: 'Redeem Mix',
  symbol: 'MIX_TOKEN',
  icon: '/images/backed-graphic.svg',
};
