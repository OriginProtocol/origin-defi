export type OethRoute =
  | 'mint-vault-oeth'
  | 'redeem-vault-oeth'
  | 'swap-curve-oeth'
  | 'swap-curve-oeth-eth'
  | 'swap-curve-oeth-sfrxeth'
  | 'swap-zapper-oeth-eth'
  | 'swap-zapper-oeth-sfrxeth'
  | 'unwrap-oeth-woeth'
  | 'wrap-oeth-oeth';

export type OusdRoute =
  | 'mint-vault-ousd'
  | 'swap-flipper-ousd'
  | 'swap-curve-ousd'
  | 'swap-sushiswap-ousd'
  | 'swap-uniswap-v2-ousd'
  | 'swap-uniswap-v3-ousd'
  | 'unwrap-ousd-wousd'
  | 'wrap-ousd-wousd';

export type PrimeRoute =
  | 'restake-prime'
  | 'swap-uniswap-prime'
  | 'swap-zapper-prime';
