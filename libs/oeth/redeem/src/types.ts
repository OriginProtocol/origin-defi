import type { Token } from '@origin/shared/contracts';

export type RedeemEstimate = {
  token: Token;
  amount: bigint;
};

export type RedeemState = {
  amountIn: bigint;
  amountOut: bigint;
  split: RedeemEstimate[];
  gas: bigint;
  rate: number;
  slippage: number;
  isEstimateLoading: boolean;
  isRedeemLoading: boolean;
};
