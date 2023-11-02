import { mainnet } from 'wagmi/chains';

import { ChainlinkOracleABI } from './abis/ChainlinkOracle';
import { CurveAddressProviderABI } from './abis/CurveAddressProvider';
import { CurveMetaPoolABI } from './abis/CurveMetaPool';
import { CurvePoolABI } from './abis/CurvePool';
import { DripperABI } from './abis/Dripper';
import { FlipperABI } from './abis/Flipper';
import { OETHABI } from './abis/OETH';
import { OETHDripperABI } from './abis/OETHDripper';
import { OETHVaultCoreABI } from './abis/OETHVaultCore';
import { OETHZapperABI } from './abis/OETHZapper';
import { OracleRouterABI } from './abis/OracleRouter';
import { WOETHABI } from './abis/WOETH';

export const contracts = {
  mainnet: {
    CurveOethPool: {
      address: '0x94B17476A93b3262d87B9a326965D1E91f9c13E7',
      chainId: mainnet.id,
      abi: CurvePoolABI,
      name: 'CurveOethPool',
    },
    CurveAddressProvider: {
      address: '0x0000000022d53366457f9d5e68ec105046fc4383',
      chainId: mainnet.id,
      abi: CurveAddressProviderABI,
      name: 'CurveAddressProvider',
    },
    CurveOusdMetaPool: {
      address: '0x87650D7bbfC3A9F10587d7778206671719d9910D',
      chainId: mainnet.id,
      abi: CurveMetaPoolABI,
      name: 'CurveOusdMetaPool',
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
    OUSDDripper: {
      address: '0xc7068A35F9F5b77471BcFfBdf82D9531D52AFCdc',
      chainId: mainnet.id,
      abi: DripperABI,
      name: 'Dripper',
    },
    OETHDripper: {
      address: '0xc0F42F73b8f01849a2DD99753524d4ba14317EB3',
      chainId: mainnet.id,
      abi: OETHDripperABI,
      name: 'Dripper',
    },
  },
} as const;
