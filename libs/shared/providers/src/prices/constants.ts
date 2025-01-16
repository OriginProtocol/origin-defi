/* eslint-disable @typescript-eslint/no-explicit-any */
import { OETH_REDEEM_FEE } from '@origin/shared/constants';
import {
  ChainlinkAggregatorABI,
  contracts,
  tokens,
} from '@origin/shared/contracts';
import { from } from 'dnum';
import { pathOr } from 'ramda';
import { parseUnits } from 'viem';
import { arbitrum, base, mainnet, optimism } from 'viem/chains';

import type { Dnum } from 'dnum';

export const coingeckoApiEndpoint = 'https://api.coingecko.com/api/v3';

export const coingeckoTokenIds = {
  ETH: 'ethereum',
  WETH: 'weth',
  DAI: 'dai',
  USDC: 'usd-coin',
  USDT: 'tether',
  OETH: 'origin-ether',
  OGN: 'origin-protocol',
  wOETH: 'origin-ether',
  OUSD: 'origin-dollar',
  wOUSD: 'origin-dollar',
  stETH: 'staked-ether',
  rETH: 'rocket-pool-eth',
  frxETH: 'frax-ether',
  sfrxETH: 'staked-frax-ether',
  FRAX: 'frax',
} as const;

export const chainlinkOraclesMainnet = {
  ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  DAI_USD: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
  USDC_USD: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
  USDT_USD: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
  FRAX_USD: '0xb9e1e3a9feff48998e45fa90847ed4d467e8bcfd',
  frxETH_ETH: '0xc58f3385fbc1c8ad2c0c9a061d7c13b141d7a5df',
  stETH_ETH: '0x86392dc19c0b719886221c78ab11eb8cf5c52812',
  rETH_ETH: '0x536218f9e9eb48863970252233c8f271f554c2d0',
} as const;

export const chainlinkOraclesArbitrum = {
  ETH_USD: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
  wOETH_OETH: '0x03a1f4b19aaeA6e68f0f104dc4346dA3E942cC45',
} as const;

export const chainlinkOraclesBase = {
  ETH_USD: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
  AERO_USD: '0x4EC5970fC728C5f65ba413992CD5fF6FD70fcfF0',
  OGN_USD: '0x91D7AEd72bF772A0DA30199B925aCB866ACD3D9e',
} as const;

export const chainlinkOraclesOptimism = {
  ETH_USD: '0x13e3Ee699D1909E989722E753853AE30b17e08c5',
} as const;

export const fixedOracleSonic = {
  OS_wS: '0xE68e0C66950a7e02335fc9f44daa05D115c4E88B',
};

const chainLinkUsdMapper = (data: any) => [pathOr(0n, [1], data), 8] as Dnum;
const chainLinkEthMapper = (data: any) => [pathOr(0n, [1], data), 18] as Dnum;
const diaOracleUsdMapper = (data: any) => [pathOr(0n, [0], data), 8] as Dnum;

