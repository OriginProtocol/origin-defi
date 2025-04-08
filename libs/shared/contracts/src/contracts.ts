import { arbitrum, base, mainnet, sonic } from 'viem/chains';

import { AaveStrategyABI } from './abis/AaveStrategy';
import { AerodromePoolABI } from './abis/AerodromePool';
import { AerodromeQuoterABI } from './abis/AerodromeQuoter';
import { AerodromeUniversalRouterABI } from './abis/AerodromeUniversalRouter';
import { ARMABI } from './abis/ARM';
import { ARMPoolControllerABI } from './abis/ARMPoolController';
import { ARMstETHWETHPoolABI } from './abis/ARMstETHWETHPool';
import { ARMZapperLidoABI } from './abis/ARMZapperLido';
import { AuraStrategyABI } from './abis/AuraStrategy';
import { BalancerQueriesABI } from './abis/BalancerQueries';
import { BalancerVaultABI } from './abis/BalancerVault';
import { CCIPEvm2EvmOnRamp } from './abis/CCIPEvm2EvmOnRamp';
import { CCIPRouterABI } from './abis/CCIPRouter';
import { ChainlinkOracleABI } from './abis/ChainlinkOracle';
import { ConvexEthMetaStrategyABI } from './abis/ConvexEthMetaStrategy';
import { ConvexStrategyABI } from './abis/ConvexStrategy';
import { CurveAmoPoolABI } from './abis/CurveAmoPool';
import { CurveAMOStrategyABI } from './abis/CurveAMOStrategy';
import { CurveMetaPoolABI } from './abis/CurveMetaPool';
import { CurvePoolABI } from './abis/CurvePool';
import { CurveRouterNGABI } from './abis/CurveRouterNG';
import { DIAOracleABI } from './abis/DIAOracle';
import { DripperABI } from './abis/Dripper';
import { FlipperABI } from './abis/Flipper';
import { FraxETHStrategyABI } from './abis/FraxETHStrategy';
import { FraxRedemptionStrategyABI } from './abis/FraxRedemptionStrategy';
import { Generalized4626StrategyABI } from './abis/Generalized4626Strategy';
import { IVaultABI } from './abis/IVault';
import { LidoWithdrawStrategyABI } from './abis/LidoWithdrawStrategy';
import { LrtConfigABI } from './abis/LrtConfig';
import { LrtDepositPoolABI } from './abis/LrtDepositPool';
import { LrtOracleABI } from './abis/LrtOracle';
import { magpieRouterABI } from './abis/MagpieRouter';
import { metropolisQuoterABI } from './abis/MetropolisQuoter';
import { metropolisRouterAbi } from './abis/MetropolisRouter';
import { MigratorABI } from './abis/Migrator';
import { MorphoAaveStrategyABI } from './abis/MorphoAaveStrategy';
import { MorphoCompoundStrategyABI } from './abis/MorphoCompoundStrategy';
import { OETHDripperABI } from './abis/OETHDripper';
import { OETHNativeStakingABI } from './abis/OETHNativeStaking';
import { OETHVaultABI } from './abis/OETHVault';
import { OETHZapperABI } from './abis/OETHZapper';
import { OGNFixedRateRewardSourceABI } from './abis/OGNFixedRateRewardSource';
import { OGVMandatoryDistibutorABI } from './abis/OGVMandatoryDistibutor';
import { OGVOptionalDistibutorABI } from './abis/OGVOptionalDistibutor';
import { OracleRouterABI } from './abis/OracleRouter';
import { OSVaultABI } from './abis/OSVault';
import { OUSDGovernanceABI } from './abis/OUSDGovernance';
import { OUSDStrategyFluxABI } from './abis/OUSDStrategyFlux';
import { OUSDStrategyMakerABI } from './abis/OUSDStrategyMaker';
import { OUSDStrategyMetaMorphoABI } from './abis/OUSDStrategyMetaMorpho';
import { PrimeETHZapperABI } from './abis/PrimeETHZapper';
import { shadowQuoterABI } from './abis/ShadowQuoter';
import { ShadowRouterABI } from './abis/ShadowRouter';
import { OUSDSSRStrategyABI } from './abis/SSRStrategy';
import { SuperOETHbABI } from './abis/SuperOETHbABI';
import { SuperOETHbStrategyAeroABI } from './abis/SuperOETHbStrategyAero';
import { SuperOETHbStrategyBridgeABI } from './abis/SuperOETHbStrategyBridge';
import { superOETHbZapperABI } from './abis/superOETHbZapper';
import { SwapxQuoterABI } from './abis/SwapxQuoter';
import { SwapxRouterABI } from './abis/SwapxRouterABI';
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
    ARMstETHWETHPool: {
      address: '0x85B78AcA6Deae198fBF201c82DAF6Ca21942acc6',
      chainId: mainnet.id,
      abi: ARMstETHWETHPoolABI,
      name: 'ARMstETHWETHPool',
    },
    ARMPoolController: {
      address: '0xf54ebff575f699d281645c6F14Fe427dFFE629CF',
      chainId: mainnet.id,
      abi: ARMPoolControllerABI,
      name: 'ARMPoolController',
    },
    ARMZapperLido: {
      address: '0x01F30B7358Ba51f637d1aa05D9b4A60f76DAD680',
      chainId: mainnet.id,
      abi: ARMZapperLidoABI,
      name: 'ARMZapperLido',
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
    CurveRouterNG: {
      address: '0x16C6521Dff6baB339122a0FE25a9116693265353',
      chainId: mainnet.id,
      abi: CurveRouterNGABI,
      name: 'CurveRouterNG',
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
      address: '0x468A68da3cefcDD644ce0Ea9B9564b246218aeeC',
      chainId: mainnet.id,
      abi: OracleRouterABI,
      name: 'OETHOracleRouter',
    },
    OETHStrategyAura: {
      address: '0x49109629ac1deb03f2e9b2fe2ac4a623e0e7dfdc',
      chainId: mainnet.id,
      abi: AuraStrategyABI,
      name: 'OETHStrategyAura',
    },
    OETHStrategyConvexAMO: {
      address: '0x1827f9ea98e0bf96550b2fc20f7233277fcd7e63',
      chainId: mainnet.id,
      abi: ConvexStrategyABI,
      name: 'OETHStrategyConvexAMO',
    },
    OETHStrategyFraxStaking: {
      address: '0x3ff8654d633d4ea0fae24c52aec73b4a20d0d0e5',
      chainId: mainnet.id,
      abi: FraxETHStrategyABI,
      name: 'OETHStrategyFraxStaking',
    },
    OETHStrategyFraxRedemption: {
      address: '0x95a8e45afcfbfedd4a1d41836ed1897f3ef40a9e',
      chainId: mainnet.id,
      abi: FraxRedemptionStrategyABI,
      name: 'OETHStrategyFraxRedemption',
    },
    OETHStrategyLidoWithdraw: {
      address: '0xd9b488280d723338dd32d56b3900f379eb7a7af1',
      chainId: mainnet.id,
      abi: LidoWithdrawStrategyABI,
      name: 'OETHStrategyLidoWithdraw',
    },
    OETHStrategyMorphoAave: {
      address: '0xc1fc9e5ec3058921ea5025d703cbe31764756319',
      chainId: mainnet.id,
      abi: MorphoAaveStrategyABI,
      name: 'OETHStrategyMorphoAave',
    },
    OETHStrategyNative1: {
      address: '0x34edb2ee25751ee67f68a45813b22811687c0238',
      chainId: mainnet.id,
      abi: OETHNativeStakingABI,
      name: 'OETHStrategyNative1',
    },
    OETHStrategyNative2: {
      address: '0x4685db8bf2df743c861d71e6cfb5347222992076',
      chainId: mainnet.id,
      abi: OETHNativeStakingABI,
      name: 'OETHStrategyNative2',
    },
    OETHStrategyNative3: {
      address: '0xE98538A0e8C2871C2482e1Be8cC6bd9F8E8fFD63',
      chainId: mainnet.id,
      abi: OETHNativeStakingABI,
      name: 'OETHStrategyNative3',
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
      address: '0x80C898ae5e56f888365E235CeB8CEa3EB726CB58',
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
    OUSDSSRStrategy: {
      address: '0x5Bd9AF9c2506D29B6d79cB878284A270190EaEAa',
      chainId: mainnet.id,
      abi: OUSDSSRStrategyABI,
      name: 'OUSDSSRStrategy',
    },
    OUSDStrategyAave: {
      address: '0x5e3646a1db86993f73e6b74a57d8640b69f7e259',
      chainId: mainnet.id,
      abi: AaveStrategyABI,
      name: 'OUSDStrategyAave',
    },
    OUSDStrategyConvex: {
      address: '0x89eb88fedc50fc77ae8a18aad1ca0ac27f777a90',
      chainId: mainnet.id,
      abi: ConvexEthMetaStrategyABI,
      name: 'OUSDStrategyConvex',
    },
    OUSDStrategyFlux: {
      address: '0x76bf500b6305dc4ea851384d3d5502f1c7a0ed44',
      chainId: mainnet.id,
      abi: OUSDStrategyFluxABI,
      name: 'OUSDStrategyFlux',
    },
    OUSDStrategyMaker: {
      address: '0x6b69b755c629590ed59618a2712d8a2957ca98fc',
      chainId: mainnet.id,
      abi: OUSDStrategyMakerABI,
      name: 'OUSDStrategyMaker',
    },
    OUSDStrategyMetaMorpho: {
      address: '0x603cdeaec82a60e3c4a10da6ab546459e5f64fa0',
      chainId: mainnet.id,
      abi: OUSDStrategyMetaMorphoABI,
      name: 'OUSDStrategyMetaMorpho',
    },
    OUSDStrategyMorphoAave: {
      address: '0x79f2188ef9350a1dc11a062cca0abe90684b0197',
      chainId: mainnet.id,
      abi: MorphoAaveStrategyABI,
      name: 'OUSDStrategyMorphoAave',
    },
    OUSDStrategyMorphoCompound: {
      address: '0x5a4eee58744d1430876d5ca93cab5ccb763c037d',
      chainId: mainnet.id,
      abi: MorphoCompoundStrategyABI,
      name: 'OUSDStrategyMorphoAave',
    },
    OUSDStrategyMorphoGauntletUSDC: {
      address: '0x2B8f37893EE713A4E9fF0cEb79F27539f20a32a1',
      chainId: mainnet.id,
      abi: Generalized4626StrategyABI,
      name: 'OUSDStrategyMorphoGauntletUSDC',
    },
    OUSDStrategyMorphoGauntletPrimeUSDT: {
      address: '0xe3ae7C80a1B02Ccd3FB0227773553AEB14e32F26',
      chainId: mainnet.id,
      abi: Generalized4626StrategyABI,
      name: 'OUSDStrategyMorphoGauntletPrimeUSDT',
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
    // Curve Router NG
    CurveRouterNG: {
      address: '0x2191718CD32d02B8E60BAdFFeA33E4B5DD9A0A0D',
      chainId: arbitrum.id,
      abi: CurveRouterNGABI,
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
    // Curve pool
    curvePoolWethSuperOethb: {
      address: '0x302A94E3C28c290EAF2a4605FC52e11Eb915f378',
      chainId: base.id,
      abi: CurveAmoPoolABI,
      name: 'curvePoolWethSuperOethb',
    },
    // Curve Router NG
    CurveRouterNG: {
      address: '0x4f37A9d177470499A2dD084621020b023fcffc1F',
      chainId: base.id,
      abi: CurveRouterNGABI,
    },
    // superOETHb
    superOETHbVault: {
      address: '0x98a0CbeF61bD2D21435f433bE4CD42B56B38CC93',
      chainId: base.id,
      abi: SuperOETHbABI,
      name: 'superOETHbVault',
    },
    superOETHbDripper: {
      address: '0x02f2C609950E90934ce99e58b4d7326aD0d7f8d6',
      chainId: base.id,
      abi: DripperABI,
      name: 'superOETHbDripper',
    },
    superOETHbCurveAMOStrategy: {
      address: '0x9cfcAF81600155e01c63e4D2993A8A81A8205829',
      chainId: base.id,
      abi: CurveAMOStrategyABI,
      name: 'superOETHbCurveAMOStrategy',
    },
    superOETHbStrategyAero: {
      address: '0xF611cC500eEE7E4e4763A05FE623E2363c86d2Af',
      chainId: base.id,
      abi: SuperOETHbStrategyAeroABI,
      name: 'superOETHbStrategyAero',
    },
    superOETHbStrategyBridge: {
      address: '0x80c864704DD06C3693ed5179190786EE38ACf835',
      chainId: base.id,
      abi: SuperOETHbStrategyBridgeABI,
      name: 'superOETHbStrategyBridge',
    },
    superOETHbZapper: {
      address: '0x3b56c09543D3068f8488ED34e6F383c3854d2bC1',
      chainId: base.id,
      abi: superOETHbZapperABI,
      name: 'superOETHbZapper',
    },
  },
  sonic: {
    //Magpie
    magpieRouter: {
      address: '0xba7bAC71a8Ee550d89B827FE6d67bc3dCA07b104',
      chainId: sonic.id,
      abi: magpieRouterABI,
      name: 'magpieRouter',
    },
    // Metropolis
    metropolisQuoter: {
      address: '0x56eaa884F29620fD6914827AaAE9Ee6a5C383149',
      chainId: sonic.id,
      abi: metropolisQuoterABI,
      name: 'metropolisQuoter',
    },
    metropolisRouter: {
      address: '0x67803fe6d76409640efDC9b7ABcD2c6c2E7cBa48',
      chainId: sonic.id,
      abi: metropolisRouterAbi,
      name: 'metropolisRouter',
    },
    // OS
    osVault: {
      address: '0xa3c0eCA00D2B76b4d1F170b0AB3FdeA16C180186',
      chainId: sonic.id,
      abi: OSVaultABI,
      name: 'osVault',
    },
    osDripper: {
      address: '0x5b72992e9CDe8C07CE7C8217eB014EC7fD281f03',
      chainId: sonic.id,
      abi: DripperABI,
      name: 'osDripper',
    },
    osZapper: {
      address: '0xe25A2B256ffb3AD73678d5e80DE8d2F6022fAb21',
      chainId: sonic.id,
      abi: superOETHbZapperABI,
      name: 'osZapper',
    },
    // Shadow
    shadowQuoter: {
      address: '0x219b7ADebc0935a3eC889a148c6924D51A07535A',
      chainId: sonic.id,
      abi: shadowQuoterABI,
      name: 'shadowQuoter',
    },
    shadowRouter: {
      address: '0x92643Dc4F75C374b689774160CDea09A0704a9c2',
      chainId: sonic.id,
      abi: ShadowRouterABI,
      name: 'shadowRouter',
    },
    // SwapX
    swapxQuoter: {
      address: '0xd74a9Bd1C98B2CbaB5823107eb2BE9C474bEe09A',
      chainId: sonic.id,
      abi: SwapxQuoterABI,
      name: 'swapxQuoter',
    },
    swapxRouter: {
      address: '0x037c162092881A249DC347D40Eb84438e3457c02',
      chainId: sonic.id,
      abi: SwapxRouterABI,
      name: 'swapxRouter',
    },
  },
} as const;
