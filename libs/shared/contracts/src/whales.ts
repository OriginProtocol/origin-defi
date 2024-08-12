// This is a list of addresses of big token holders, they are used for simulating Tx and estimate gas fees

export const whales = {
  mainnet: {
    ETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    OETH: '0x94B17476A93b3262d87B9a326965D1E91f9c13E7',
    wOETH: '0xC460B0b6c9b578A4Cb93F99A691e16dB96Ee5833',
    OUSD: '0x70fCE97d671E81080CA3ab4cc7A59aAc2E117137',
    wOUSD: '0x3dD413Fd4D03b1d8fD2C9Ed34553F7DeC3B26F5C',
    WETH: '0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E',
  },
  arbitrum: {
    ETH: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
    wOETH: '0x9f4D6f98F29c1D482bCF0F85683155E0B3e015f5',
    WETH: '0x70d95587d40A2caf56bd97485aB3Eec10Bee6336',
  },
} as const;
