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
  const res = useReadContract(config);

  useEffect(() => {
    res?.refetch();
  }, [blockNumber, res]);

  return res;
};

export const useWatchContracts = (config: UseReadContractsParameters) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const res = useReadContracts(config);

  useEffect(() => {
    res?.refetch();
  }, [blockNumber, res]);

  return res;
};

export const useWatchBalance = (config?: { address?: HexAddress }) => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const res = useBalance({
    address: config?.address ?? address,
  });

  useEffect(() => {
    res?.refetch();
  }, [blockNumber, res]);

  return res;
};
