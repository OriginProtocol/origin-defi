import { arbitrum, base, mainnet, sonic } from 'viem/chains';

export const MAGPIE_API_URL = 'https://api.magpiefi.xyz';

export const magpieNetworks = {
  [mainnet.id.toString()]: 'ethereum',
  [base.id.toString()]: 'base',
  [arbitrum.id.toString()]: 'arbitrum',
  [sonic.id.toString()]: 'sonic',
};
