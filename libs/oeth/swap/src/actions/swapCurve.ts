import curve from '@curvefi/api';
import { tokens } from '@origin/shared/contracts';
import { waitForTransaction } from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';

import type { HexAddress } from '@origin/shared/utils';

import type {
  EstimateAmount,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';

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

const estimateGas: EstimateGas = async (
  tokenIn,
  tokenOut,
  amountIn,
  _slippage,
) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  try {
    console.time('curve gas estimate');
    const res = await curve.router.estimateGas.swap(
      tokenIn?.address ?? ETH,
      tokenOut?.address ?? ETH,
      formatUnits(amountIn, tokenIn.decimals),
    );
    gasEstimate = parseUnits(res.toString(), tokens.mainnet.ETH.decimals);
    console.timeEnd('curve gas estimate');
  } catch {}

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async (
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
) => {
  if (amountIn === 0n) {
    return { ...route, estimatedAmount: 0n, gas: 0n, rate: 0 };
  }

  const [estimatedAmount, gas] = await Promise.all([
    estimateAmount(tokenIn, tokenOut, amountIn),
    estimateGas(tokenIn, tokenOut, amountIn, slippage),
  ]);

  return {
    ...route,
    estimatedAmount,
    gas,
    rate:
      +formatUnits(amountIn, tokenIn.decimals) /
      +formatUnits(estimatedAmount, tokenOut.decimals),
  };
};

const swap: Swap = async (tokenIn, tokenOut, amountIn) => {
  if (amountIn === 0n) {
    return;
  }

  let isApproved = false;
  try {
    isApproved = await curve.router.isApproved(
      tokenIn?.address ?? ETH,
      formatUnits(amountIn, tokenIn.decimals),
    );
  } catch (e) {
    console.log(`swap curve isApproved error!\n${e.message}`);
  }

  if (!isApproved) {
    try {
      const [hash] = await curve.router.approve(
        tokenIn?.address ?? ETH,
        formatUnits(amountIn, tokenIn.decimals),
      );
      await waitForTransaction({ hash: hash as HexAddress });
      // TODO trigger notification
      console.log('swap curve approval done!');
    } catch (e) {
      console.log(`swap curve approve error!\n${e.message}`);
      return;
    }
  }

  try {
    const { hash } = await curve.router.swap(
      tokenIn?.address ?? ETH,
      tokenOut?.address ?? ETH,
      formatUnits(amountIn, tokenIn.decimals),
    );
    await waitForTransaction({ hash: hash as HexAddress });
    // TODO trigger notification
    console.log(`swap curve done!`);
  } catch (e) {
    // TODO trigger notification
    console.log(`swap curve error!\n${e.message}`);
  }
};

export default {
  estimateAmount,
  estimateRoute,
  swap,
};
