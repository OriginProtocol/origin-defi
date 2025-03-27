import { arbitrum, base, mainnet, sonic } from 'viem/chains';

export const OPEN_OCEAN_API_URL = 'https://open-api.openocean.finance/v4';

export const openOceanNativeCurrencies = {
  [mainnet.id.toString()]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  [base.id.toString()]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  [arbitrum.id.toString()]: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  [sonic.id.toString()]: '0x0000000000000000000000000000000000000000',
} as const;

export const openOceanExchangeAddresses = {
  [mainnet.id.toString()]: '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
  [base.id.toString()]: '0x6352a56caadc4f1e25cd6c75970fa768a3304e64',
  [arbitrum.id.toString()]: '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
  [sonic.id.toString()]: '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
} as const;
