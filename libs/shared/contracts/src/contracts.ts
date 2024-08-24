import { arbitrum, base, mainnet } from 'viem/chains';

import { AerodromePoolABI } from './abis/AerodromePool';
import { AerodromeQuoterABI } from './abis/AerodromeQuoter';
import { AerodromeUniversalRouterABI } from './abis/AerodromeUniversalRouter';
import { ARMABI } from './abis/ARM';
import { BalancerQueriesABI } from './abis/BalancerQueries';
import { BalancerVaultABI } from './abis/BalancerVault';
import { CCIPEvm2EvmOnRamp } from './abis/CCIPEvm2EvmOnRamp';
import { CCIPRouterABI } from './abis/CCIPRouter';
import { ChainlinkOracleABI } from './abis/ChainlinkOracle';
import { CurveAddressProviderABI } from './abis/CurveAddressProvider';
import { CurveMetaPoolABI } from './abis/CurveMetaPool';
import { CurvePoolABI } from './abis/CurvePool';
import { CurveRouterABI } from './abis/CurveRouter';
import { DIAOracleABI } from './abis/DIAOracle';
import { DripperABI } from './abis/Dripper';
import { FlipperABI } from './abis/Flipper';
import { IVaultABI } from './abis/IVault';
import { LrtConfigABI } from './abis/LrtConfig';
import { LrtDepositPoolABI } from './abis/LrtDepositPool';
import { LrtOracleABI } from './abis/LrtOracle';
import { MigratorABI } from './abis/Migrator';
import { OETHDripperABI } from './abis/OETHDripper';
import { OETHVaultABI } from './abis/OETHVault';
import { OETHZapperABI } from './abis/OETHZapper';
import { OGNFixedRateRewardSourceABI } from './abis/OGNFixedRateRewardSource';
import { OGVMandatoryDistibutorABI } from './abis/OGVMandatoryDistibutor';
import { OGVOptionalDistibutorABI } from './abis/OGVOptionalDistibutor';
import { OracleRouterABI } from './abis/OracleRouter';
import { OUSDGovernanceABI } from './abis/OUSDGovernance';
import { PrimeETHZapperABI } from './abis/PrimeETHZapper';
import { UniswapV2RouterABI } from './abis/UniswapV2Router';
import { UniswapV3QuoterABI } from './abis/UniswapV3Quoter';
import { UniswapV3RouterABI } from './abis/UniswapV3Router';
import { UniswapV3WETHPrimeETHPoolABI } from './abis/UniswapV3WETHPrimeETHPool';
import { WOETHCCIPZapperABI } from './abis/WOETHCCIPZapper';
import { xOGNGovernanceABI } from './abis/xOGNGovernance';

