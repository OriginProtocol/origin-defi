import { contracts, tokens } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { isNilOrEmpty, subPercentage } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  readContracts,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits, maxUint256, parseUnits } from 'viem';

import { GAS_BUFFER } from '../constants';
import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async (
  { config },
  { tokenOut, amountIn },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const [previewRedeem, priceUnitMint] = await readContracts(config, {
    contracts: [
      {
        address: tokens.mainnet.sfrxETH.address,
        abi: tokens.mainnet.sfrxETH.abi,
        functionName: 'previewRedeem',
        args: [amountIn],
        chainId: tokens.mainnet.sfrxETH.chainId,
      },
      {
        address: contracts.mainnet.OETHVault.address,
        abi: contracts.mainnet.OETHVault.abi,
        functionName: 'priceUnitMint',
        args: [tokens.mainnet.frxETH.address],
        chainId: contracts.mainnet.OETHVault.chainId,
      },
    ],
  });

  return parseUnits(
    (
      +formatUnits(
        previewRedeem?.result as unknown as bigint,
        tokens.mainnet.frxETH.decimals,
      ) *
      +formatUnits(
        priceUnitMint?.result as unknown as bigint,
        tokenOut.decimals,
      )
    ).toString(),
    tokenOut.decimals,
  );
};

const estimateGas: EstimateGas = async () => {
  return 90000n;
};

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (!address) {
    return 0n;
  }

  if (!tokenIn?.address || !tokenOut?.address) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHZapper.address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (
    amountIn === 0n ||
    !address ||
    !tokenIn?.address ||
    !tokenOut?.address ||
    !publicClient
  ) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [contracts.mainnet.OETHZapper.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route, slippage },
) => {
  if (amountIn === 0n) {
    return {
      ...route,
      estimatedAmount: 0n,
      gas: 0n,
      rate: 0,
      allowanceAmount: 0n,
      approvalGas: 0n,
    };
  }

  const [estimatedAmount, gas, allowanceAmount, approvalGas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn }),
      estimateGas(config, { tokenIn, tokenOut, amountIn, slippage }),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { tokenIn, tokenOut, amountIn }),
    ]);

  return {
    ...route,
    estimatedAmount,
    gas,
    approvalGas,
    allowanceAmount,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const approve: Approve = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  if (!tokenIn?.address || !tokenOut?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contracts.mainnet.OETHZapper.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`Swap zapper sfrxETH is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const estimatedGas = await estimateGas(
    { config, queryClient },
    {
      amountIn,
      slippage,
      tokenIn,
      tokenOut,
      amountOut,
    },
  );
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.OETHZapper.address,
    abi: contracts.mainnet.OETHZapper.abi,
    functionName: 'depositSFRXETH',
    args: [amountIn, minAmountOut[0]],
    gas,
    chainId: contracts.mainnet.OETHZapper.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const swapZapperOethSfrxeth = {
  ...defaultRoute,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
