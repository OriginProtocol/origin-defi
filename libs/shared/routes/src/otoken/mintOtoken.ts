import { vaults } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import {
  hasKey,
  isNilOrEmpty,
  subPercentage,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  readContracts,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { mul } from 'dnum';
import { erc20Abi, formatUnits } from 'viem';

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

const isRouteAvailable: IsRouteAvailable = async (
  { config },
  { tokenIn, tokenOut },
) => {
  const vault = hasKey(vaults, tokenOut.id) ? vaults[tokenOut.id] : null;

  if (!vault) {
    return false;
  }

  try {
    if (tokenIn?.address) {
      await readContract(config, {
        address: vault.address,
        abi: vault.abi,
        functionName: 'priceUnitMint',
        args: [tokenIn.address],
        chainId: vault.chainId,
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
  const vault = hasKey(vaults, tokenOut.id) ? vaults[tokenOut.id] : null;

  if (!vault || amountIn === 0n || !tokenIn?.address) {
    return 0n;
  }

  const priceUnitMint = await readContract(config, {
    address: vault.address,
    abi: vault.abi,
    functionName: 'priceUnitMint',
    args: [tokenIn.address],
    chainId: vault.chainId,
  });

  return mul([amountIn, tokenIn.decimals], [BigInt(priceUnitMint ?? 0), 18], {
    decimals: tokenOut.decimals,
  })[0];
};

const estimateGas: EstimateGas = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  const vault = hasKey(vaults, tokenOut.id) ? vaults[tokenOut.id] : null;

  if (amountIn === 0n || !publicClient || !tokenIn?.address || !vault) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: vault.address,
      abi: vault.abi,
      functionName: 'mint',
      args: [tokenIn.address, amountIn, minAmountOut[0]],
      account: address,
    });

    return gasEstimate;
  } catch {}

  const [rebaseThreshold, autoAllocateThreshold] = await queryClient.fetchQuery(
    {
      queryKey: ['vault-info', tokenOut.id],
      queryFn: () =>
        readContracts(config, {
          contracts: [
            {
              address: vault.address,
              abi: vault.abi,
              functionName: 'rebaseThreshold',
              chainId: vault.chainId,
            },
            {
              address: vault.address,
              abi: vault.abi,
              functionName: 'autoAllocateThreshold',
              chainId: vault.chainId,
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

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);
  const vault = hasKey(vaults, tokenOut.id) ? vaults[tokenOut.id] : null;

  if (!address || !tokenIn?.address || !vault) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, vault.address],
    chainId: vault.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const vault = hasKey(vaults, tokenOut.id) ? vaults[tokenOut.id] : null;
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (
    amountIn === 0n ||
    !address ||
    !publicClient ||
    !tokenIn?.address ||
    !vault
  ) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [vault.address, amountIn],
      account: address ?? ZERO_ADDRESS,
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

const approve: Approve = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  const vault = hasKey(vaults, tokenOut.id) ? vaults[tokenOut.id] : null;

  if (!tokenIn?.address || !vault) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [vault.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut, estimatedRoute },
) => {
  const vault = hasKey(vaults, tokenOut.id) ? vaults[tokenOut.id] : null;
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address) || !vault) {
    return null;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const estimatedGas =
    estimatedRoute?.gas ??
    (await estimateGas(
      { config, queryClient },
      {
        amountIn,
        slippage,
        tokenIn,
        tokenOut,
        amountOut,
      },
    ));
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: vault.address,
    abi: vault.abi,
    functionName: 'mint',
    args: [tokenIn.address, amountIn, minAmountOut[0]],
    gas,
    chainId: vault.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const mintOtoken = {
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
