import { contracts, tokens } from '@origin/shared/contracts';
import { hasKey } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatEther } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions } from '@tanstack/react-query';

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
            },
            {
              address: token.address,
              abi: token.abi,
              functionName: 'totalSupply',
            },
            {
              address: supportedContracts[token.id].dripper.address,
              abi: supportedContracts[token.id].dripper.abi,
              functionName: 'availableFunds',
            },
            {
              address: token.address,
              abi: token.abi,
              functionName: 'nonRebasingSupply',
            },
            {
              address: token.address,
              abi: token.abi,
              functionName: 'balanceOf',
              args: [address],
            },
          ],
        })
      ).map((res) =>
        res.status === 'success'
          ? +formatEther(res?.result as unknown as bigint)
          : 0,
      );

      const vaultYield = totalValue - totalSupply;
      const expectedYield = vaultYield + availableFunds;
      const rebasingSupply = totalSupply - nonRebasingSupply;
      const expectedYieldPerOeth = expectedYield / rebasingSupply;
      const expectedYieldPerOethWithFee = expectedYieldPerOeth * 0.8;

      return balance * expectedYieldPerOethWithFee;
    },
    ...options,
  });
};
