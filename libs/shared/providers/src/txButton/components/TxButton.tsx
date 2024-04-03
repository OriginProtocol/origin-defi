import { useEffect, useState } from 'react';

import { capitalize } from '@mui/material';
import { isNilOrEmpty, isUserRejected } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { ConnectedButton } from '../../wagmi';

import type { Contract, Token } from '@origin/shared/contracts';
import type { TransactionReceipt } from 'viem';

import type { ConnectedButtonProps } from '../../wagmi';

export type TxButtonProps = {
  contract: Contract | Token;
  functionName: string;
  args?: unknown[];
  value?: bigint;
  label?: string;
  waitingSignatureLabel?: string;
  waitingTxLabel?: string;
  onClick?: () => void;
  onTxSigned?: () => void;
  onUserReject?: () => void;
  onSimulateError?: (error: Error) => void;
  onWriteSuccess?: (txReceipt: TransactionReceipt) => void;
  onWriteError?: (error: Error) => void;
} & Omit<
  ConnectedButtonProps,
  'onClick' | 'value' | 'children' | 'targetChainId'
>;

export const TxButton = ({
  contract,
  functionName,
  args,
  value,
  label,
  waitingSignatureLabel,
  waitingTxLabel,
  onClick,
  onTxSigned,
  onUserReject,
  onSimulateError,
  onWriteSuccess,
  onWriteError,
  disabled,
  ...rest
}: TxButtonProps) => {
  const intl = useIntl();
  const { isConnected, chain } = useAccount();
  const [txButtonState, setTxButtonState] = useState({
    label: isNilOrEmpty(label) ? capitalize(functionName) : label,
    disabled,
  });
  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    value,
    chainId: contract.chainId,
    query: {
      enabled:
        isConnected &&
        !!contract?.address &&
        contract.chainId === chain?.id &&
        !disabled,
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
    if (chain?.id !== contract?.chainId) {
      resetWriteContract();
      setTxButtonState({
        label: isNilOrEmpty(label) ? capitalize(functionName) : label,
        disabled: disabled || false,
      });
    }
  }, [
    chain?.id,
    contract?.chainId,
    disabled,
    functionName,
    label,
    resetWriteContract,
  ]);

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
      onTxSigned?.();
      setTxButtonState({
        label:
          waitingTxLabel ??
          intl.formatMessage({ defaultMessage: 'Processing Transaction' }),
        disabled: true,
      });
    }
  }, [
    intl,
    onTxSigned,
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
      onWriteSuccess?.(waitTxData as TransactionReceipt);
      setTxButtonState({
        label: isNilOrEmpty(label) ? capitalize(functionName) : label,
        disabled: disabled || false,
      });
    }
  }, [
    disabled,
    functionName,
    label,
    onWriteSuccess,
    prevWaitTxStatus,
    resetWriteContract,
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
        onUserReject?.();
      } else if (err) {
        onWriteError?.(err);
      }
      setTxButtonState({
        label: isNilOrEmpty(label) ? capitalize(functionName) : label,
        disabled: disabled || false,
      });
    }
  }, [
    disabled,
    functionName,
    label,
    onUserReject,
    onWriteError,
    prevWaitTxStatus,
    prevWriteStatus,
    resetWriteContract,
    waitTxError,
    waitTxStatus,
    writeError,
    writeStatus,
  ]);

  const handleClick = () => {
    if (simulateError) {
      onSimulateError?.(simulateError);
    } else if (simulateData?.request) {
      writeContract(simulateData.request);
      onClick?.();
    }
  };

  return (
    <ConnectedButton
      {...rest}
      disabled={txButtonState.disabled}
      onClick={handleClick}
      targetChainId={contract.chainId}
    >
      {txButtonState.label}
    </ConnectedButton>
  );
};
