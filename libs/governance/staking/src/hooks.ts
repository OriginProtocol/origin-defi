import { tokens } from '@origin/shared/contracts';
import { formatUnits } from 'viem';
import { useAccount, useContractReads } from 'wagmi';

export const useStakingInfo = () => {
  const { address } = useAccount();
  const { data, isLoading } = useContractReads({
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
    ],
    select: (data) => data.map((d) => (d.status === 'success' ? d.result : 0n)),
    allowFailure: true,
  });

  const ogvTotalSupply = data?.[0] ?? 0n;
  const veOgvTotalSupply = data?.[1] ?? 0n;
  const ogvBalance = data?.[2] ?? 0n;
  const veOgvBalance = data?.[3] ?? 0n;
  const ogvRewards = data?.[4] ?? 0n;

  const votingPowerPercent =
    +formatUnits(veOgvBalance, tokens.mainnet.veOGV.decimals) /
    +formatUnits(veOgvTotalSupply, tokens.mainnet.veOGV.decimals);

  return {
    isLoading,
    ogvTotalSupply,
    veOgvTotalSupply,
    ogvBalance,
    veOgvBalance,
    ogvRewards,
    votingPowerPercent,
  };
};
