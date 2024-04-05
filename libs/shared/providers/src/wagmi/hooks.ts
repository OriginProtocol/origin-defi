import { useCallback, useEffect, useState } from 'react';

import { getTokenId } from '@origin/shared/contracts';
import {
  isFulfilled,
  isNilOrEmpty,
  isUserRejected,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import {
  getBalance,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core';
import { mainnet } from 'viem/chains';
import {
  useAccount,
  useBlockNumber,
  useConfig,
  useReadContract,
  useReadContracts,
  useSimulateContract,
} from 'wagmi';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';
import type {
  UseReadContractParameters,
  UseReadContractsParameters,
} from 'wagmi';

import type {
  WriteTransactionCallbacks,
  WriteTransactionParameters,
} from './types';

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

export const useWatchBalance = (args?: {
  token: Token;
  address?: HexAddress;
}) => {
  const config = useConfig();
  const { address } = useAccount();
  const addr = args?.address ?? address;
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !!addr },
  });
  const prev = usePrevious(Number(blockNumber));

  const res = useQuery({
    queryKey: ['useWatchBalance', args?.token, addr, config],
    queryFn: async () => {
      const bal = await getBalance(config, {
        address: addr ?? ZERO_ADDRESS,
        token: args?.token.address,
        chainId: args?.token.chainId ?? mainnet.id,
      });

      return bal.value;
    },
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(addr)) {
      res?.refetch();
    }
  }, [addr, blockNumber, prev, res]);

  return res;
};

export const useWatchBalances = (args: {
  tokens: Token[];
  address?: HexAddress;
}) => {
  const config = useConfig();
  const { address } = useAccount();
  const addr = args?.address ?? address;
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !isNilOrEmpty(args.tokens) },
  });
  const prev = usePrevious(Number(blockNumber));
  const res = useQuery({
    queryKey: [
      'useWatchBalances',
      addr,
      args.tokens?.map((t) => t.symbol),
      config,
    ],
    queryFn: async () => {
      if (!args.tokens || isNilOrEmpty(args.tokens) || !addr) {
        return null;
      }

      let res = {} as Record<string, bigint>;

      const bals = await Promise.allSettled(
        args.tokens.map((t) =>
          getBalance(config, {
            address: addr,
            token: t.address,
            chainId: t.chainId,
          }),
        ),
      );

      bals.forEach((bal, i) => {
        if (isFulfilled(bal)) {
          res = { ...res, [getTokenId(args.tokens[i])]: bal.value.value };
        }
      });

      return res;
    },
  });

  useEffect(() => {
    if (Number(blockNumber) !== prev && !isNilOrEmpty(args.tokens)) {
      res?.refetch();
    }
  }, [args.tokens, blockNumber, prev, res]);

  return res;
};

export const useWriteTransaction = (args: {
  parameters: WriteTransactionParameters;
  callbacks?: WriteTransactionCallbacks;
}) => {
  const config = useConfig();
  const { isConnected, chain } = useAccount();
  const [status, setStatus] = useState<
    'idle' | 'waitingForSignature' | 'waitingForTx'
  >('idle');
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: args.parameters.contract.address,
    abi: args.parameters.contract.abi,
    functionName: args.parameters.functionName,
    args: args.parameters?.args,
    value: args.parameters?.value,
    chainId: args.parameters.contract.chainId,
    query: {
      enabled:
        isConnected &&
        !!args.parameters.contract &&
        chain?.id === args.parameters.contract.chainId &&
        !!args.parameters.functionName,
    },
  });

  useEffect(() => {
    if (simulateData) {
      args?.callbacks?.onSimulateSuccess?.(simulateData);
    }
  }, [args?.callbacks, simulateData]);

  const writeTransaction = useCallback(async () => {
    let hash;
    let txReceipt;
    if (simulateError) {
      args?.callbacks?.onSimulateError?.(simulateError);
    } else if (simulateData?.request) {
      args?.callbacks?.onWrite?.();
      setStatus('waitingForSignature');
      try {
        hash = await writeContract(config, simulateData.request);
      } catch (writeError) {
        if (isUserRejected(writeError)) {
          args?.callbacks?.onUserReject?.();
        } else {
          args?.callbacks?.onWriteError?.(writeError as unknown as Error);
        }
        setStatus('idle');
      }
      if (hash) {
        args?.callbacks?.onTxSigned?.();
        setStatus('waitingForTx');
        try {
          txReceipt = await waitForTransactionReceipt(config, { hash });
        } catch (waitError) {
          if (isUserRejected(waitError)) {
            args?.callbacks?.onUserReject?.();
          } else {
            args?.callbacks?.onWriteError?.(waitError as unknown as Error);
          }
          setStatus('idle');
        }
      }
      if (txReceipt) {
        args?.callbacks?.onWriteSuccess?.(txReceipt);
      }
      setStatus('idle');
    }
  }, [args?.callbacks, config, simulateData?.request, simulateError]);

  return { status, writeTransaction };
};
