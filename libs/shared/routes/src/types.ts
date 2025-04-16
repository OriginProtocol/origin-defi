export type OethRoute =
  | 'mint-vault-oeth'
  | 'redeem-arm-oeth'
  | 'redeem-vault-async-oeth'
  | 'redeem-vault-oeth'
  | 'swap-balancer-oeth'
  | 'swap-curve-oeth'
  | 'swap-curve-oeth-sfrxeth'
  | 'swap-magpie-oeth'
  | 'swap-openOcean-oeth'
  | 'swap-zapper-oeth-eth'
  | 'swap-zapper-oeth-sfrxeth'
  | 'unwrap-oeth-woeth'
  | 'wrap-oeth-oeth';

export type SuperOethRoute =
  | 'mint-vault-superOeth'
  | 'redeem-vault-async-superOeth'
  | 'swap-aerodrome-superOeth'
  | 'swap-curve-superOeth'
  | 'swap-magpie-superOeth'
  | 'swap-openOcean-superOeth'
  | 'swap-zapper-superOeth'
  | 'unwrap-wsuperOeth-superOeth'
  | 'wrap-superOeth-wsuperOeth';

export type OSRoute =
  | 'mint-vault-os'
  | 'mint-zapper-os'
  | 'swap-magpie-os'
  | 'swap-openOcean-os'
  | 'swap-metropolis-os'
  | 'swap-shadow-os'
  | 'swap-swapx-os'
  | 'redeem-vault-async-os'
  | 'unwrap-wos-os'
  | 'wrap-os-wos';

export type OusdRoute =
  | 'mint-vault-ousd'
  | 'swap-flipper-ousd'
  | 'swap-curve-ousd'
  | 'swap-magpie-ousd'
  | 'swap-openOcean-ousd'
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

export type OgnRoute = 'swap-magpie-ogn' | 'swap-openOcean-ogn';
