import type { Contract, Token } from '@origin/shared/contracts';

export type RedeemEstimate = {
  token: Token;
  amount: bigint;
};

export type RedeemState = {
  tokenIn: Token;
  vaultContract: Contract;
  gasBuffer: bigint;
  trackEvent: (event: RedeemTrackEvent) => void;
  amountIn: bigint;
  amountOut: bigint;
  split: RedeemEstimate[];
  gas: bigint;
  rate: number;
  isEstimateLoading: boolean;
  isRedeemWaitingForSignature: boolean;
  isRedeemLoading: boolean;
};

export type RedeemTrackEvent =
  | { name: 'redeem_started'; redeem_amount: bigint }
  | { name: 'redeem_complete'; redeem_amount: bigint }
  | { name: 'redeem_failed'; redeem_amount: bigint; redeem_error: string }
  | { name: 'redeem_rejected'; redeem_amount: bigint }
  | { name: 'change_input_amount'; change_amount_to: bigint }
  | { name: 'change_swap_route'; change_route_to: string }
  | { name: 'open_settings' }
  | { name: 'show_swap_routes' }
  | { name: 'change_price_tolerance'; price_tolerance: number };

export type BridgeTrackEvent =
  | { name: 'bridge_started'; bridge_amount: bigint; bridge_token: string }
  | { name: 'bridge_complete'; bridge_amount: bigint; bridge_token: string }
  | {
      name: 'bridge_failed';
      bridge_amount: bigint;
      bridge_token: string;
      bridge_error: string;
    }
  | { name: 'bridge_rejected'; bridge_amount: bigint; bridge_token: string };
