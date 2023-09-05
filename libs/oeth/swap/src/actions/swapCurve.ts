import curve from '@curvefi/api';
import { formatUnits, parseUnits } from 'viem';

import type { EstimateAmount, EstimateRoute } from '../types';

const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const estimateAmount: EstimateAmount = async (tokenIn, tokenOut, amountIn) => {
  if (amountIn === 0n) {
    return 0n;
  }

  console.time('curve getBestRouteAndOutput');
  const routes = await curve.router.getBestRouteAndOutput(
    tokenIn?.address ?? ETH,
    tokenOut?.address ?? ETH,
    formatUnits(amountIn, tokenIn.decimals),
  );
  console.timeEnd('curve getBestRouteAndOutput');
  console.log(
    `curve found ${routes.route.length} routes: ${JSON.stringify(
      routes.route,
      null,
      2,
    )}`,
  );

  return parseUnits(routes.output, tokenOut.decimals);
};

const estimateRoute: EstimateRoute = async (
  tokenIn,
  tokenOut,
  amountIn,
  route,
) => {
  if (amountIn === 0n) {
    return { ...route, estimatedAmount: 0n, gas: 0n, rate: 0 };
  }

  const estimatedAmount = await estimateAmount(tokenIn, tokenOut, amountIn);

  return { ...route, estimatedAmount, gas: 0n, rate: 0 };
};

export default {
  estimateAmount,
  estimateRoute,
};
