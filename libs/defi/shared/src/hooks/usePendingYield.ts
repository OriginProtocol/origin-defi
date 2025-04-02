import { contracts, tokens } from '@origin/shared/contracts';
import { hasKey } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { add, div, eq, from, mul, sub, toNumber } from 'dnum';
import { useAccount, useConfig } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions } from '@tanstack/react-query';
import type { Dnum } from 'dnum';

const supportedContracts = {
  [tokens.mainnet.OETH.id]: {
    vault: contracts.mainnet.OETHVault,
    dripper: contracts.mainnet.OETHDripper,
  },
  [tokens.mainnet.OUSD.id]: {
    vault: contracts.mainnet.OUSDVault,
    dripper: contracts.mainnet.OUSDDripper,
  },
  [tokens.base.superOETHb.id]: {
    vault: contracts.base.superOETHbVault,
    dripper: contracts.base.superOETHbDripper,
  },
  [tokens.sonic.OS.id]: {
    vault: contracts.sonic.osVault,
    dripper: contracts.sonic.osDripper,
  },
} as const;

export const usePendingYield = (
  token: Token,
  options?: QueryOptions<
    number,
    Error,
    number,
    ['usePendingYield', string, HexAddress | undefined, boolean]
  >,
) => {
  const config = useConfig();
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ['usePendingYield', token.id, address, isConnected],
    queryFn: async () => {
      if (
        !isConnected ||
        !address ||
        !token.address ||
        !hasKey(supportedContracts, token.id)
      ) {
        return 0;
      }

      const [
        totalValue,
        totalSupply,
        availableFunds,
        nonRebasingSupply,
        balance,
      ] = (
        await readContracts(config, {
          contracts: [
            {
              address: supportedContracts[token.id].vault.address,
              abi: supportedContracts[token.id].vault.abi,
              functionName: 'totalValue',
              chainId: supportedContracts[token.id].vault.chainId,
            },
            {
              address: token.address,
              abi: token.abi,
              functionName: 'totalSupply',
              chainId: token.chainId,
            },
            {
              address: supportedContracts[token.id].dripper.address,
              abi: supportedContracts[token.id].dripper.abi,
              functionName: 'availableFunds',
              chainId: supportedContracts[token.id].dripper.chainId,
            },
            {
              address: token.address,
              abi: token.abi,
              functionName: 'nonRebasingSupply',
              chainId: token.chainId,
            },
            {
              address: token.address,
              abi: token.abi,
              functionName: 'balanceOf',
              args: [address],
              chainId: token.chainId,
            },
          ],
        })
      ).map((res) =>
        res.status === 'success'
          ? ([res?.result, token.decimals] as Dnum)
          : from(0, token.decimals),
      );

      const vaultYield = sub(totalValue, totalSupply);
      const expectedYield = add(vaultYield, availableFunds);
      const rebasingSupply = sub(totalSupply, nonRebasingSupply);
      const expectedYieldPerOeth = eq(rebasingSupply, 0)
        ? 0
        : div(expectedYield, rebasingSupply);
      const expectedYieldPerOethWithFee = mul(expectedYieldPerOeth, 0.8);

      return toNumber(mul(balance, expectedYieldPerOethWithFee));
    },
    ...options,
  });
};
