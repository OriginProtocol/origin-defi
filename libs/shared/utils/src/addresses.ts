import type { HexAddress } from './types';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';
export const ETH_ADDRESS_CURVE = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const isAddressEqual = (a: HexAddress, b: HexAddress) => {
  return a?.toLowerCase() === b?.toLowerCase();
};
