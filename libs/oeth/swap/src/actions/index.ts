import mintVault from './mintVault';
import redeemMix from './redeemMix';

export const swapActions = {
  'swap-curve': mintVault,
  'swap-zapper': redeemMix,
  'mint-vault': redeemMix,
  'redeem-mix': redeemMix,
  'wrap-oeth': redeemMix,
  'unwrap-woeth': redeemMix,
};
