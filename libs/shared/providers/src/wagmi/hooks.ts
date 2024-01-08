import { useEffect } from 'react';

import {
  useAccount,
  useBalance,
  useBlockNumber,
  useReadContract,
  useReadContracts,
} from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';
import type {
  UseReadContractParameters,
  UseReadContractsParameters,
} from 'wagmi';

export const useWatchContract = <T extends Abi | readonly unknown[]>(
  config: UseReadContractParameters<T>,
) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { refetch, ...rest } = useReadContract(config);

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  return rest;
};

export const useWatchContracts = (config: UseReadContractsParameters) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { refetch, ...rest } = useReadContracts(config);

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  return rest;
};

export const useWatchBalance = (config?: { address?: HexAddress }) => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { refetch, ...rest } = useBalance({
    address: config?.address ?? address,
  });

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  return rest;
};
