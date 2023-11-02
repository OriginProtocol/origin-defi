import { contracts } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions } from '@tanstack/react-query';

export const usePendingYield = (
  isWrapped = false,
  options?: QueryOptions<
    number,
    Error,
    number,
    ['usePendingYield', boolean, HexAddress, boolean]
  >,
) => {
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ['usePendingYield', isWrapped, address, isConnected],
    queryFn: async () => {
      if (!isConnected) {
        return 0;
      }

      const [
        totalValue,
        totalSupply,
        availableFunds,
        nonRebasingSupply,
        balance,
      ] = (
        await readContracts({
          contracts: [
            {
              address: contracts.mainnet.OETHVaultCore.address,
              abi: contracts.mainnet.OETHVaultCore.abi,
              functionName: 'totalValue',
            },
            {
              address: contracts.mainnet.OETH.address,
              abi: contracts.mainnet.OETH.abi,
              functionName: 'totalSupply',
            },
            {
              address: contracts.mainnet.Dripper.address,
              abi: contracts.mainnet.Dripper.abi,
              functionName: 'availableFunds',
            },
            {
              address: contracts.mainnet.OETH.address,
              abi: contracts.mainnet.OETH.abi,
              functionName: 'nonRebasingSupply',
            },
            {
              address: contracts.mainnet.OETH.address,
              abi: contracts.mainnet.OETH.abi,
              functionName: 'balanceOf',
              args: [address],
            },
          ],
        })
      ).map((res) => (res.status === 'success' ? +formatEther(res.result) : 0));

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
