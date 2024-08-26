import { contracts, tokens } from '@origin/shared/contracts';
import {
  isNilOrEmpty,
  subPercentage,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { div, from, lt } from 'dnum';
import { encodeAbiParameters, encodePacked, erc20Abi, formatUnits } from 'viem';

import { MAX_PRICE } from '../constants';
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

const POOL_FEE = 1;

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
  address: HexAddress,
) =>
  ({
    [`${tokens.base.ETH.id}_${tokens.base.superOETHb.id}`]: [
      `0x${swapCodes.WRAP_ETH}${swapCodes.V3_SWAP_EXACT_IN}`,
      [
        encodeAbiParameters(abis.WRAP_ETH, [address, amountIn]),
        encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
          address,
          amountIn,
          minAmountOut,
          getPath(tokens.base.WETH.address, tokens.base.superOETHb.address),
          true,
        ]),
      ],
    ],
    [`${tokens.base.WETH.id}_${tokens.base.superOETHb.id}`]: [
      `0x${swapCodes.V3_SWAP_EXACT_IN}`,
      [
        encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
          address,
          amountIn,
          minAmountOut,
          getPath(tokens.base.WETH.address, tokens.base.superOETHb.address),
          true,
        ]),
      ],
    ],
    [`${tokens.base.superOETHb.id}_${tokens.base.ETH.id}`]: [
      `0x${swapCodes.V3_SWAP_EXACT_IN}${swapCodes.UNWRAP_WETH}`,
      [
        encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
          contracts.base.aerodromeUniversalRouter.address,
          amountIn,
          minAmountOut,
          getPath(tokens.base.superOETHb.address, tokens.base.WETH.address),
          true,
        ]),
        encodeAbiParameters(abis.UNWRAP_WETH, [address, minAmountOut]),
      ],
    ],
    [`${tokens.base.superOETHb.id}_${tokens.base.WETH.id}`]: [
      `0x${swapCodes.V3_SWAP_EXACT_IN}`,
      [
        encodeAbiParameters(abis.V3_SWAP_EXACT_IN, [
          address,
          amountIn,
          minAmountOut,
          getPath(tokens.base.superOETHb.address, tokens.base.WETH.address),
          true,
        ]),
      ],
    ],
  })[`${tokenIn.id}_${tokenOut.id}`];

const isRouteAvailable: IsRouteAvailable = async (clients, args) => {
  try {
    const estimate = await estimateAmount(clients, args);
    const { amountIn, tokenIn, tokenOut } = args;

    return lt(
      div([amountIn, tokenIn.decimals], [estimate, tokenOut.decimals]),
      from(MAX_PRICE),
    );
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (
  { config },
  { amountIn, tokenIn, tokenOut },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const quote = await readContract(config, {
    address: contracts.base.aerodromeQuoter.address,
    abi: contracts.base.aerodromeQuoter.abi,
    functionName: 'quoteExactInputSingle',
    args: [
      {
        amountIn,
        tokenIn: tokenIn?.address ?? tokens.base.WETH.address,
        tokenOut: tokenOut?.address ?? tokens.base.WETH.address,
        tickSpacing: 1,
        sqrtPriceLimitX96: 0n,
      },
    ],
  });

  return quote[0];
};

const estimateGas: EstimateGas = async (
  { config },
  { amountIn, amountOut, slippage, tokenIn, tokenOut },
) => {
  let gasEstimate = 200000n;

  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, {
    chainId: contracts.mainnet.OETHZapper.chainId,
  });

  if (amountIn === 0n || !address || !publicClient) {
    return gasEstimate;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.base.aerodromeUniversalRouter.address,
      abi: contracts.base.aerodromeUniversalRouter.abi,
      functionName: 'execute',
      args: getArgs(tokenIn, tokenOut, amountIn, minAmountOut[0], address),
      ...(tokenIn.symbol === 'ETH' && { value: amountIn }),
      ...(tokenOut.symbol === 'ETH' && { value: amountOut }),
    });
  } catch {}

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (!address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address ?? tokens.base.WETH.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.base.aerodromeUniversalRouter.address],
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

  if (amountIn === 0n || !address || !publicClient) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address ?? tokens.base.WETH.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [contracts.base.aerodromeUniversalRouter.address, amountIn],
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
    estimateApprovalGas(client, { tokenIn, tokenOut, amountIn }),
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
  const { request } = await simulateContract(config, {
    address: tokenIn.address ?? tokens.base.WETH.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contracts.base.aerodromeUniversalRouter.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, amountOut, slippage },
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
    throw new Error(`Swap aerodrome is not approved`);
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const { request } = await simulateContract(config, {
    address: contracts.base.aerodromeUniversalRouter.address,
    abi: contracts.base.aerodromeUniversalRouter.abi,
    chainId: contracts.base.aerodromeUniversalRouter.chainId,
    functionName: 'execute',
    args: getArgs(
      tokenIn,
      tokenOut,
      amountIn,
      minAmountOut[0],
      address ?? ZERO_ADDRESS,
    ),
    ...(tokenIn.symbol === 'ETH' && { value: amountIn }),
    ...(tokenOut.symbol === 'ETH' && { value: amountOut }),
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const swapAerodromeSuperOethb = {
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
