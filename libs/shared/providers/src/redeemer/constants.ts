import { erc20Abi } from 'viem';
import { mainnet } from 'wagmi/chains';

import type { Token } from '@origin/shared/contracts';

export const MIX_TOKEN: Token = {
  address: undefined,
  chainId: mainnet.id,
  abi: erc20Abi,
  decimals: 18,
  name: 'Redeem Mix',
  symbol: 'MIX_TOKEN',
};
