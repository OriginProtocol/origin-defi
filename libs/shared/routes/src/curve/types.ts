import type { HexAddress } from '@origin/shared/utils';

export type CurveParam = {
  routes: [
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
    HexAddress,
  ];
  swapParams: [
    [bigint, bigint, bigint, bigint, bigint],
    [bigint, bigint, bigint, bigint, bigint],
    [bigint, bigint, bigint, bigint, bigint],
    [bigint, bigint, bigint, bigint, bigint],
    [bigint, bigint, bigint, bigint, bigint],
  ];
  pools: [HexAddress, HexAddress, HexAddress, HexAddress, HexAddress];
};
