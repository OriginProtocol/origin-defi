import { contracts, tokens } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { scale, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { formatUnits } from 'viem';

import type { Token } from '@origin/shared/contracts';
import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const getFunctionName = (tokenIn: Token, tokenOut: Token) => {
  if (tokenIn.symbol === tokens.mainnet.OUSD.symbol) {
    return {
      [tokens.mainnet.DAI.symbol]: 'sellOusdForDai' as const,
      [tokens.mainnet.USDT.symbol]: 'sellOusdForUsdt' as const,
      [tokens.mainnet.USDC.symbol]: 'sellOusdForUsdc' as const,
    }[tokenOut.symbol];
  } else if (tokenOut.symbol === tokens.mainnet.OUSD.symbol) {
    return {
      [tokens.mainnet.DAI.symbol]: 'buyOusdWithDai' as const,
      [tokens.mainnet.USDT.symbol]: 'buyOusdWithUsdt' as const,
      [tokens.mainnet.USDC.symbol]: 'buyOusdWithUsdc' as const,
    }[tokenIn.symbol];
  }
};

const isRouteAvailable: IsRouteAvailable = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  const amtIn = +formatUnits(amountIn, tokenIn.decimals);

  if (amtIn > 25000 || !tokenOut?.address) {
    return false;
  }

  try {
    const balance = await readContract(config, {
      address: tokenOut.address,
      abi: tokenOut.abi,
      functionName: 'balanceOf',
      args: [contracts.mainnet.OUSDFlipper.address],
    });

    const bal = +formatUnits(balance as unknown as bigint, tokenOut.decimals);

    return bal > amtIn;
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  const publicClient = getPublicClient(config);
  const functionName = getFunctionName(tokenIn, tokenOut);

  try {
    if (publicClient && functionName) {
      const scaledAmount = scale(amountIn, tokenIn.decimals, 18);
      const estimate = (
        await publicClient.simulateContract({
          address: contracts.mainnet.OUSDFlipper.address,
          abi: contracts.mainnet.OUSDFlipper.abi,
          functionName,
          args: [scaledAmount],
        })
      )?.result;

      return scale(estimate as unknown as bigint, 18, tokenIn.decimals);
    }
  } catch {}

  return scale(amountIn, tokenIn.decimals, tokenOut.decimals);
};

const estimateGas = async () => {
  return 90000n;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route, slippage },
) => {
  const [estimatedAmount, gas, allowanceAmount, approvalGas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn, slippage }),
      estimateGas(),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
    ]);

  return {
    ...route,
    estimatedAmount,
    allowanceAmount,
    approvalGas,
    gas,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const allowance: Allowance = async (config, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OUSDFlipper.address],
  });

  return allowance as unknown as bigint;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config);

  if (amountIn === 0n || !publicClient || !tokenIn?.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.OUSDFlipper.address, amountIn],
      account: address ?? ZERO_ADDRESS,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async (config, { tokenIn, amountIn }) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.OUSDFlipper.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (config, { tokenIn, tokenOut, amountIn }) => {
  const { address } = getAccount(config);
  const functionName = getFunctionName(tokenIn, tokenOut);

  if (amountIn === 0n || !address || !functionName) {
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Flipper is not approved`);
  }

  const scaledAmount = scale(amountIn, tokenIn.decimals, 18);

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.OUSDFlipper.address,
    abi: contracts.mainnet.OUSDFlipper.abi,
    functionName,
    args: [scaledAmount],
  });
  const hash = await writeContract(config, request);

  return hash;
};

export default {
  isRouteAvailable,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
