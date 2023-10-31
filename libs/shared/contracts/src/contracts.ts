import { mainnet } from 'wagmi/chains';

import { ChainlinkOracleABI } from './abis/ChainlinkOracle';
import { CurveAddressProviderABI } from './abis/CurveAddressProvider';
import { CurvePoolABI } from './abis/CurvePool';
import { FlipperABI } from './abis/Flipper';
import { OETHABI } from './abis/OETH';
import { OETHVaultCoreABI } from './abis/OETHVaultCore';
import { OETHZapperABI } from './abis/OETHZapper';
import { OracleRouterABI } from './abis/OracleRouter';
import { OUSDABI } from './abis/OUSD';
import { UniswapV2RouterABI } from './abis/UniswapV2Router';
import { UniswapV3QuoterABI } from './abis/UniswapV3Quoter';
import { UniswapV3RouterABI } from './abis/UniswapV3Router';
import { VaultCoreABI } from './abis/VaultCore';
import { WOETHABI } from './abis/WOETH';

export const contracts = {
  mainnet: {
    curveOethPool: {
      address: '0x94B17476A93b3262d87B9a326965D1E91f9c13E7',
      chainId: mainnet.id,
      abi: CurvePoolABI,
      name: 'curveOethPool',
    },
    CurveAddressProvider: {
      address: '0x0000000022d53366457f9d5e68ec105046fc4383',
      chainId: mainnet.id,
      abi: CurveAddressProviderABI,
      name: 'CurveAddressProvider',
    },
    OETH: {
      address: '0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3',
      chainId: mainnet.id,
      abi: OETHABI,
      name: 'OETH',
    },
    OETHOracleRouter: {
      address: '0x3cCD26E82F7305B12742fBb36708B42f82B61dBa',
      chainId: mainnet.id,
      abi: OracleRouterABI,
      name: 'oracleRouter',
    },
    OETHVaultCore: {
      address: '0x39254033945AA2E4809Cc2977E7087BEE48bd7Ab',
      chainId: mainnet.id,
      abi: OETHVaultCoreABI,
      name: 'OETHVault',
    },
    wOETH: {
      address: '0xDcEe70654261AF21C44c093C300eD3Bb97b78192',
      chainId: mainnet.id,
      abi: WOETHABI,
      name: 'wOETH',
    },
    OETHZapper: {
      address: '0x9858e47BCbBe6fBAC040519B02d7cd4B2C470C66',
      chainId: mainnet.id,
      abi: OETHZapperABI,
      name: 'zapper',
    },
    ChainlinkOracle: {
      address: '0x017aD99900b9581Cd40C815990890EE9F0858246',
      chainId: mainnet.id,
      abi: ChainlinkOracleABI,
      name: 'ChainlinkOracle',
    },
    Flipper: {
      address: '0xcecaD69d7D4Ed6D52eFcFA028aF8732F27e08F70',
      chainId: mainnet.id,
      abi: FlipperABI,
      name: 'Flipper',
    },
    OUSDVaultCore: {
      address: '0xE75D77B1865Ae93c7eaa3040B038D7aA7BC02F70',
      chainId: mainnet.id,
      abi: VaultCoreABI,
      name: 'OUSDVault',
    },
    OUSD: {
      address: '0x2A8e1E676Ec238d8A992307B495b45B3fEAa5e86',
      chainId: mainnet.id,
      abi: OUSDABI,
      name: 'OUSD',
    },
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
    sushiswapRouter: {
      address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
      chainId: mainnet.id,
      abi: UniswapV2RouterABI,
      name: 'sushiswapRouter',
    },
  },
} as const;
