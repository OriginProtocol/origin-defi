export type OethRoute =
  | 'mint-vault-oeth'
  | 'redeem-arm-oeth'
  | 'redeem-vault-async-oeth'
  | 'redeem-vault-oeth'
  | 'swap-balancer-oeth'
  | 'swap-curve-oeth'
  | 'swap-curve-oeth-sfrxeth'
  | 'swap-zapper-oeth-eth'
  | 'swap-zapper-oeth-sfrxeth'
  | 'unwrap-oeth-woeth'
  | 'wrap-oeth-oeth';

export type SuperOethbRoute =
  | 'mint-vault-oeth'
  | 'redeem-vault-async-superOethb'
  | 'swap-aerodrome-superOethb'
  | 'swap-curve-superOethb'
  | 'swap-zapper-superOethb'
  | 'unwrap-oeth-woeth'
  | 'wrap-oeth-oeth';

export type OSRoute =
  | 'mint-vault-os'
  | 'mint-zapper-os'
  | 'swap-magpie-os'
  | 'swap-metropolis-os'
  | 'swap-swapx-os'
  // | 'swap-shadow-os'
  | 'redeem-vault-async-os'
  | 'unwrap-wos-os'
  | 'wrap-os-wos';

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

export type ARMRoute = 'deposit-arm-lido' | 'deposit-arm-zapper';
