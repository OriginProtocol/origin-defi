import { ZERO_ADDRESS } from '@origin/shared/utils';
import { erc20Abi } from 'viem';
import { mainnet } from 'viem/chains';

import type { Token, TokenId } from '@origin/shared/contracts';

export const MIX_TOKEN: Token = {
  id: `${mainnet.id}:MIX_TOKEN` as TokenId,
  address: ZERO_ADDRESS,
  chainId: mainnet.id,
  abi: erc20Abi,
  decimals: 18,
  name: 'Redeem Mix',
  symbol: 'MIX_TOKEN',
};
