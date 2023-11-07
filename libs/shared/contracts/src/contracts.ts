import { mainnet } from 'wagmi/chains';

import { ChainlinkOracleABI } from './abis/ChainlinkOracle';
import { CurveAddressProviderABI } from './abis/CurveAddressProvider';
import { CurveMetaPoolABI } from './abis/CurveMetaPool';
import { CurvePoolABI } from './abis/CurvePool';
import { DripperABI } from './abis/Dripper';
import { FlipperABI } from './abis/Flipper';
import { IVaultABI } from './abis/IVault';
import { OETHDripperABI } from './abis/OETHDripper';
import { OETHZapperABI } from './abis/OETHZapper';
import { OracleRouterABI } from './abis/OracleRouter';
import { UniswapV2RouterABI } from './abis/UniswapV2Router';
import { UniswapV3QuoterABI } from './abis/UniswapV3Quoter';
import { UniswapV3RouterABI } from './abis/UniswapV3Router';

export const contracts = {
  mainnet: {
    // Chainlink
    ChainlinkOracle: {
      address: '0x017aD99900b9581Cd40C815990890EE9F0858246',
      chainId: mainnet.id,
      abi: ChainlinkOracleABI,
      name: 'ChainlinkOracle',
    },
    // Curve
    CurveAddressProvider: {
      address: '0x0000000022d53366457f9d5e68ec105046fc4383',
      chainId: mainnet.id,
      abi: CurveAddressProviderABI,
      name: 'CurveAddressProvider',
    },
    // OETH
    OETHCurvePool: {
      address: '0x94B17476A93b3262d87B9a326965D1E91f9c13E7',
      chainId: mainnet.id,
      abi: CurvePoolABI,
      name: 'OETHCurvePool',
    },
    OETHDripper: {
      address: '0xc0F42F73b8f01849a2DD99753524d4ba14317EB3',
      chainId: mainnet.id,
      abi: OETHDripperABI,
      name: 'OETHDripper',
    },
    OETHOracleRouter: {
      address: '0xbE19cC5654e30dAF04AD3B5E06213D70F4e882eE',
      chainId: mainnet.id,
      abi: OracleRouterABI,
      name: 'OETHOracleRouter',
    },
    OETHVault: {
      address: '0x39254033945AA2E4809Cc2977E7087BEE48bd7Ab',
      chainId: mainnet.id,
      abi: IVaultABI,
      name: 'OETHVault',
    },
    OETHZapper: {
      address: '0x9858e47BCbBe6fBAC040519B02d7cd4B2C470C66',
      chainId: mainnet.id,
      abi: OETHZapperABI,
      name: 'OETHZapper',
    },
    // OUSD
    OUSDCurveMetaPool: {
      address: '0x87650D7bbfC3A9F10587d7778206671719d9910D',
      chainId: mainnet.id,
      abi: CurveMetaPoolABI,
      name: 'OUSDCurveMetaPool',
    },
    OUSDDripper: {
      address: '0xc7068A35F9F5b77471BcFfBdf82D9531D52AFCdc',
      chainId: mainnet.id,
      abi: DripperABI,
      name: 'OUSDDripper',
    },
    OUSDFlipper: {
      address: '0xcecaD69d7D4Ed6D52eFcFA028aF8732F27e08F70',
      chainId: mainnet.id,
      abi: FlipperABI,
      name: 'OUSDFlipper',
    },
    OUSDOracleRouter: {
      address: '0xe7fD05515A51509Ca373a42E81ae63A40AA4384b',
      chainId: mainnet.id,
      abi: OracleRouterABI,
      name: 'OUSDOracleRouter',
    },
    OUSDVault: {
      address: '0xE75D77B1865Ae93c7eaa3040B038D7aA7BC02F70',
      chainId: mainnet.id,
      abi: IVaultABI,
      name: 'OUSDVault',
    },
    // SushiSwap
    sushiswapRouter: {
      address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
      chainId: mainnet.id,
      abi: UniswapV2RouterABI,
      name: 'sushiswapRouter',
    },
    // Uniswap
    uniswapV2Router: {
      address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      chainId: mainnet.id,
      abi: UniswapV2RouterABI,
      name: 'uniswapV2Router',
    },
    uniswapV3Quoter: {
      address: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
      chainId: mainnet.id,
      abi: UniswapV3QuoterABI,
      name: 'uniswapV3Quoter',
    },
    uniswapV3Router: {
      address: '0xe592427a0aece92de3edee1f18e0157c05861564',
      chainId: mainnet.id,
      abi: UniswapV3RouterABI,
      name: 'uniswapV3Router',
    },
  },
} as const;
