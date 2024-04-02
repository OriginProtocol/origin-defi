import type { Chain } from 'viem';

export const addressLink = (
  chain: Chain | undefined,
  address: string | undefined,
) =>
  `${chain?.blockExplorers?.default.url ?? 'https://etherscan.io'}/address/${address}`;

export const txLink = (chain: Chain | undefined, hash: string | undefined) =>
  `${chain?.blockExplorers?.default.url ?? 'https://etherscan.io'}/tx/${hash}`;
