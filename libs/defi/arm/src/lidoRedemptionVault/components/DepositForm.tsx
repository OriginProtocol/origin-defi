import { useState } from 'react';

import {
  Box,
  Button,
  CardContent,
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
import {
  TokenButton,
  useApprovalButton,
  useTxButton,
} from '@origin/defi/shared';
import { BigIntInput, InfoTooltipLabel } from '@origin/shared/components';
import { TokenIcon } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { FaCircleExclamationRegular, WalletFilled } from '@origin/shared/icons';
import { FaCheckRegular } from '@origin/shared/icons';
import {
  TxButton,
  useTokenPrice,
  useWatchBalance,
  useWatchBalances,
} from '@origin/shared/providers';
import { getTokenPriceKey } from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { format, from, gt, lt, mul, sub } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useArmVault } from '../hooks';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { CardContentProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

const supportedAssetToDeposit = [tokens.mainnet.WETH, tokens.mainnet.ETH];

export const DepositForm = (props: CardContentProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const [assetToDeposit, setAssetToDeposit] = useState<Token>(
    supportedAssetToDeposit[0],
  );
  const [amount, setAmount] = useState(
    from(0, tokens.mainnet['ARM-WETH-stETH'].decimals),
  );
  const {
    data: assetToDepositBalance,
    isLoading: isAssetToDepositBalanceLoading,
  } = useWatchBalances({ tokens: supportedAssetToDeposit });
  const { data: info, isLoading: isInfoLoading } = useArmVault();
  const {
    allowance,
    params: approvalParams,
    callbacks: approvalCallbacks,
    label: approvalLabel,
  } = useApprovalButton({
    token: assetToDeposit,
    spender: contracts.mainnet.ARMstETHWETHPool.address,
    amount: amount[0],
    enableAllowance: true,
  });
  const { params, callbacks } = useTxButton({
    params: {
      contract: contracts.mainnet.ARMstETHWETHPool,
      functionName: 'deposit',
      args: [amount[0]],
    },
    activity: {
      type: 'deposit',
      status: 'pending',
      amountIn: amount[0],
      tokenIdIn: assetToDeposit.id,
      pool: contracts.mainnet.ARMstETHWETHPool.address,
    },
    callbacks: {
      onWriteSuccess: () => {
        setAmount(from(0, tokens.mainnet['ARM-WETH-stETH'].decimals));
        queryClient.invalidateQueries({
          queryKey: useArmVault.getKey(address),
        });
      },
    },
  });

  const handleAmountChange = (val: bigint) => {
    setAmount([val, assetToDeposit.decimals] as Dnum);
  };

  const handleMaxClick = () => {
    setAmount([
      assetToDepositBalance?.[assetToDeposit.id],
      assetToDeposit.decimals,
    ] as Dnum);
  };

  const userBalance = [
    assetToDepositBalance?.[assetToDeposit.id] ?? 0n,
    assetToDeposit.decimals,
  ] as Dnum;
  const userCapLeft = sub(info?.userCap ?? from(0), amount);
  const waveCapLeft = sub(info?.waveCap ?? from(0), amount);
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
  const showApprove =
    isConnected &&
    !isInfoLoading &&
    lt(amount, userBalance) &&
    lt(amount, userCapLeft) &&
    lt([allowance ?? 0n, assetToDeposit.decimals] as Dnum, amount);
  const isDepositDisabled =
    isInfoLoading ||
    isAssetToDepositBalanceLoading ||
    gt(amount, assetToDepositBalance?.[assetToDeposit.id] ?? 0n) ||
    gt(amount, userBalance) ||
    showUserCapDisclaimer ||
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
          onChange={handleAmountChange}
          endAdornment={
            <TokenButton token={assetToDeposit} onClick={() => setOpen(true)} />
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
            <Typography
              variant="featured3"
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              {intl.formatNumber(0.75, { style: 'percent' })}
            </Typography>
            <Typography color="text.secondary">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Wave {waveNumber} cap remaining: {remaining} ETH',
                },
                {
                  waveNumber: 1,
                  remaining: intl.formatNumber(1432.5),
                },
              )}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={75}
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
          <TxButton
            params={approvalParams}
            callbacks={approvalCallbacks}
            variant="action"
            fullWidth
            disabled={isInfoLoading}
            label={approvalLabel}
            sx={{ mb: 1.5 }}
          />
        </Collapse>
        <TxButton
          params={params}
          callbacks={callbacks}
          label={depositButtonLabel}
          disabled={isDepositDisabled}
          variant="action"
          fullWidth
        />
      </Stack>
      <TokenSelectModal
        open={open}
        onClose={() => setOpen(false)}
        selectedToken={assetToDeposit}
        tokens={[tokens.mainnet.ETH, tokens.mainnet.WETH]}
        onSelectToken={(token) => {
          setAssetToDeposit(token);
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