export const contracts = {
  mainnet: {
    ARM: {
      address: '0x6bac785889A4127dB0e0CeFEE88E0a9F1Aaf3cC7',
      chainId: mainnet.id,
      abi: ARMABI,
      name: 'ARM',
    },
    // Chainlink CCIP
    ccipRouter: {
      address: '0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D',
      chainId: mainnet.id,
      abi: CCIPRouterABI,
      name: 'ccipRouter',
    },
    ccipOnRamp: {
      address: '0x925228d7b82d883dde340a55fe8e6da56244a22c',
      chainId: mainnet.id,
      abi: CCIPEvm2EvmOnRamp,
      name: 'ccipOnRamp',
    },
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
    CurveRouter: {
      address: '0xF0d4c12A5768D806021F80a262B4d39d26C58b8D',
      chainId: mainnet.id,
      abi: CurveRouterABI,
      name: 'CurveRouter',
    },
    // DIA Oracle
    DIAOracle: {
      address: '0xafA00E7Eff2EA6D216E432d99807c159d08C2b79',
      chainId: mainnet.id,
      abi: DIAOracleABI,
      name: 'DIAOracle',
    },
    // LRT
    lrtOracle: {
      address: '0xA755c18CD2376ee238daA5Ce88AcF17Ea74C1c32',
      chainId: mainnet.id,
      abi: LrtOracleABI,
      name: 'lrtOracle',
    },
    lrtDepositPool: {
      address: '0xA479582c8b64533102F6F528774C536e354B8d32',
      chainId: mainnet.id,
      abi: LrtDepositPoolABI,
      name: 'lrtDepositPool',
    },
    lrtConfig: {
      address: '0xF879c7859b6DE6FAdaFB74224Ff05b16871646bF',
      chainId: mainnet.id,
      abi: LrtConfigABI,
      name: 'lrtConfig',
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
      abi: OETHVaultABI,
      name: 'OETHVault',
    },
    OETHZapper: {
      address: '0x9858e47BCbBe6fBAC040519B02d7cd4B2C470C66',
      chainId: mainnet.id,
      abi: OETHZapperABI,
      name: 'OETHZapper',
    },
    // OGN
    OGNFixedRewardSource: {
      address: '0x7609c88e5880e934dd3a75bcfef44e31b1badb8b',
      chainId: mainnet.id,
      abi: OGNFixedRateRewardSourceABI,
      name: 'OGNFixedRewardSource',
    },
    // OGV
    OGVMandatoryDistributor: {
      address: '0xD667091c2d1DCc8620f4eaEA254CdFB0a176718D',
      chainId: mainnet.id,
      abi: OGVMandatoryDistibutorABI,
      name: 'OGVMandatoryDistributor',
    },
    OGVMigrator: {
      address: '0x95c347D6214614A780847b8aAF4f96Eb84f4da6d',
      chainId: mainnet.id,
      abi: MigratorABI,
      name: 'OGVMigrator',
    },
    OGVOptionalDistributor: {
      address: '0x7aE2334f12a449895AD21d4c255D9DE194fe986f',
      chainId: mainnet.id,
      abi: OGVOptionalDistibutorABI,
      name: 'OGVOptionalDistributor',
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
    OUSDGovernance: {
      address: '0x3cdD07c16614059e66344a7b579DAB4f9516C0b6',
      chainId: mainnet.id,
      abi: OUSDGovernanceABI,
      name: 'OUSDGovernance',
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
    // PrimeETH
    PrimeETHZapper: {
      address: '0x3cf4Db4c59dCB082d1A9719C54dF3c04Db93C6b7',
      chainId: mainnet.id,
      abi: PrimeETHZapperABI,
      name: 'PrimeETHZapper',
    },
    // SushiSwap
    sushiswapRouter: {
      address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
      chainId: mainnet.id,
      abi: UniswapV2RouterABI,
      name: 'sushiswapRouter',
    },
    // Uniswap
    uniswapV3WETHPrimeETHPool: {
      address: '0xb6934f4cf655c93e897514dc7c2af5a143b9ca22',
      chainId: mainnet.id,
      abi: UniswapV3WETHPrimeETHPoolABI,
      name: 'uniswapV3WETHPrimeETHPool',
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
    woethCcipZapper: {
      address: '0x438731b5Ee8fEcC02a28532713E237b93260C3F8',
      chainId: mainnet.id,
      abi: WOETHCCIPZapperABI,
      name: 'woethCcipZapper',
    },
    // xOGN
    xOGNGovernance: {
      address: '0x1D3Fbd4d129Ddd2372EA85c5Fa00b2682081c9EC',
      chainId: mainnet.id,
      abi: xOGNGovernanceABI,
      name: 'xOGNGovernance',
    },
  },
  arbitrum: {
    // Balancer
    balancerQueries: {
      address: '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5',
      chainId: arbitrum.id,
      abi: BalancerQueriesABI,
      name: 'balancerQueries',
    },
    balancerVault: {
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
      chainId: arbitrum.id,
      abi: BalancerVaultABI,
      name: 'balancerVault',
    },
    // Chainlink CCIP
    ccipRouter: {
      address: '0x141fa059441E0ca23ce184B6A78bafD2A517DdE8',
      chainId: arbitrum.id,
      abi: CCIPRouterABI,
      name: 'ccipRouter',
    },
  },
  base: {
    // Aerodrome
    aerodromeQuoter: {
      address: '0x254cF9E1E6e233aa1AC962CB9B05b2cfeAaE15b0',
      chainId: base.id,
      abi: AerodromeQuoterABI,
      name: 'aerodromeQuoter',
    },
    aerodromeUniversalRouter: {
      address: '0x6Cb442acF35158D5eDa88fe602221b67B400Be3E',
      chainId: base.id,
      abi: AerodromeUniversalRouterABI,
      name: 'aerodromeUniversalRouter',
    },
    aerodromeWethSuperOethbPool: {
      address: '0x6446021F4E396dA3df4235C62537431372195D38',
      chainId: base.id,
      abi: AerodromePoolABI,
      name: 'aerodromeWethSuperOethbPool',
    },
    // superOETHb
    superOETHbVault: {
      address: '0x98a0CbeF61bD2D21435f433bE4CD42B56B38CC93',
      chainId: base.id,
      abi: OETHVaultABI,
      name: 'superOETHbVault',
    },
    superOETHbDripper: {
      address: '0x02f2C609950E90934ce99e58b4d7326aD0d7f8d6',
      chainId: base.id,
      abi: DripperABI,
      name: 'superOETHbDripper',
    },
  },
} as const;
