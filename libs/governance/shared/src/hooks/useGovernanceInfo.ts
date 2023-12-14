import { tokens } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

export const useGovernanceInfo = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['useGovernanceInfo', address],
    queryFn: async () => {
      const data = await readContracts({
        contracts: [
          {
            address: tokens.mainnet.OGV.address,
            abi: tokens.mainnet.OGV.abi,
            functionName: 'totalSupply',
          },
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'totalSupply',
          },
          {
            address: tokens.mainnet.OGV.address,
            abi: tokens.mainnet.OGV.abi,
            functionName: 'balanceOf',
            args: [address],
          },
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'balanceOf',
            args: [address],
          },
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'previewRewards',
            args: [address],
          },
          {
            address: tokens.mainnet.OGV.address,
            abi: tokens.mainnet.OGV.abi,
            functionName: 'balanceOf',
            args: [tokens.mainnet.veOGV.address],
          },
          {
            address: tokens.mainnet.OGV.address,
            abi: tokens.mainnet.OGV.abi,
            functionName: 'allowance',
            args: [address, tokens.mainnet.veOGV.address],
          },
        ],
        allowFailure: true,
      });

      const [
        ogvTotalSupply,
        veOgvTotalSupply,
        ogvBalance,
        veOgvBalance,
        veOgvRewards,
        ogvTotalLocked,
        ogvVeOgvAllowance,
      ] = data.map((d) => (d.status === 'success' ? d.result : 0n));

      const votingPowerPercent =
        +formatUnits(veOgvBalance, tokens.mainnet.veOGV.decimals) /
        +formatUnits(veOgvTotalSupply, tokens.mainnet.veOGV.decimals);
      const ogvTotalLockedPercent =
        +formatUnits(ogvTotalLocked, tokens.mainnet.OGV.decimals) /
        +formatUnits(ogvTotalSupply, tokens.mainnet.OGV.decimals);

      return {
        ogvTotalSupply,
        veOgvTotalSupply,
        ogvBalance,
        veOgvBalance,
        veOgvRewards,
        votingPowerPercent,
        ogvTotalLocked,
        ogvTotalLockedPercent,
        ogvVeOgvAllowance,
      };
    },
    placeholderData: {
      ogvTotalSupply: 0n,
      veOgvTotalSupply: 0n,
      ogvBalance: 0n,
      veOgvBalance: 0n,
      veOgvRewards: 0n,
      votingPowerPercent: 0,
      ogvTotalLocked: 0n,
      ogvTotalLockedPercent: 0,
      ogvVeOgvAllowance: 0n,
    },
  });
};
