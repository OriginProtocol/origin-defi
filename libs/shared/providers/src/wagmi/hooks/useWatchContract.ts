import { useEffect } from 'react';

import { usePrevious } from '@react-hookz/web';
import useIdle from 'react-use/lib/useIdle';
import { useBlockNumber, useReadContract } from 'wagmi';

import type { Config } from '@wagmi/core';
import type { ReadContractData } from '@wagmi/core/query';
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem';
import type {
  UseReadContractParameters,
  UseReadContractReturnType,
} from 'wagmi';

export const useWatchContract = <
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'pure' | 'view'
  > = ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'pure' | 'view',
    functionName
  > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = Config,
  selectData = ReadContractData<abi, functionName, args>,
>(
  config: UseReadContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = {} as any,
) => {
  const isIdle = useIdle();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
    query: { enabled: !isIdle },
  });
  const prev = usePrevious(Number(blockNumber));
  const res = useReadContract(config as any);

  useEffect(() => {
    if (Number(blockNumber) !== prev) {
      res?.refetch();
    }
  }, [blockNumber, prev, res]);

  return res as UseReadContractReturnType<abi, functionName, args, selectData>;
};
