import { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { getTokenIconUrl, tokens } from '@origin/shared/contracts';
import {
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaCircleXmarkRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { useSwapState } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useWalletClient } from 'wagmi';

import type { DialogProps } from '@mui/material';

export const TransactionProgressModal = ({ onClose, ...rest }: DialogProps) => {
  const intl = useIntl();
  const [{ status }] = useSwapState();
  const [txResult, setTxResult] = useState('');
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (
      [
        'approvalTransactionSuccess',
        'approvalTransactionFailure',
        'approvalTransactionRejected',
        'swapTransactionSuccess',
        'swapTransactionFailure',
        'swapTransactionRejected',
      ].includes(status)
    ) {
      setTxResult(status);
    }
  }, [status]);

  const handleAddTokenToWallet = () => {
    walletClient?.watchAsset({
      type: 'ERC20',
      options: {
        address: tokens.mainnet.primeETH.address,
        decimals: tokens.mainnet.primeETH.decimals,
        symbol: tokens.mainnet.primeETH.symbol,
        image: getTokenIconUrl(tokens.mainnet.primeETH),
      },
    });
  };

  const icon = {
    approvalTransactionSuccess: (
      <FaCircleCheckRegular sx={{ fontSize: 40, color: 'success.main' }} />
    ),
    swapTransactionSuccess: (
      <FaCircleCheckRegular sx={{ fontSize: 40, color: 'success.main' }} />
    ),
    approvalTransactionRejected: (
      <FaCircleExclamationRegular
        sx={{ fontSize: 40, color: 'warning.main' }}
      />
    ),
    swapTransactionRejected: (
      <FaCircleExclamationRegular
        sx={{ fontSize: 40, color: 'warning.main' }}
      />
    ),
    approvalTransactionFailure: (
      <FaCircleXmarkRegular sx={{ fontSize: 40, color: 'primary.main' }} />
    ),
    swapTransactionFailure: (
      <FaCircleXmarkRegular sx={{ fontSize: 40, color: 'primary.main' }} />
    ),
  }[txResult] ?? (
    <Box sx={{ position: 'relative', width: 40, height: 40 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          position: 'absolute',
          color: (theme) => alpha(theme.palette.primary.main, 0.3),
        }}
        size={40}
        thickness={4.4}
        value={100}
      />
      <CircularProgress
        color="primary"
        size={40}
        thickness={4}
        sx={{ position: 'absolute', animationDuration: '3s' }}
      />
    </Box>
  );
  const label =
    {
      approvalTransactionSuccess: intl.formatMessage({
        defaultMessage: 'Approval Complete',
      }),
      swapTransactionSuccess: intl.formatMessage({
        defaultMessage: 'Transaction Complete',
      }),
      approvalTransactionRejected: intl.formatMessage({
        defaultMessage: 'Approval Cancelled',
      }),
      swapTransactionRejected: intl.formatMessage({
        defaultMessage: 'Transaction Cancelled',
      }),
      approvalTransactionFailure: intl.formatMessage({
        defaultMessage: 'Approval Failure',
      }),
      swapTransactionFailure: intl.formatMessage({
        defaultMessage: 'Transaction Failure',
      }),
    }[txResult] ??
    intl.formatMessage({ defaultMessage: 'Transaction in progress' });

  return (
    <Dialog {...rest} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          py: 4,
        }}
      >
        {icon}
        <Typography
          variant="h5"
          sx={{
            mb: 1,
          }}
        >
          {label}
        </Typography>
        <Button
          onClick={handleAddTokenToWallet}
          variant="outlined"
          color="secondary"
        >
          <TokenIcon
            token={tokens.mainnet.primeETH}
            sx={{ fontSize: 20, mr: 1 }}
          />
          {intl.formatMessage({
            defaultMessage: 'Add primeETH',
          })}
        </Button>
      </DialogContent>
      <IconButton
        disabled={isNilOrEmpty(txResult)}
        onClick={(evt) => {
          onClose?.(evt, 'backdropClick');
        }}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <FaXmarkRegular sx={{ fontSize: 20 }} />
      </IconButton>
    </Dialog>
  );
};
