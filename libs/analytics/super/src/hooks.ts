import { useTheme } from '@mui/material';
import { contracts, tokens } from '@origin/shared/contracts';
import { Curve, ETH, wOETH } from '@origin/shared/icons';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { add, div, from, gt, mul, sub, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useConfig } from 'wagmi';

import type { Dnum } from 'dnum';

export const useSuperCollaterals = () => {
  const theme = useTheme();
  const intl = useIntl();
  const config = useConfig();

  return useQuery({
    queryKey: ['useSuperCollaterals'],
    queryFn: async () => {
      const data = await readContracts(config, {
        contracts: [
          {
            address: contracts.base.superOETHbVault.address,
            abi: contracts.base.superOETHbVault.abi,
            chainId: contracts.base.superOETHbVault.chainId,
            functionName: 'totalValue',
          },
          {
            address: contracts.base.superOETHbStrategyBridge.address,
            abi: contracts.base.superOETHbStrategyBridge.abi,
            chainId: contracts.base.superOETHbStrategyBridge.chainId,
            functionName: 'checkBalance',
            args: [tokens.base.WETH.address],
          },
          {
            address: contracts.base.superOETHbStrategyAero.address,
            abi: contracts.base.superOETHbStrategyAero.abi,
            chainId: contracts.base.superOETHbStrategyAero.chainId,
            functionName: 'getPositionPrincipal',
          },
          {
            address: tokens.base.WETH.address,
            abi: tokens.base.WETH.abi,
            chainId: tokens.base.WETH.chainId,
            functionName: 'balanceOf',
            args: [contracts.base.superOETHbStrategyAero.address],
          },
          {
            address: contracts.base.superOETHbCurveAMOStrategy.address,
            abi: contracts.base.superOETHbCurveAMOStrategy.abi,
            chainId: contracts.base.superOETHbCurveAMOStrategy.chainId,
            functionName: 'checkBalance',
            args: [tokens.base.WETH.address],
          },
          {
            address: contracts.base.curvePoolWethSuperOethb.address,
            abi: contracts.base.curvePoolWethSuperOethb.abi,
            chainId: contracts.base.curvePoolWethSuperOethb.chainId,
            functionName: 'get_balances',
          },
        ],
      });

      const superOethVaultTotalValue =
        data?.[0]?.status === 'success'
          ? ([data[0].result, tokens.base.WETH.decimals] as Dnum)
          : from(0);
      const balanceBridge =
        data?.[1]?.status === 'success'
          ? ([data[1].result, tokens.base.WETH.decimals] as Dnum)
          : from(0);
      const balanceAmoWeth =
        data?.[2]?.status === 'success'
          ? ([data[2].result?.[0], tokens.base.WETH.decimals] as Dnum)
          : from(0);
      const balanceAmoSuper =
        data?.[2]?.status === 'success'
          ? ([data[2].result?.[1], tokens.base.superOETHb.decimals] as Dnum)
          : from(0);
      const pendingAmoWeth =
        data?.[3]?.status === 'success'
          ? ([data[3].result, tokens.base.WETH.decimals] as Dnum)
          : from(0);
      const curveAmo =
        data?.[4]?.status === 'success'
          ? ([data[4].result, tokens.base.WETH.decimals] as Dnum)
          : from(0);
      const curveBalances =
        data?.[5]?.status === 'success'
          ? [
              [data[5].result?.[0], tokens.base.WETH.decimals] as Dnum,
              [data[5].result?.[1], tokens.base.superOETHb.decimals] as Dnum,
            ]
          : [from(0), from(0)];

      const balanceAmo = [balanceAmoWeth, pendingAmoWeth].reduce(
        (acc, curr) => add(acc, curr),
        from(0, tokens.base.WETH.decimals),
      );
      const curveRatio = div(
        curveBalances[0],
        add(curveBalances[0], curveBalances[1]),
      );
      const curveAmoWethAmount = mul(curveAmo, curveRatio);
      const fullAmoBalanceWeth = [
        balanceAmoWeth,
        balanceAmoSuper,
        pendingAmoWeth,
        curveAmoWethAmount,
      ].reduce(
        (acc, curr) => add(acc, curr),
        from(0, tokens.base.WETH.decimals),
      );
      const circulating = [fullAmoBalanceWeth, balanceBridge].reduce(
        (acc, curr) => add(curr, acc),
        from(0, tokens.base.WETH.decimals),
      );
      const unallocatedBalance = gt(
        sub(superOethVaultTotalValue, circulating),
        0,
      )
        ? sub(superOethVaultTotalValue, circulating)
        : from(0, 18);
      const computedTotal = [
        balanceAmo,
        balanceBridge,
        curveAmoWethAmount,
        unallocatedBalance,
      ].reduce((acc, curr) => add(acc, curr), from(0, 18));

      return [
        {
          label: intl.formatMessage({
            defaultMessage: 'Liquid Staking',
          }),
          icon: wOETH,
          value: toNumber(balanceBridge),
          color: theme.palette.primary.main,
          token: tokens.mainnet.ETH,
          total: toNumber(computedTotal),
          href: `https://basescan.org/address/0x80c864704dd06c3693ed5179190786ee38acf835`,
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Aerodrome AMO',
          }),
          icon: ETH,
          value: toNumber(balanceAmo),
          color: theme.palette.chart6,
          token: tokens.mainnet.ETH,
          total: toNumber(computedTotal),
          href: 'https://basescan.org/address/0xf611cc500eee7e4e4763a05fe623e2363c86d2af',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Curve AMO',
          }),
          icon: Curve,
          value: toNumber(curveAmoWethAmount),
          color: theme.palette.chart5,
          token: tokens.mainnet.ETH,
          total: toNumber(computedTotal),
          href: 'https://basescan.org/address/0x9cfcaf81600155e01c63e4d2993a8a81a8205829',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Unallocated',
          }),
          icon: ETH,
          value: Math.max(toNumber(unallocatedBalance), 0),
          color: theme.palette.chart1,
          token: tokens.mainnet.ETH,
          total: toNumber(computedTotal),
          href: '',
        },
      ];
    },
  });
};
