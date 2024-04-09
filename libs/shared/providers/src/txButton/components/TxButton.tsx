import { useEffect, useState } from 'react';

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
  label?: string;
  waitingSignatureLabel?: string;
  waitingTxLabel?: string;
  params: WriteTransactionParameters<abi, functionName, args>;
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
  waitingSignatureLabel,
  waitingTxLabel,
  params,
  callbacks,
  disabled,
  ...rest
}: TxButtonProps<abi, functionName, args>) => {
  const intl = useIntl();
  const { isConnected, chain } = useAccount();
  const [txButtonState, setTxButtonState] = useState({
    label: label ?? capitalize(params.functionName),
    disabled,
  });
  const { data: simulateData, error: simulateError } = useSimulateContract({
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
  const prevWriteStatus = usePrevious(writeStatus);
  const prevWaitTxStatus = usePrevious(waitTxStatus);

  useEffect(() => {
    if (chain?.id !== params.contract.chainId) {
      resetWriteContract();
      setTxButtonState({
        label: label ?? capitalize(params.functionName),
        disabled: disabled || false,
      });
    }
  }, [
    chain?.id,
    disabled,
    label,
    params.contract.chainId,
    params.functionName,
    resetWriteContract,
  ]);

  useEffect(() => {
    if (simulateData) {
      callbacks?.onSimulateSuccess?.(simulateData);
    }
  }, [callbacks, simulateData]);

  useEffect(() => {
    if (writeStatus === 'pending') {
      setTxButtonState({
        label:
          waitingSignatureLabel ??
          intl.formatMessage({ defaultMessage: 'Waiting for signature' }),
        disabled: true,
      });
    }
  }, [intl, waitingSignatureLabel, writeStatus]);

  useEffect(() => {
    if (
      writeStatus === 'success' &&
      prevWriteStatus === 'pending' &&
      waitTxStatus === 'pending'
    ) {
      callbacks?.onTxSigned?.();
      setTxButtonState({
        label:
          waitingTxLabel ??
          intl.formatMessage({ defaultMessage: 'Processing Transaction' }),
        disabled: true,
      });
    }
  }, [
    callbacks,
    intl,
    prevWriteStatus,
    waitTxStatus,
    waitingTxLabel,
    writeStatus,
  ]);

  useEffect(() => {
    if (
      writeStatus === 'success' &&
      waitTxStatus === 'success' &&
      prevWaitTxStatus === 'pending'
    ) {
      callbacks?.onWriteSuccess?.(waitTxData as TransactionReceipt);
      setTxButtonState({
        label: label ?? capitalize(params.functionName),
        disabled: disabled || false,
      });
    }
  }, [
    callbacks,
    disabled,
    label,
    params.functionName,
    prevWaitTxStatus,
    waitTxData,
    waitTxStatus,
    writeStatus,
  ]);

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
      setTxButtonState({
        label: label ?? capitalize(params.functionName),
        disabled: disabled || false,
      });
    }
  }, [
    callbacks,
    disabled,
    label,
    params.functionName,
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

  return (
    <ConnectedButton
      {...rest}
      disabled={txButtonState.disabled}
      onClick={handleClick}
      targetChainId={params.contract.chainId}
    >
      {txButtonState.label}
    </ConnectedButton>
  );
};
