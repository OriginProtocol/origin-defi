import { contracts, tokens } from '@origin/shared/contracts';
import { ETH_ADDRESS_CURVE } from '@origin/shared/utils';

/*
- Mainnet Curve registry contract: https://etherscan.io/address/0x99a58482BD75cbab83b27EC03CA68fF489b5788f#code
- Vyper implementation for multiple amount exchanges

```
  def get_exchange_multiple_amount

  @notice Get the current number the final output tokens received in an exchange
  @dev Routing and swap params must be determined off-chain. This
       functionality is designed for gas efficiency over ease-of-use.
  @param _route Array of [initial token, pool, token, pool, token, ...]
                The array is iterated until a pool address of 0x00, then the last
                given token is transferred to `_receiver`
  @param _swap_params Multidimensional array of [i, j, swap type] where i and j are the correct
                      values for the n'th pool in `_route`. The swap type should be
                      1 for a stableswap `exchange`,
                      2 for stableswap `exchange_underlying`,
                      3 for a cryptoswap `exchange`,
                      4 for a cryptoswap `exchange_underlying`,
                      5 for factory metapools with lending base pool `exchange_underlying`,
                      6 for factory crypto-meta pools underlying exchange (`exchange` method in zap),
                      7-11 for wrapped coin (underlying for lending pool) -> LP token "exchange" (actually `add_liquidity`),
                      12-14 for LP token -> wrapped coin (underlying for lending or fake pool) "exchange" (actually `remove_liquidity_one_coin`)
                      15 for WETH -> ETH "exchange" (actually deposit/withdraw)
  @param _amount The amount of `_route[0]` token to be sent.
  @param _pools Array of pools for swaps via zap contracts. This parameter is only needed for
                Polygon meta-factories underlying swaps.
  @return Expected amount of the final output token
```
*/

export const curveRoutes = {
  // ETH -> OETH Mint
  ETH: {
    OETH: {
      routes: [
        ETH_ADDRESS_CURVE,
        contracts.mainnet.CurveOethPool.address,
        tokens.mainnet.OETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        [0n, 1n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
  },
  // stETH -> OETH Mint
  stETH: {
    OETH: {
      routes: [
        tokens.mainnet.stETH.address,
        '0x21E27a5E5513D6e65C4f830167390997aA84843a',
        ETH_ADDRESS_CURVE,
        contracts.mainnet.CurveOethPool.address,
        tokens.mainnet.OETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 1 for a stableswap `exchange`,
        [1n, 0n, 1n],
        // 1 for a stableswap `exchange`,
        [0n, 1n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
  },
  // WETH -> OETH Mint
  WETH: {
    OETH: {
      routes: [
        tokens.mainnet.WETH.address,
        tokens.mainnet.WETH.address,
        ETH_ADDRESS_CURVE,
        contracts.mainnet.CurveOethPool.address,
        tokens.mainnet.OETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 15 for WETH -> ETH "exchange" (actually deposit/withdraw)
        [0n, 0n, 15n],
        // 1 for a stableswap `exchange`,
        [0n, 1n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
  },
  // rETH -> OETH Mint
  rETH: {
    OETH: {
      routes: [
        tokens.mainnet.rETH.address,
        '0x0f3159811670c117c372428D4E69AC32325e4D0F',
        ETH_ADDRESS_CURVE,
        contracts.mainnet.CurveOethPool.address,
        tokens.mainnet.OETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 3 for a cryptoswap `exchange`,
        [1n, 0n, 3n],
        // 1 for a stableswap `exchange`,
        [0n, 1n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
  },
  // frxETH -> OETH Mint
  frxETH: {
    OETH: {
      routes: [
        tokens.mainnet.frxETH.address,
        '0xa1F8A6807c402E4A15ef4EBa36528A3FED24E577',
        ETH_ADDRESS_CURVE,
        contracts.mainnet.CurveOethPool.address,
        tokens.mainnet.OETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 1 for a stableswap `exchange`,
        [1n, 0n, 1n],
        // 1 for a stableswap `exchange`,
        [0n, 1n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
  },
  // OETH Redeem
  OETH: {
    // OETH -> ETH
    ETH: {
      routes: [
        tokens.mainnet.OETH.address,
        contracts.mainnet.CurveOethPool.address,
        ETH_ADDRESS_CURVE,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        [1n, 0n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
    // OETH -> frxETH
    frxETH: {
      routes: [
        tokens.mainnet.OETH.address,
        contracts.mainnet.CurveOethPool.address,
        ETH_ADDRESS_CURVE,
        '0xa1F8A6807c402E4A15ef4EBa36528A3FED24E577',
        tokens.mainnet.frxETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 1 for a stableswap `exchange`,
        [1n, 0n, 1n],
        // 1 for a stableswap `exchange`,
        [0n, 1n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
    // OETH -> WETH
    WETH: {
      routes: [
        tokens.mainnet.OETH.address,
        contracts.mainnet.CurveOethPool.address,
        ETH_ADDRESS_CURVE,
        tokens.mainnet.WETH.address,
        tokens.mainnet.WETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 1 for a stableswap `exchange`,
        [1n, 0n, 1n],
        // 15 for WETH -> ETH "exchange" (actually deposit/withdraw)
        [0n, 0n, 15n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
    // OETH -> rETH
    rETH: {
      routes: [
        tokens.mainnet.OETH.address,
        contracts.mainnet.CurveOethPool.address,
        ETH_ADDRESS_CURVE,
        '0x0f3159811670c117c372428D4E69AC32325e4D0F',
        tokens.mainnet.rETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 1 for a stableswap `exchange`,
        [1n, 0n, 1n],
        // 3 for a cryptoswap `exchange`,
        [0n, 1n, 3n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
    // OETH -> stETH
    stETH: {
      routes: [
        tokens.mainnet.OETH.address,
        contracts.mainnet.CurveOethPool.address,
        ETH_ADDRESS_CURVE,
        '0x21E27a5E5513D6e65C4f830167390997aA84843a',
        tokens.mainnet.stETH.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ],
      swapParams: [
        // 1 for a stableswap `exchange`,
        [1n, 0n, 1n],
        // 1 for a stableswap `exchange`,
        [0n, 1n, 1n],
        [0n, 0n, 0n],
        [0n, 0n, 0n],
      ],
    },
  },
} as const;
