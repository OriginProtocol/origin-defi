import { contracts } from '@origin/shared/contracts';
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
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { base, mainnet } from 'viem/chains';

import { GAS_BUFFER } from '../constants';
import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';
import type { EstimateAmount } from '@origin/shared/providers';

const vaults = {
  [mainnet.id.toString()]: contracts.mainnet.OETHVault,
  [base.id.toString()]: contracts.base.superOETHbVault,
};

const isRouteAvailable: IsRouteAvailable = async ({ config }, { tokenIn }) => {
  try {
    if (tokenIn?.address) {
      await readContract(config, {
        address: vaults[tokenIn.chainId].address,
        abi: vaults[tokenIn.chainId].abi,
        functionName: 'priceUnitMint',
        args: [tokenIn.address],
        chainId: vaults[tokenIn.chainId].chainId,
      });

      return true;
    }
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  if (amountIn === 0n || !tokenIn?.address) {
    return 0n;
  }

  const priceUnitMint = await readContract(config, {
    address: vaults[tokenIn.chainId].address,
    abi: vaults[tokenIn.chainId].abi,
    functionName: 'priceUnitMint',
    args: [tokenIn.address],
    chainId: vaults[tokenIn.chainId].chainId,
  });

  return parseUnits(
    (
      +formatUnits(amountIn, tokenIn.decimals) *
      +formatUnits(priceUnitMint as unknown as bigint, 18)
    ).toString(),
    tokenOut.decimals,
  );
};

const estimateGas: EstimateGas = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  if (amountIn === 0n || !publicClient || !tokenIn?.address) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: vaults[tokenIn.chainId].address,
      abi: vaults[tokenIn.chainId].abi,
      functionName: 'mint',
      args: [tokenIn.address, amountIn, minAmountOut[0]],
      account: address,
    });

    return gasEstimate;
  } catch {}

  const [rebaseThreshold, autoAllocateThreshold] = await queryClient.fetchQuery(
    {
      queryKey: ['vault-info', tokenOut.address],
      queryFn: () =>
        readContracts(config, {
          contracts: [
            {
              address: vaults[tokenIn.chainId].address,
              abi: vaults[tokenIn.chainId].abi,
              functionName: 'rebaseThreshold',
              chainId: tokenIn.chainId,
            },
            {
              address: vaults[tokenIn.chainId].address,
              abi: vaults[tokenIn.chainId].abi,
              functionName: 'autoAllocateThreshold',
              chainId: tokenIn.chainId,
            },
          ],
        }),
      staleTime: Infinity,
    },
  );

  gasEstimate = 220000n;
  if (amountIn > (autoAllocateThreshold?.result as bigint)) {
    gasEstimate = 2900000n;
  } else if (amountIn > (rebaseThreshold?.result as bigint)) {
    gasEstimate = 510000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, vaults[tokenIn.chainId].address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (amountIn === 0n || !address || !publicClient || !tokenIn?.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [vaults[tokenIn.chainId].address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async (
  client,
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

  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount(client, { tokenIn, tokenOut, amountIn }),
    allowance(client, { tokenIn, tokenOut }),
    estimateApprovalGas(client, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(client, {
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
    amountOut: estimatedAmount,
  });

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

const approve: Approve = async ({ config }, { tokenIn, amountIn }) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [vaults[tokenIn.chainId].address, amountIn],
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
    throw new Error(`Mint vault is not approved`);
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
    address: vaults[tokenIn.chainId].address,
    abi: vaults[tokenIn.chainId].abi,
    functionName: 'mint',
    args: [tokenIn.address, amountIn, minAmountOut[0]],
    gas,
    chainId: vaults[tokenIn.chainId].chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const mintVaultOeth = {
  ...defaultRoute,
  isRouteAvailable,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
