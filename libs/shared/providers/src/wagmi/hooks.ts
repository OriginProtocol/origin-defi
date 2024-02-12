import { useEffect } from 'react';

import { isNilOrEmpty } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { erc20Abi } from 'viem';
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
  const prev = usePrevious(Number(blockNumber));
  const res = useReadContract(config);

  useEffect(() => {
    if (Number(blockNumber) !== prev) {
      res?.refetch();
    }
  }, [blockNumber, prev, res]);

  return res;
};

export const useWatchContracts = (config: UseReadContractsParameters) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const prev = usePrevious(Number(blockNumber));
  const res = useReadContracts(config);

  useEffect(() => {
    if (Number(blockNumber) !== prev) {
      res?.refetch();
    }
  }, [blockNumber, prev, res]);

  return res;
};

export const useWatchBalance = (config?: {
  token?: HexAddress;
  address?: HexAddress;
}) => {
  const { address } = useAccount();
  const addr = config?.address ?? address;
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !!addr },
  });
  const prev = usePrevious(Number(blockNumber));
  const resNative = useBalance({
    address: config?.address ?? address,
    query: {
      enabled: isNilOrEmpty(config?.token) && !!addr,
      select: (data) => data.value,
    },
  });
  const resToken = useReadContract({
    address: config?.token,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [addr],
    query: {
      enabled: !!config?.token && !!addr,
    },
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(addr)) {
      if (isNilOrEmpty(config?.token)) {
        resNative?.refetch();
      } else {
        resToken?.refetch();
      }
    }
  }, [addr, blockNumber, config?.token, prev, resNative, resToken]);

  return isNilOrEmpty(config?.token) ? resNative : resToken;
};
