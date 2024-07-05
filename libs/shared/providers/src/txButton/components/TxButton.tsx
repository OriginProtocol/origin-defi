/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { capitalize } from '@mui/material';
import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { usePreviousDistinct } from '@react-hookz/web';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { ConnectedButton } from '../../wagmi';

import type { ReactNode } from 'react';
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
  label?: ReactNode;
  waitingSignatureLabel?: string;
  waitingTxLabel?: string;
  validatingTxLabel?: string;
  params: WriteTransactionParameters<abi, functionName, args>;
  callbacks?: WriteTransactionCallbacks;
  gas?: bigint;
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
  waitingSignatureLabel,
  waitingTxLabel,
  validatingTxLabel,
  params,
  callbacks,
  disabled,
  gas,
  ...rest
}: TxButtonProps<abi, functionName, args>) => {
  const intl = useIntl();
  const { isConnected, chain } = useAccount();
  const {
    data: simulateData,
    error: simulateError,
    isLoading: isSimulateLoading,
  } = useSimulateContract({
    address: params.contract.address,
    abi: params.contract.abi as Abi,
    functionName: params.functionName as functionName,
    args: params.args as readonly unknown[],
    value: params?.value,
    chainId: params.contract.chainId,
    query: {
      enabled:
        isConnected &&
        !!params.contract?.address &&
        params.contract.chainId === chain?.id,
    },
  });
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
  const prevWriteStatus = usePreviousDistinct(writeStatus);
  const prevWaitTxStatus = usePreviousDistinct(waitTxStatus);

  useEffect(() => {
    if (chain?.id !== params.contract.chainId) {
      resetWriteContract();
    }
  }, [
    chain?.id,
    params.contract.chainId,
    resetWriteContract,
    waitTxStatus,
    writeStatus,
  ]);

  useEffect(() => {
    if (simulateData) {
      callbacks?.onSimulateSuccess?.(simulateData);
    }
  }, [simulateData, waitTxStatus, writeStatus]);

  useEffect(() => {
    if (writeStatus === 'success' && waitTxStatus === 'pending') {
      callbacks?.onTxSigned?.();
    }
  }, [waitTxStatus, writeStatus]);

  useEffect(() => {
    if (
      writeStatus === 'success' &&
      waitTxStatus === 'success' &&
      prevWaitTxStatus === 'pending'
    ) {
      callbacks?.onWriteSuccess?.(waitTxData as TransactionReceipt);
    }
  }, [prevWaitTxStatus, waitTxData, waitTxStatus, writeStatus]);

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
    prevWaitTxStatus,
    prevWriteStatus,
    waitTxError,
    waitTxStatus,
    writeError,
    writeStatus,
  ]);

  const handleClick = () => {
    callbacks?.onClick?.();
    if (simulateError) {
      callbacks?.onSimulateError?.(simulateError);
    } else if (simulateData?.request) {
      writeContract({ ...simulateData.request, ...(!!gas && { gas }) });
      callbacks?.onWrite?.();
    }
  };

  const buttonLabel =
    isSimulateLoading && !isNilOrEmpty(validatingTxLabel)
      ? validatingTxLabel
      : writeStatus === 'pending'
        ? waitingSignatureLabel ??
          intl.formatMessage({ defaultMessage: 'Waiting for signature' })
        : writeStatus === 'success' &&
            prevWriteStatus === 'pending' &&
            waitTxStatus === 'pending'
          ? waitingTxLabel ??
            intl.formatMessage({ defaultMessage: 'Processing Transaction' })
          : label ?? capitalize(params.functionName);
  const isDisabled =
    disabled ||
    isSimulateLoading ||
    writeStatus === 'pending' ||
    (writeStatus === 'success' &&
      prevWriteStatus === 'pending' &&
      waitTxStatus === 'pending');

  return (
    <ConnectedButton
      {...rest}
      disabled={isDisabled}
      onClick={handleClick}
      targetChainId={params.contract.chainId}
    >
      {buttonLabel}
    </ConnectedButton>
  );
};
