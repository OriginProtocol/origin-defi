import { useState } from 'react';

import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Collapse,
  Dialog,
  DialogTitle,
  Divider,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { SwapProvider, TokenButton, trackEvent } from '@origin/defi/shared';
import { BigIntInput, InfoTooltipLabel } from '@origin/shared/components';
import { TokenIcon } from '@origin/shared/components';
import { WalletFilled } from '@origin/shared/icons';
import { FaCheckRegular } from '@origin/shared/icons';
import {
  ConnectedButton,
  useHandleAmountInChange,
  useHandleApprove,
  useHandleSwap,
  useHandleTokenChange,
  useSwapRouteAllowance,
  useSwapState,
  useTokenOptions,
  useTokenPrice,
  useWatchBalance,
  useWatchBalances,
} from '@origin/shared/providers';
import { getTokenPriceKey } from '@origin/shared/providers';
import { getFormatPrecision, isNilOrEmpty } from '@origin/shared/utils';
import { format, gt, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { depositARMActions } from '../actions';
import { armSwapRoutes } from '../constants';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { CardContentProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

export const DepositForm = (props: CardContentProps) => {
  return (
    <SwapProvider
      swapActions={depositARMActions}
      swapRoutes={armSwapRoutes}
      trackEvent={trackEvent}
    >
      <DepositFormWrapped {...props} />
    </SwapProvider>
  );
};

const DepositFormWrapped = (props: CardContentProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const { isConnected, chainId } = useAccount();
  const [
    {
      amountIn,
      tokenIn,
      tokenOut,
      selectedSwapRoute,
      isSwapLoading,
      isSwapWaitingForSignature,
      isSwapRoutesLoading,
      isApprovalLoading,
      isApprovalWaitingForSignature,
    },
  ] = useSwapState();
  const { data: allowance } = useSwapRouteAllowance(selectedSwapRoute);
  const { tokensIn } = useTokenOptions();
  const handleAmountInChange = useHandleAmountInChange();
  const handleTokenChange = useHandleTokenChange();
  const handleApprove = useHandleApprove();
  const handleSwap = useHandleSwap();
  const { data: balances, isLoading: isBalancesLoading } = useWatchBalances({
    tokens: [tokenIn, tokenOut],
  });

  const handleMaxClick = () => {
    handleAmountInChange(balances?.[tokenIn.id] ?? 0n);
  };

  const amount = [amountIn, tokenIn.decimals] as Dnum;
  const userBalance = [balances?.[tokenIn.id] ?? 0n, tokenIn.decimals] as Dnum;
  const isApproveButtonDisabled =
    isNilOrEmpty(selectedSwapRoute) ||
    isSwapRoutesLoading ||
    isApprovalLoading ||
    isApprovalWaitingForSignature ||
    amountIn > (balances?.[tokenIn.id] ?? 0n);
  const showApprove =
    isConnected &&
    tokenIn.chainId === chainId &&
    amountIn > 0n &&
    !isBalancesLoading &&
    (balances?.[tokenIn.id] ?? 0n) >= amountIn &&
    !isNilOrEmpty(selectedSwapRoute) &&
    (selectedSwapRoute?.allowanceAmount ?? 0n) < amountIn &&
    (allowance ?? 0n) < amountIn;
  const isDepositDisabled =
    isSwapWaitingForSignature ||
    isSwapLoading ||
    isBalancesLoading ||
    gt(amount, userBalance) ||
    gt(amount, [allowance ?? 0n, tokenIn.decimals] as Dnum) ||
    amount[0] === 0n;
  const depositButtonLabel = gt(amount, userBalance)
    ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
    : intl.formatMessage({ defaultMessage: 'Deposit' });

  return (
    <CardContent {...props}>
      <Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 36,
          }}
        >
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'The amount to deposit',
            })}
            fontWeight="medium"
          >
            {intl.formatMessage({ defaultMessage: 'Amount to deposit' })}
          </InfoTooltipLabel>
          <Button variant="link" onClick={handleMaxClick}>
            <WalletFilled sx={{ fontSize: 20, mr: 1 }} />
            <Typography
              noWrap
              sx={{
                fontWeight: 'medium',
              }}
            >
              {format(userBalance, {
                digits: getFormatPrecision(userBalance),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </Typography>
          </Button>
        </Stack>
        <BigIntInput
          value={amount[0]}
          decimals={amount[1]}
          onChange={handleAmountInChange}
          endAdornment={
            <TokenButton token={tokenIn} onClick={() => setOpen(true)} />
          }
          sx={(theme) => ({
            px: 2,
            py: 1,
            mb: 3,
            borderRadius: 3,
            backgroundColor: 'background.highlight',
            border: '1px solid',
            borderColor: 'divider',
            ...theme.typography.h6,
          })}
        />
        <Collapse in={showApprove}>
          <Button
            variant="action"
            fullWidth
            onClick={handleApprove}
            disabled={isApproveButtonDisabled}
            sx={{ mb: 1.5 }}
          >
            {isSwapRoutesLoading ? (
              <CircularProgress size={32} color="inherit" />
            ) : isApprovalWaitingForSignature ? (
              intl.formatMessage({
                defaultMessage: 'Waiting for signature',
              })
            ) : isApprovalLoading ? (
              intl.formatMessage({ defaultMessage: 'Processing Approval' })
            ) : (
              intl.formatMessage({ defaultMessage: 'Approve' })
            )}
          </Button>
        </Collapse>
        <ConnectedButton
          variant="action"
          fullWidth
          disabled={isDepositDisabled}
          onClick={handleSwap}
          targetChainId={tokenIn.chainId}
        >
          {isSwapRoutesLoading ? (
            <CircularProgress size={32} color="inherit" />
          ) : isSwapWaitingForSignature ? (
            intl.formatMessage({ defaultMessage: 'Waiting for signature' })
          ) : isSwapLoading ? (
            intl.formatMessage({ defaultMessage: 'Processing Transaction' })
          ) : (
            depositButtonLabel
          )}
        </ConnectedButton>
      </Stack>
      <TokenSelectModal
        open={open}
        onClose={() => setOpen(false)}
        selectedToken={tokenIn}
        tokens={tokensIn}
        onSelectToken={(token) => {
          handleTokenChange('tokenIn', token);
          setOpen(false);
        }}
      />
    </CardContent>
  );
};

type TokenSelectModalProps = {
  selectedToken: Token;
  tokens: Token[];
  onSelectToken: (value: Token) => void;
} & DialogProps;

const TokenSelectModal = ({
  selectedToken,
  tokens,
  onSelectToken,
  onClose,
  ...rest
}: TokenSelectModalProps) => {
  const intl = useIntl();
  return (
    <Dialog maxWidth="sm" fullWidth {...rest} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Select a token' })}
      </DialogTitle>
      <Divider />
      <MenuList disablePadding>
        {tokens.map((token, i) => (
          <TokenListItem
            key={`token-${token.address || 'eth'}-${i}`}
            token={token}
            isSelected={token.address === selectedToken.address}
            onClick={() => {
              onClose?.({}, 'backdropClick');
              onSelectToken(token);
            }}
          />
        ))}
      </MenuList>
    </Dialog>
  );
};

type TokenListItemProps = {
  token: Token;
  isSelected: boolean;
} & MenuItemProps;

function TokenListItem({
  token,
  isSelected,
  onClick,
  ...rest
}: TokenListItemProps) {
  const { isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token,
  });
  const { data: price } = useTokenPrice(getTokenPriceKey(token));

  const bal = [balance ?? 0n, token.decimals] as Dnum;
  const balUsd = mul(bal, price ?? 0);

  return (
    <MenuItem
      {...rest}
      onClick={isSelected ? undefined : onClick}
      selected={isSelected}
      sx={[
        {
          display: 'flex',
          px: 3,
          py: 1.5,
          justifyContent: 'space-between',
          gap: 1.5,
          alignItems: 'center',
        },
        isSelected
          ? {
              cursor: 'default',
            }
          : {
              cursor: 'pointer',
            },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <TokenIcon token={token} sx={{ fontSize: 36 }} />
        <Stack spacing={0.5}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {token?.symbol}
          </Typography>
          <Typography
            variant="caption1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {token.name}
          </Typography>
        </Stack>
      </Stack>
      {isConnected && (
        <Stack direction="row" spacing={2}>
          {isSelected && (
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FaCheckRegular sx={{ color: 'text.primary', fontSize: 16 }} />
            </Stack>
          )}
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
              }}
            >
              {isBalanceLoading ? (
                <Skeleton width={30} />
              ) : (
                format(bal, {
                  digits: getFormatPrecision(bal),
                  decimalsRounding: 'ROUND_DOWN',
                })
              )}
            </Typography>
            <Typography
              variant="caption1"
              sx={{
                color: 'text.secondary',
              }}
            >
              ${format(balUsd, 2)}
            </Typography>
          </Box>
        </Stack>
      )}
    </MenuItem>
  );
}
