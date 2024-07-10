import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FaCheckRegular, FaXmarkRegular } from '@origin/shared/icons';
import { BlockExplorerLink } from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format } from 'dnum';
import { useIntl } from 'react-intl';

import { useViewSelect } from '../hooks';

import type { DialogProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';
import type { TransactionReceipt } from 'viem';

export type WithdrawalRequestModalProps = {
  amountOut?: bigint;
  tokenIn?: Token;
  tokenOut?: Token;
  txReceipt?: TransactionReceipt;
} & DialogProps;

export const WithdrawalRequestModal = ({
  amountOut,
  tokenIn,
  tokenOut,
  txReceipt,
  onClose,
  ...rest
}: WithdrawalRequestModalProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { update } = useViewSelect();

  const handleClaimClick = () => {
    update('claim');
    onClose?.({}, 'backdropClick');
  };

  const amt = [amountOut ?? 0n, tokenOut?.decimals ?? 18] as Dnum;

  return (
    <Dialog {...rest} maxWidth="xs" fullWidth fullScreen={fullScreen}>
      <DialogTitle display="flex" justifyContent="flex-end" alignItems="center">
        <IconButton
          onClick={(evt) => {
            onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack alignItems="center" pt={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              border: '1px solid',
              borderColor: 'success.main',
              p: 4,
              backgroundColor: 'success.faded',
              mb: 3,
            }}
          >
            <FaCheckRegular sx={{ fontSize: 36, color: 'success.main' }} />
          </Box>
          <Typography
            variant="featured2"
            fontWeight="bold"
            textAlign="center"
            mb={2}
          >
            {intl.formatMessage({
              defaultMessage: 'Withdrawal request successfully sent',
            })}
          </Typography>
          <Typography variant="mono" textAlign="center" mb={3}>
            {intl.formatMessage(
              {
                defaultMessage:
                  'Your request to withdraw {amountOut} {symbolOut} from {symbolIn} has been sent. Check the Claim tab to view your withdrawal requests.',
              },
              {
                amountOut: format(amt, getFormatPrecision(amt)),
                symbolIn: tokenIn?.symbol ?? '',
                symbolOut: tokenOut?.symbol ?? '',
              },
            )}
          </Typography>
          <Button
            fullWidth
            onClick={handleClaimClick}
            size="large"
            sx={{ mb: 3 }}
          >
            {intl.formatMessage({
              defaultMessage: 'View your withdrawal requests',
            })}
          </Button>
          {txReceipt && <BlockExplorerLink hash={txReceipt?.transactionHash} />}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
