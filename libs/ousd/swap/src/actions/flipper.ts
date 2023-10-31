import { formatUnits } from 'viem';

import type { IsRouteAvailable } from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async ({ amountIn, tokenIn }) => {
  if (amountIn === 0n) {
    return true;
  }

  return +formatUnits(amountIn, tokenIn.decimals) <= 25000;
};

export default {
  isRouteAvailable,
};
