/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.csv' {
  const value: any[];
  export default value;
}

declare interface Point {
  index: number;
  is_amm_base_in: string;
  amm_in: number;
  amm_out: number;
  price_orig: number;
  time: string;
  offer: number;
  won_trade: string;
  final_out: number;
  mmprice: number;
  market_drop: string;
  base_amount: number;
  asset_amount: number;
  queue_amount: number;
  fee: number;
  amm_value: number;
  bought_amount: number;
  sold_amount: number;
}

declare interface State {
  interval: number | undefined;
  index: number;
  total: number;
}
