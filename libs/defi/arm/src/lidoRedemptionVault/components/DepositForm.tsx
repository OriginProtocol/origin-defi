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
import { TokenButton } from '@origin/defi/shared';
import { BigIntInput, InfoTooltipLabel } from '@origin/shared/components';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaCircleExclamationRegular, WalletFilled } from '@origin/shared/icons';
import { FaCheckRegular } from '@origin/shared/icons';
import { useTokenPrice, useWatchBalance } from '@origin/shared/providers';
import { getTokenPriceKey } from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from, mul, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useArmVault } from '../hooks';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { CardContentProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

const USER_WHITELIST_CAP = 50;

export const DepositForm = (props: CardContentProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0n);
  const [assetToDeposit, setAssetToDeposit] = useState<Token>(
    tokens.mainnet.ETH,
  );
  const { data } = useArmVault();

  const handleAmountChange = (val: bigint) => {
    setAmount(val);
  };

  const handleMaxClick = () => {
    setAmount(data?.balance[0] ?? 0n);
  };

  const userCap = BigInt(
    Math.max(0, USER_WHITELIST_CAP - toNumber([amount, 18])),
  );
  const showUserCapDisclaimer = USER_WHITELIST_CAP - toNumber([amount, 18]) < 0;
  const isDepositDisabled = showUserCapDisclaimer || amount === 0n;

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
              {format(data?.balance ?? from(0), {
                digits: getFormatPrecision(data?.balance ?? from(0)),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </Typography>
          </Button>
        </Stack>
        <BigIntInput
          value={amount}
          decimals={18}
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
              waveNumber: 1,
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
          value={userCap}
          decimals={0}
          endAdornment={<TokenButton token={tokens.mainnet.ETH} disabled />}
          sx={(theme) => ({
            px: 2,
            py: 1,
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
        <Button variant="action" fullWidth disabled={isDepositDisabled}>
          {intl.formatMessage({ defaultMessage: 'Deposit' })}
        </Button>
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
