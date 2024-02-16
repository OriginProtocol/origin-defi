import { useEffect } from 'react';

import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { erc20Abi } from 'viem';
import { mainnet } from 'viem/chains';
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useReadContract,
  useReadContracts,
} from 'wagmi';

import type { Token } from '@origin/shared/contracts';
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

export const useWatchContracts = <T extends Abi | readonly unknown[]>(
  config: UseReadContractsParameters<T>,
) => {
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
    args: [addr ?? ZERO_ADDRESS],
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

export const useIsNative = (token: Token) => {
  const { chain } = useAccount();

  return (
    token.symbol ===
    (chain?.nativeCurrency.symbol ?? mainnet.nativeCurrency.symbol)
  );
};
