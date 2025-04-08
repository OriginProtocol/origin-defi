import { contracts, tokens } from '@origin/shared/contracts';
import { subPercentage, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import {
  encodeAbiParameters,
  encodePacked,
  erc20Abi,
  formatUnits,
  maxUint256,
} from 'viem';

import { defaultRoute } from '../defaultRoute';

import type { Token } from '@origin/shared/contracts';
import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';

const SENDER_ADRESS_CODE = '0x0000000000000000000000000000000000000001';
const ROUTER_ADRESS_CODE = '0x0000000000000000000000000000000000000002';
const POOL_FEE = 1;
const deadline = 999999999999999999n;

const swapCodes = {
  V3_SWAP_EXACT_IN: '00',
  WRAP_ETH: '0b',
  UNWRAP_WETH: '0c',
};

const abis = {
  V3_SWAP_EXACT_IN: [
    {
      internalType: 'address',
      name: 'recipient',
      type: 'address',
    },
    {
      internalType: 'uint256',
      name: 'amount',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: 'minAmountOut',
      type: 'uint256',
    },
    {
      internalType: 'bytes',
      name: 'path',
      type: 'bytes',
    },
    {
      internalType: 'bool',
      name: 'payerIsUser',
      type: 'bool',
    },
  ],
  WRAP_ETH: [
    {
      internalType: 'address',
      name: 'recipient',
      type: 'address',
    },
    {
      internalType: 'uint256',
      name: 'amount',
      type: 'uint256',
    },
  ],
  UNWRAP_WETH: [
    {
      internalType: 'address',
      name: 'recipient',
      type: 'address',
    },
    {
      internalType: 'uint256',
      name: 'minAmountOut',
      type: 'uint256',
    },
  ],
};

const getPath = (addressIn: HexAddress, addressOut: HexAddress) =>
  encodePacked(
    ['address', 'uint24', 'address'],
    [addressIn, POOL_FEE, addressOut],
  );

const getArgs = (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
  minAmountOut: bigint,
) =>
  (
    ({
      [`${tokens.sonic.S.id}_${tokens.sonic.OS.id}`]: [
        `0x${swapCodes.WRAP_ETH}${swapCodes.V3_SWAP_EXACT_IN}`,
        [
          encodeAbiParameters(abis.WRAP_ETH, [ROUTER_ADRESS_CODE, amountIn]),
          encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
            SENDER_ADRESS_CODE,
            amountIn,
            minAmountOut,
            getPath(tokens.sonic.wS.address, tokens.sonic.OS.address),
            false,
          ]),
        ],
        deadline,
      ],
      [`${tokens.sonic.wS.id}_${tokens.sonic.OS.id}`]: [
        `0x${swapCodes.V3_SWAP_EXACT_IN}`,
        [
          encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
            SENDER_ADRESS_CODE,
            amountIn,
            minAmountOut,
            getPath(tokens.sonic.wS.address, tokens.sonic.OS.address),
            true,
          ]),
        ],
        deadline,
      ],
      [`${tokens.sonic.OS.id}_${tokens.sonic.S.id}`]: [
        `0x${swapCodes.V3_SWAP_EXACT_IN}${swapCodes.UNWRAP_WETH}`,
        [
          encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
            ROUTER_ADRESS_CODE,
            amountIn,
            minAmountOut,
            getPath(tokens.sonic.OS.address, tokens.sonic.wS.address),
            true,
          ]),
          encodeAbiParameters(abis.UNWRAP_WETH, [
            SENDER_ADRESS_CODE,
            minAmountOut,
          ]),
        ],
        deadline,
      ],
      [`${tokens.sonic.OS.id}_${tokens.sonic.wS.id}`]: [
        `0x${swapCodes.V3_SWAP_EXACT_IN}`,
        [
          encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
            SENDER_ADRESS_CODE,
            amountIn,
            minAmountOut,
            getPath(tokens.sonic.OS.address, tokens.sonic.wS.address),
            true,
          ]),
        ],
        deadline,
      ],
    }) as const
  )[`${tokenIn.id}_${tokenOut.id}`];

const isRouteAvailable: IsRouteAvailable = async (
  client,
  { tokenIn, tokenOut },
) => {
  const path = getArgs(tokenIn, tokenOut, 1n, 0n);

  return !!path;
};

const estimateAmount: EstimateAmount = async (
  { config },
  { amountIn, tokenIn, tokenOut },
) => {
  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  if (amountIn === 0n || !publicClient) {
    return 0n;
  }

  const { address } = getAccount(config);

  try {
    const quote = await simulateContract(config, {
      address: contracts.sonic.shadowQuoter.address,
      abi: contracts.sonic.shadowQuoter.abi,
      functionName: 'quoteExactInputSingle',
      chainId: tokenIn.chainId,
      args: [
        {
          tokenIn: tokenIn?.address ?? tokens.sonic.wS.address,
          tokenOut: tokenOut?.address ?? tokens.sonic.wS.address,
          amountIn,
          sqrtPriceLimitX96: 0n,
          tickSpacing: 1,
        },
      ],
      account: address ?? ZERO_ADDRESS,
    });

    return quote?.result?.[0] ?? 0n;
  } catch {}

  return 0n;
};

const estimateGas: EstimateGas = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );
  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.sonic.shadowRouter.address,
      abi: contracts.sonic.shadowRouter.abi,
      functionName: 'execute',
      args: getArgs(
        tokenIn,
        tokenOut,
        amountIn,
        minAmountOut[0],
      ) as unknown as [HexAddress, HexAddress[], bigint],
      ...(!tokenIn.address && { value: amountIn }),
    });
  } catch {
    gasEstimate = 400000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (!address) {
    return 0n;
  }

  if (!tokenIn.address) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.sonic.shadowRouter.address],
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

  if (amountIn === 0n || !address || !publicClient || !tokenIn.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.sonic.shadowRouter.address, amountIn],
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
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.sonic.shadowRouter.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut, estimatedRoute },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address) {
    return null;
  }

  const approved = await allowance(
    { config, queryClient },
    { tokenIn, tokenOut },
  );

  if (approved < amountIn) {
    throw new Error(`Swap shadow is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const { request } = await simulateContract(config, {
    address: contracts.sonic.shadowRouter.address,
    abi: contracts.sonic.shadowRouter.abi,
    chainId: contracts.sonic.shadowRouter.chainId,
    functionName: 'execute',
    args: getArgs(tokenIn, tokenOut, amountIn, minAmountOut[0]) as unknown as [
      HexAddress,
      HexAddress[],
      bigint,
    ],
    ...(!tokenIn.address && { value: amountIn }),
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const osShadow = {
  ...defaultRoute,
  isRouteAvailable,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};
