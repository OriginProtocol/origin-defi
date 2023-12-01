import { contracts, tokens } from '@origin/shared/contracts';
import { prepareWriteContractWithTxTracker } from '@origin/shared/providers';
import { isNilOrEmpty, scale } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
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

const isRouteAvailable: IsRouteAvailable = async ({
  amountIn,
  tokenIn,
  tokenOut,
}) => {
  const amtIn = +formatUnits(amountIn, tokenIn.decimals);

  if (amtIn > 25000) {
    return false;
  }

  try {
    const balance = await readContract({
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

const estimateAmount: EstimateAmount = async ({
  amountIn,
  tokenIn,
  tokenOut,
}) => {
  const publicClient = getPublicClient();
  const scaledAmount = scale(amountIn, tokenIn.decimals, 18);

  try {
    const estimate = (
      await publicClient.simulateContract({
        address: contracts.mainnet.OUSDFlipper.address,
        abi: contracts.mainnet.OUSDFlipper.abi,
        functionName: getFunctionName(tokenIn, tokenOut),
        args: [scaledAmount],
      })
    )?.result;

    return scale(estimate as unknown as bigint, 18, tokenIn.decimals);
  } catch {}

  return scale(amountIn, tokenIn.decimals, tokenOut.decimals);
};

const estimateGas = async () => {
  return 90000n;
};

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  route,
}) => {
  const [estimatedAmount, gas, allowanceAmount, approvalGas] =
    await Promise.all([
      estimateAmount({ tokenIn, tokenOut, amountIn }),
      estimateGas(),
      allowance({ tokenIn, tokenOut }),
      estimateApprovalGas({ amountIn, tokenIn, tokenOut }),
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

const allowance: Allowance = async ({ tokenIn }) => {
  const { address } = getAccount();

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OUSDFlipper.address],
  });

  return allowance as unknown as bigint;
};

const estimateApprovalGas: EstimateApprovalGas = async ({
  tokenIn,
  amountIn,
}) => {
  let approvalEstimate = 0n;
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient();

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.OUSDFlipper.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 60000n;
  }

  return approvalEstimate;
};

const approve: Approve = async ({ tokenIn, tokenOut, amountIn }) => {
  const { request } = await prepareWriteContract({
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.OUSDFlipper.address, amountIn],
  });
  const { hash } = await writeContract(request);

  return hash;
};

const swap: Swap = async ({ tokenIn, tokenOut, amountIn }) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance({ tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Flipper is not approved`);
  }

  const scaledAmount = scale(amountIn, tokenIn.decimals, 18);

  const { request } = await prepareWriteContractWithTxTracker({
    address: contracts.mainnet.OUSDFlipper.address,
    abi: contracts.mainnet.OUSDFlipper.abi,
    functionName: getFunctionName(tokenIn, tokenOut),
    args: [scaledAmount],
  });
  const { hash } = await writeContract(request);

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
