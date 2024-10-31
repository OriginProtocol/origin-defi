import { useTheme } from '@mui/material';
import { contracts, tokens } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { add, from, sub, toNumber } from 'dnum';
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
        ],
      });

      const totalValue =
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

      const balanceAmo = [balanceAmoWeth, pendingAmoWeth].reduce(
        (acc, curr) => add(acc, curr),
        from(0, tokens.base.WETH.decimals),
      );
      const fullAmoBalanceWeth = [
        balanceAmoWeth,
        balanceAmoSuper,
        pendingAmoWeth,
      ].reduce(
        (acc, curr) => add(acc, curr),
        from(0, tokens.base.WETH.decimals),
      );
      const unallocatedBalance = sub(
        totalValue,
        add(fullAmoBalanceWeth, balanceBridge),
      );
      const computedTotal = sub(totalValue, balanceAmoSuper);

      return [
        {
          label: intl.formatMessage({
            defaultMessage: 'Liquid Staking',
          }),
          value: toNumber(balanceBridge),
          color: theme.palette.primary.main,
          token: tokens.mainnet.wOETH,
          total: toNumber(computedTotal),
          href: '',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Aerodrome AMO',
          }),
          value: toNumber(balanceAmo),
          color: theme.palette.chart3,
          token: tokens.mainnet.ETH,
          total: toNumber(computedTotal),
          href: '',
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Unallocated',
          }),
          value: toNumber(unallocatedBalance),
          color: theme.palette.chart6,
          token: tokens.mainnet.ETH,
          total: toNumber(computedTotal),
          href: '',
        },
      ];
    },
  });
};
