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
  LinearProgress,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { SwapProvider, TokenButton, trackEvent } from '@origin/defi/shared';
import {
  BigIntInput,
  InfoTooltipLabel,
  LoadingLabel,
} from '@origin/shared/components';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaCircleExclamationRegular, WalletFilled } from '@origin/shared/icons';
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
import { div, format, from, gt, lt, mul, sub, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { depositARMActions } from '../actions';
import { armSwapRoutes } from '../constants';
import { useArmVault } from '../hooks';

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
  const { data: info, isLoading: isInfoLoading } = useArmVault();

  const handleMaxClick = () => {
    handleAmountInChange(balances?.[tokenIn.id] ?? 0n);
  };

  const amount = [amountIn, tokenIn.decimals] as Dnum;
  const userBalance = [balances?.[tokenIn.id] ?? 0n, tokenIn.decimals] as Dnum;
  const userCapLeft = sub(info?.userCap ?? from(0), amount);
  const waveCapLeft = sub(info?.waveCap ?? from(0), amount);
  const pctWaveRemaining = toNumber(
    div(info?.totalAssets ?? from(0, 18), info?.waveCap ?? from(1, 18)),
    { digits: 2 },
  );
  const waveRemaining = toNumber(
    sub(info?.waveCap ?? from(0), info?.totalAssets ?? from(0)),
  );
  const showUserCapDisclaimer =
    isConnected &&
    !isInfoLoading &&
    lt(amount, userBalance) &&
    lt(userCapLeft, 0);
  const showWaveCapDisclaimer =
    isConnected &&
    !isInfoLoading &&
    lt(amount, userBalance) &&
    lt(waveCapLeft, 0);
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
    isInfoLoading ||
    isSwapWaitingForSignature ||
    isSwapLoading ||
    isBalancesLoading ||
    gt(amount, userBalance) ||
    gt(amount, [allowance ?? 0n, tokenIn.decimals] as Dnum) ||
    gt(amount, info?.userCap ?? from(0)) ||
    gt(amount, info?.waveCap ?? from(0)) ||
    amount[0] === 0n;
  const depositButtonLabel = gt(amount, userBalance)
    ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
    : lt(userCapLeft, 0)
      ? intl.formatMessage({ defaultMessage: 'User cap reached' })
      : lt(waveCapLeft, 0)
        ? intl.formatMessage({ defaultMessage: 'Wave cap reached' })
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
        <InfoTooltipLabel
          tooltipLabel={intl.formatMessage({
            defaultMessage:
              'The total amount of ETH deposits for the current wave',
          })}
          sx={{
            fontWeight: 'medium',
            height: 36,
          }}
        >
          {intl.formatMessage(
            { defaultMessage: 'Wave {waveNumber} TVL cap progress' },
            {
              waveNumber: info?.waveNumber,
            },
          )}
        </InfoTooltipLabel>
        <Stack
          spacing={1.5}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            p: 3,
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <LoadingLabel
              isLoading={isInfoLoading}
              variant="featured3"
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              {intl.formatNumber(pctWaveRemaining, { style: 'percent' })}
            </LoadingLabel>
            <Typography color="text.secondary">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Wave {waveNumber} cap remaining: {remaining} ETH',
                },
                {
                  waveNumber: 1,
                  remaining: intl.formatNumber(waveRemaining),
                },
              )}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={pctWaveRemaining * 100}
            sx={{
              borderRadius: 3,
              height: 4,
            }}
          />
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'text.secondary',
            }}
          >
            {[0, 25, 50, 75, 100].map((value) => (
              <Typography key={value} variant="caption1">
                {value}%
              </Typography>
            ))}
          </Stack>
        </Stack>
        <InfoTooltipLabel
          tooltipLabel={intl.formatMessage({
            defaultMessage:
              'The amount of ETH you can deposit for the current wave',
          })}
          sx={{
            fontWeight: 'medium',
            height: 36,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Your whitelist cap' })}
        </InfoTooltipLabel>
        <BigIntInput
          readOnly
          value={info?.userCap[0] ?? 0n}
          decimals={
            info?.userCap[1] ?? tokens.mainnet['ARM-WETH-stETH'].decimals
          }
          endAdornment={<TokenButton token={tokens.mainnet.WETH} disabled />}
          sx={(theme) => ({
            px: 2,
            py: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: 'background.highlight',
            border: '1px solid',
            borderColor: 'divider',
            color: 'primary.main',
            fontWeight: 'bold',
            ...theme.typography.featured3,
          })}
        />
        <Collapse in={showUserCapDisclaimer}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              backgroundColor: 'primary.faded',
              borderRadius: 3,
              p: 3,
              mb: 3,
            }}
          >
            <FaCircleExclamationRegular
              sx={{ fontSize: 20, color: 'primary.main' }}
            />
            <Stack>
              <Typography
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'You have reached your whitelist cap',
                })}
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatMessage({
                  defaultMessage:
                    'Deposits will be disabled until further notice. Please check back later.',
                })}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
        <Collapse in={showWaveCapDisclaimer}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              backgroundColor: 'primary.faded',
              borderRadius: 3,
              p: 3,
              mb: 3,
            }}
          >
            <FaCircleExclamationRegular
              sx={{ fontSize: 20, color: 'primary.main' }}
            />
            <Stack>
              <Typography
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Wave cap has been reached',
                })}
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatMessage({
                  defaultMessage:
                    'Deposits will be disabled until further notice. Please check back later.',
                })}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
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
