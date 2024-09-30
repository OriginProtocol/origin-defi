import { isNilOrEmpty } from './isNilOrEmpty';

import type { HexAddress } from './types';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';
export const ETH_ADDRESS_CURVE = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const isAddressEqual = (
  a?: HexAddress | string,
  b?: HexAddress | string,
) => {
  if (a === undefined && b === undefined) {
    return true;
  }

  if (a === undefined || b === undefined) {
    return false;
  }

  return a?.toLowerCase() === b?.toLowerCase();
};

export const isHexAddress = (input?: string) => {
  if (!input || isNilOrEmpty(input)) {
    return false;
  }

  return /^0x[a-fA-F0-9]{40}$/.test(input);
};
