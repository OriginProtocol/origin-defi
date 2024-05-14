import { useEffect } from 'react';

import { capitalize } from '@mui/material';
import { isUserRejected } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { ConnectedButton } from '../../wagmi';

import type { SimulateContractErrorType } from '@wagmi/core';
import type {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  TransactionReceipt,
} from 'viem';

import type {
  ConnectedButtonProps,
  WriteTransactionCallbacks,
  WriteTransactionParameters,
} from '../../wagmi';

export type TxButtonFnParameters = {
  simulateError: SimulateContractErrorType | null;
};

export type TxButtonProps<
  abi extends Abi = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
> = {
  label?: string | ((params: TxButtonFnParameters) => string | undefined);
  waitingSignatureLabel?: string;
  waitingTxLabel?: string;
  params?: WriteTransactionParameters<abi, functionName, args>;
  callbacks?: WriteTransactionCallbacks;
} & Omit<
  ConnectedButtonProps,
  'onClick' | 'value' | 'children' | 'targetChainId'
>;

export const TxButton = <
  abi extends Abi = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
>({
  label,
  disabled,
  waitingSignatureLabel,
  waitingTxLabel,
  params,
  callbacks,
  ...rest
}: TxButtonProps<abi, functionName, args>) => {
  const intl = useIntl();
  const { isConnected, chain } = useAccount();
  const { data: simulateData, error: simulateError } = useSimulateContract(
    params && {
      address: params.contract.address,
      abi: params.contract.abi as Abi,
      functionName: params.functionName as functionName,
      args: params?.args as readonly unknown[],
      value: params?.value,
      chainId: params.contract.chainId,
      query: {
        enabled:
          isConnected &&
          !disabled &&
          !!params.contract?.address &&
          params.contract.chainId === chain?.id,
      },
    },
  );
  const {
    writeContract,
    data: hash,
    error: writeError,
    reset: resetWriteContract,
    status: writeStatus,
  } = useWriteContract();
  const {
    data: waitTxData,
    error: waitTxError,
    status: waitTxStatus,
  } = useWaitForTransactionReceipt({ hash });
  const prevWriteStatus = usePrevious(writeStatus);
  const prevWaitTxStatus = usePrevious(waitTxStatus);

  useEffect(() => {
    if (chain?.id !== params?.contract.chainId) {
      resetWriteContract();
    }
  }, [chain?.id, params?.contract.chainId, resetWriteContract]);

  useEffect(() => {
    if (simulateData) {
      callbacks?.onSimulateSuccess?.(simulateData);
    }
  }, [callbacks, simulateData]);

  useEffect(() => {
    if (
      writeStatus === 'success' &&
      prevWriteStatus === 'pending' &&
      waitTxStatus === 'pending'
    ) {
      callbacks?.onTxSigned?.();
    }
  }, [callbacks, prevWriteStatus, waitTxStatus, writeStatus]);

  useEffect(() => {
    if (
      writeStatus === 'success' &&
      waitTxStatus === 'success' &&
      prevWaitTxStatus === 'pending'
    ) {
      callbacks?.onWriteSuccess?.(waitTxData as TransactionReceipt);
    }
  }, [callbacks, prevWaitTxStatus, waitTxData, waitTxStatus, writeStatus]);

  useEffect(() => {
    if (
      (writeStatus === 'error' && prevWriteStatus === 'pending') ||
      (waitTxStatus === 'error' && prevWaitTxStatus === 'pending')
    ) {
      const err = writeError ?? waitTxError;

      if (isUserRejected(err)) {
        callbacks?.onUserReject?.();
      } else if (err) {
        callbacks?.onWriteError?.(err);
      }
    }
  }, [
    callbacks,
    prevWaitTxStatus,
    prevWriteStatus,
    waitTxError,
    waitTxStatus,
    writeError,
    writeStatus,
  ]);

  const handleClick = () => {
    if (simulateError) {
      callbacks?.onSimulateError?.(simulateError);
    } else if (simulateData?.request) {
      writeContract(simulateData.request);
      callbacks?.onWrite?.();
    }
  };

  const customButtonLabel =
    typeof label === 'function' ? label({ simulateError }) : label;

  const buttonLabel = customButtonLabel
    ? customButtonLabel
    : writeStatus === 'pending'
      ? waitingSignatureLabel ??
        intl.formatMessage({ defaultMessage: 'Waiting for signature' })
      : writeStatus === 'success' &&
          prevWriteStatus === 'pending' &&
          waitTxStatus === 'pending'
        ? waitingTxLabel ??
          intl.formatMessage({ defaultMessage: 'Processing Transaction' })
        : customButtonLabel ?? capitalize(params?.functionName ?? '');
  const isDisabled =
    !!simulateError ||
    writeStatus === 'pending' ||
    (writeStatus === 'success' &&
      prevWriteStatus === 'pending' &&
      waitTxStatus === 'pending');

  return (
    <ConnectedButton
      {...rest}
      disabled={isDisabled}
      onClick={handleClick}
      targetChainId={params?.contract.chainId}
    >
      {buttonLabel}
    </ConnectedButton>
  );
};
