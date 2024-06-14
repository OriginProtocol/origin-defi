/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.csv' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any[];
  export default value;
}

declare interface Point {
  index: number;
  amm_in: number;
  time: string;
  offer: number;
  won_trade: string;
  final_out: number;
  base_amount: number;
  queue_amount: number;
  bought_amount: number;
}

declare interface State {
  interval: number | undefined;
  index: number;
  total: number;
  muted: boolean;
  span: number;
}
