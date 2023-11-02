import type { Contract } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';

export type CurveState = {
  CurveRegistryExchange: Contract | null;
  OethPoolUnderlyings: HexAddress[];
  OusdMetaPoolUnderlyings: HexAddress[];
};
