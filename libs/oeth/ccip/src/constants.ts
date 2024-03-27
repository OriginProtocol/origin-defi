import { arbitrum, mainnet } from 'viem/chains';

export const selectorIds: Record<number, bigint> = {
  [mainnet.id]: 5009297550715157269n,
  [arbitrum.id]: 4949039107694359620n,
};