export const priceOptions = {
  '1:ETH_USD': {
    type: 'wagmi',
    id: '1:ETH_USD',
    config: {
      address: chainlinkOraclesMainnet.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:OETH_USD': {
    type: 'wagmi',
    id: '1:OETH_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OETH/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  '1:OUSD_USD': {
    type: 'wagmi',
    id: '1:OUSD_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OUSD/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  '1:DAI_USD': {
    type: 'wagmi',
    id: '1:DAI_USD',
    config: {
      address: chainlinkOraclesMainnet.DAI_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:USDC_USD': {
    type: 'wagmi',
    id: '1:USDC_USD',
    config: {
      address: chainlinkOraclesMainnet.USDC_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:USDT_USD': {
    type: 'wagmi',
    id: '1:USDT_USD',
    config: {
      address: chainlinkOraclesMainnet.USDT_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:FRAX_USD': {
    type: 'wagmi',
    id: '1:FRAX_USD',
    config: {
      address: chainlinkOraclesMainnet.FRAX_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:frxETH_1:ETH': {
    type: 'wagmi',
    id: '1:frxETH_1:ETH',
    config: {
      address: chainlinkOraclesMainnet.frxETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '1:frxETH_USD': {
    type: 'derived',
    id: '1:frxETH_USD',
    dependsOn: ['1:frxETH_1:ETH', '1:ETH_USD'],
  },
  '1:rETH_1:ETH': {
    type: 'wagmi',
    id: '1:rETH_1:ETH',
    config: {
      address: chainlinkOraclesMainnet.rETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '1:rETH_USD': {
    type: 'derived',
    id: '1:rETH_USD',
    dependsOn: ['1:rETH_1:ETH', '1:ETH_USD'],
  },
  '1:stETH_1:ETH': {
    type: 'wagmi',
    id: '1:stETH_1:ETH',
    config: {
      address: chainlinkOraclesMainnet.stETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '1:stETH_USD': {
    type: 'derived',
    id: '1:stETH_USD',
    dependsOn: ['1:stETH_1:ETH', '1:ETH_USD'],
  },
  '1:wOETH_1:ETH': {
    type: 'derived',
    id: '1:wOETH_1:ETH',
    dependsOn: ['1:wOETH_1:OETH', '1:OETH_1:ETH'],
  },
  '1:wOETH_1:OETH': {
    type: 'wagmi',
    id: '1:wOETH_1:OETH',
    config: {
      address: tokens.mainnet.wOETH.address,
      abi: tokens.mainnet.wOETH.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.wOETH.decimals)],
      chainId: tokens.mainnet.wOETH.chainId,
    },
    mapResult: (woeth_oeth: bigint) => {
      return [woeth_oeth, tokens.mainnet.OETH.decimals];
    },
  },
  '1:OETH_1:wOETH': {
    type: 'wagmi',
    id: '1:OETH_1:wOETH',
    config: {
      address: tokens.mainnet.wOETH.address,
      abi: tokens.mainnet.wOETH.abi,
      functionName: 'previewMint',
      args: [parseUnits('1', tokens.mainnet.OETH.decimals)],
      chainId: tokens.mainnet.wOETH.chainId,
    },
    mapResult: (oeth_woeth: bigint) => {
      return [oeth_woeth, tokens.mainnet.wOETH.decimals];
    },
  },
  '1:wOETH_USD': {
    type: 'derived',
    id: '1:wOETH_USD',
    dependsOn: ['1:wOETH_1:OETH', '1:OETH_USD'],
  },
  '1:wOUSD_1:OUSD': {
    type: 'wagmi',
    id: '1:wOUSD_1:OUSD',
    config: {
      address: tokens.mainnet.wOUSD.address,
      abi: tokens.mainnet.wOUSD.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.wOUSD.decimals)],
      chainId: tokens.mainnet.wOUSD.chainId,
    },
    mapResult: (wousd_ousd: bigint) => {
      return [wousd_ousd, tokens.mainnet.OUSD.decimals];
    },
  },
  '1:OUSD_1:wOUSD': {
    type: 'wagmi',
    id: '1:OUSD_1:wOUSD',
    config: {
      address: tokens.mainnet.wOUSD.address,
      abi: tokens.mainnet.wOUSD.abi,
      functionName: 'previewMint',
      args: [parseUnits('1', tokens.mainnet.OUSD.decimals)],
      chainId: tokens.mainnet.wOUSD.chainId,
    },
    mapResult: (ousd_wousd: bigint) => {
      return [ousd_wousd, tokens.mainnet.wOUSD.decimals];
    },
  },
  '1:wOUSD_USD': {
    type: 'derived',
    id: '1:wOUSD_USD',
    dependsOn: ['1:wOUSD_1:OUSD', '1:OUSD_USD'],
  },
  '1:sfrxETH_1:frxETH': {
    type: 'wagmi',
    id: '1:sfrxETH_1:frxETH',
    config: {
      address: tokens.mainnet.sfrxETH.address,
      abi: tokens.mainnet.sfrxETH.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.sfrxETH.decimals)],
      chainId: tokens.mainnet.sfrxETH.chainId,
    },
    mapResult: (sfrxeth_usd: bigint) => {
      return [sfrxeth_usd, tokens.mainnet.sfrxETH.decimals];
    },
  },
  '1:sfrxETH_USD': {
    type: 'derived',
    id: '1:sfrxETH_USD',
    dependsOn: ['1:sfrxETH_1:frxETH', '1:frxETH_1:ETH', '1:ETH_USD'],
  },
  '1:WETH_USD': {
    type: 'derived',
    id: '1:WETH_USD',
    dependsOn: ['1:WETH_1:ETH', '1:ETH_USD'],
  },
  '1:OGN_USD': {
    type: 'coingecko',
    id: '1:OGN_USD',
    config: coingeckoTokenIds.OGN,
  },
  '1:primeETH_1:ETH': {
    id: '1:primeETH_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'primeETHPrice',
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (primeETH_ETH: bigint) => {
      return [primeETH_ETH, tokens.mainnet.primeETH.decimals];
    },
  },
  '1:primeETH_USD': {
    id: '1:primeETH_USD',
    type: 'derived',
    dependsOn: ['1:primeETH_1:ETH', '1:ETH_USD'],
  },
  '1:mETH_1:ETH': {
    id: '1:mETH_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.mETH.address],
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (meth_eth: bigint) => {
      return [meth_eth, tokens.mainnet.mETH.decimals];
    },
  },
  '1:mETH_USD': {
    id: '1:mETH_USD',
    type: 'derived',
    dependsOn: ['1:mETH_1:ETH', '1:ETH_USD'],
  },
  '1:ETHx_1:ETH': {
    id: '1:ETHx_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.ETHx.address],
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (ethx_eth: bigint) => {
      return [ethx_eth, tokens.mainnet.ETHx.decimals];
    },
  },
  '1:ETHx_USD': {
    id: '1:ETHx_USD',
    type: 'derived',
    dependsOn: ['1:ETHx_1:ETH', '1:ETH_USD'],
  },
  '1:swETH_1:ETH': {
    id: '1:swETH_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.swETH.address],
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (sweth_eth: bigint) => {
      return [sweth_eth, tokens.mainnet.swETH.decimals];
    },
  },
  '1:swETH_USD': {
    id: '1:swETH_USD',
    type: 'derived',
    dependsOn: ['1:swETH_1:ETH', '1:ETH_USD'],
  },
  '1:WETH_1:ETH': {
    id: '1:WETH_1:ETH',
    type: 'rest',
    config: async () => from(1),
  },
  '1:OETH_1:ETH': {
    id: '1:OETH_1:ETH',
    type: 'rest',
    config: async () => from(1 - OETH_REDEEM_FEE),
  },
  '1:ARM-WETH-stETH_1:WETH': {
    id: '1:ARM-WETH-stETH_1:WETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.ARMstETHWETHPool.address,
      abi: contracts.mainnet.ARMstETHWETHPool.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet['ARM-WETH-stETH'].decimals)],
      chainId: contracts.mainnet.ARMstETHWETHPool.chainId,
    },
    mapResult: (arm_weth_steth: bigint) => {
      return [arm_weth_steth, tokens.mainnet.WETH.decimals];
    },
  },
  '1:ARM-WETH-stETH_1:ETH': {
    id: '1:ARM-WETH-stETH_1:ETH',
    type: 'derived',
    dependsOn: ['1:ARM-WETH-stETH_1:WETH', '1:WETH_1:ETH'],
  },
  '1:ARM-WETH-stETH_USD': {
    id: '1:ARM-WETH-stETH_USD',
    type: 'derived',
    dependsOn: ['1:ARM-WETH-stETH_1:WETH', '1:WETH_1:ETH', '1:ETH_USD'],
  },
  '42161:ETH_USD': {
    id: '42161:ETH_USD',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesArbitrum.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: arbitrum.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '42161:wOETH_42161:OETH': {
    id: '42161:wOETH_42161:OETH',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesArbitrum.wOETH_OETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: arbitrum.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '42161:wOETH_USD': {
    id: '42161:wOETH_USD',
    type: 'derived',
    dependsOn: ['42161:wOETH_42161:OETH', '42161:ETH_USD'],
  },
  '42161:WETH_USD': {
    id: '42161:WETH_USD',
    type: 'derived',
    dependsOn: ['42161:ETH_USD'],
  },
  '8453:AERO_USD': {
    id: '8453:AERO_USD',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesBase.AERO_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: base.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '8453:ETH_USD': {
    id: '8453:ETH_USD',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesBase.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: base.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '8453:OGN_USD': {
    id: '8453:OGN_USD',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesBase.OGN_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: base.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '8453:WETH_USD': {
    id: '8453:WETH_USD',
    type: 'derived',
    dependsOn: ['8453:ETH_USD'],
  },
  '8453:superOETHb_USD': {
    id: '8453:superOETHb_USD',
    type: 'derived',
    dependsOn: ['8453:ETH_USD'],
  },
  '8453:wsuperOETHb_USD': {
    id: '8453:wsuperOETHb_USD',
    type: 'derived',
    dependsOn: ['8453:wsuperOETHb_8453:superOETHb', '8453:superOETHb_USD'],
  },
  '8453:superOETHb_8453:ETH': {
    id: '8453:superOETHb_8453:ETH',
    type: 'rest',
    config: async () => from(1),
  },
  '8453:superOETHb_8453:wsuperOETHb': {
    id: '8453:superOETHb_8453:wsuperOETHb',
    type: 'wagmi',
    config: {
      address: tokens.base.wsuperOETHb.address,
      abi: tokens.base.wsuperOETHb.abi,
      functionName: 'previewMint',
      args: [parseUnits('1', tokens.base.superOETHb.decimals)],
      chainId: tokens.base.wsuperOETHb.chainId,
    },
    mapResult: (super_wsuper: bigint) => {
      return [super_wsuper, tokens.base.wsuperOETHb.decimals];
    },
  },
  '8453:wsuperOETHb_8453:superOETHb': {
    id: '8453:wsuperOETHb_8453:superOETHb',
    type: 'wagmi',
    config: {
      address: tokens.base.wsuperOETHb.address,
      abi: tokens.base.wsuperOETHb.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.base.wsuperOETHb.decimals)],
      chainId: tokens.base.wsuperOETHb.chainId,
    },
    mapResult: (wsuper_ssuper: bigint) => {
      return [wsuper_ssuper, tokens.base.superOETHb.decimals];
    },
  },
  '8453:wsuperOETHb_8453:ETH': {
    id: '8453:wsuperOETHb_8453:ETH',
    type: 'derived',
    dependsOn: ['8453:wsuperOETHb_8453:superOETHb', '8453:superOETHb_8453:ETH'],
  },
  '10:ETH_USD': {
    id: '10:ETH_USD',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesOptimism.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: optimism.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '10:WETH_USD': {
    id: '10:WETH_USD',
    type: 'derived',
    dependsOn: ['10:ETH_USD'],
  },
  '10:superOETHo_USD': {
    id: '10:superOETHo_USD',
    type: 'derived',
    dependsOn: ['10:ETH_USD'],
  },
  '10:wsuperOETHo_USD': {
    id: '10:wsuperOETHo_USD',
    type: 'derived',
    dependsOn: ['10:ETH_USD'],
  },
  '146:S_USD': {
    id: '146:S_USD',
    type: 'derived',
    dependsOn: ['1:ETH_USD'],
  },
  '146:wS_USD': {
    id: '146:wS_USD',
    type: 'derived',
    dependsOn: ['1:ETH_USD'],
  },
  '146:OS_USD': {
    id: '146:OS_USD',
    type: 'derived',
    dependsOn: ['1:ETH_USD'],
  },
  '146:wOS_USD': {
    id: '146:wOS_USD',
    type: 'derived',
    dependsOn: ['1:ETH_USD'],
  },
  '146:OS_146:wOS': {
    type: 'wagmi',
    id: '146:OS_146:wOS',
    config: {
      address: tokens.sonic.wOS.address,
      abi: tokens.sonic.wOS.abi,
      functionName: 'previewMint',
      args: [parseUnits('1', tokens.sonic.OS.decimals)],
      chainId: tokens.sonic.wOS.chainId,
    },
    mapResult: (os_wos: bigint) => {
      return [os_wos, tokens.sonic.wOS.decimals];
    },
  },
  '146:wOS_146:OS': {
    type: 'wagmi',
    id: '146:wOS_146:OS',
    config: {
      address: tokens.sonic.wOS.address,
      abi: tokens.sonic.wOS.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.sonic.wOS.decimals)],
      chainId: tokens.sonic.wOS.chainId,
    },
    mapResult: (wos_os: bigint) => {
      return [wos_os, tokens.sonic.OS.decimals];
    },
  },
  '146:OS_146:wS': {
    id: '146:OS_146:wS',
    type: 'wagmi',
    config: {
      address: fixedOracleSonic.OS_wS,
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'asset', type: 'address' }],
          name: 'price',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      functionName: 'price',
      args: [tokens.sonic.OS.address],
      chainId: tokens.sonic.OS.chainId,
    },
    mapResult: (os_ws: bigint) => {
      return [os_ws, tokens.sonic.OS.decimals];
    },
  },
} as const;
