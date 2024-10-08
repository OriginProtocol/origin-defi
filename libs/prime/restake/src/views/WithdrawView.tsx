import { useState } from 'react';

import { alpha, Divider, Stack, Typography } from '@mui/material';
import {
  InfoTooltipLabel,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { PrimePoints, WarningExclamation } from '@origin/shared/icons';
import {
  TxButton,
  useTxButton,
  useWatchBalance,
} from '@origin/shared/providers';
import { add, format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { TokenInput } from '../components/TokenInput';
import { WithdrawProgressModal } from '../components/WithdrawProgressModal';
import { usePrimeETH_OETH } from '../hooks';

import type { ValueLabelProps } from '@origin/shared/components';

export const WithdrawView = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState(0n);
  const [open, setOpen] = useState(false);
  const { data: converted, isLoading: isConvertedLoading } =
    usePrimeETH_OETH(amount);
  const { data: bal, isLoading: isBalLoading } = useWatchBalance({
    token: tokens.mainnet.primeETH,
  });
  const { data: rate, isLoading: isRateLoading } = usePrimeETH_OETH(
    parseUnits('1', tokens.mainnet.primeETH.decimals),
  );
  const { params, callbacks, gasPrice } = useTxButton({
    params: {
      contract: contracts.mainnet.lrtDepositPool,
      functionName: 'requestWithdrawal',
      args: [
        tokens.mainnet.OETH.address,
        converted?.[0] ?? 0n,
        add([amount, tokens.mainnet.primeETH.decimals], 1e-18)[0],
      ],
    },
    callbacks: {
      onTxSigned: () => {
        setOpen(true);
      },
    },
    disableActivity: true,
    disableNotification: true,
    enableGas: true,
  });

  const handleAmountChange = (val: bigint) => {
    setAmount(val);
  };

  const buttonDisabled =
    isConvertedLoading || amount === 0n || amount > (bal ?? 0n);
  const buttonLabel =
    amount > (bal ?? 0n)
      ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
      : intl.formatMessage({ defaultMessage: 'Withdraw' });

  return (
    <>
      <Stack>
        <Stack
          sx={{
            p: 3,
          }}
        >
          <Typography
            sx={{
              mb: 0.75,
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Enter amount' })}
          </Typography>
          <TokenInput
            amount={amount}
            decimals={tokens.mainnet.primeETH.decimals}
            onAmountChange={handleAmountChange}
            balance={bal}
            isBalanceLoading={isBalLoading}
            disableMaxButton={isBalLoading}
            token={tokens.mainnet.primeETH}
            isNativeCurrency={false}
            isConnected={isConnected}
            isAmountDisabled={isBalLoading}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              p: 2,
              mt: 2,
              border: '1px solid',
              borderColor: 'primary.main',
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.2),
              borderRadius: 2,
            }}
          >
            <WarningExclamation sx={{ fontSize: 36, color: 'primary.main' }} />
            <Typography>
              {intl.formatMessage({
                defaultMessage:
                  'Please initiate two separate withdrawal requests if you plan to migrate some of your funds to ynLSDe and claim the rest.',
              })}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          spacing={1}
          sx={{
            p: 3,
          }}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Wait time:' })}
            value={intl.formatMessage({ defaultMessage: '7 days' })}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Rate:' })}
            value={intl.formatMessage(
              { defaultMessage: '1:{rate}' },
              { rate: format(rate ?? from(0), 3) },
            )}
            isLoading={isRateLoading}
            {...valueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Gas:' })}
            value={`$${format(gasPrice?.gasCostUsd ?? from(0), 2)}`}
            {...valueLabelProps}
          />
        </Stack>
        <Divider />
        <Stack
          sx={{
            p: 3,
          }}
        >
          <Typography
            sx={{
              mb: 2,
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Receive' })}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'center',
              pb: 0.5,
            }}
          >
            <LoadingLabel isLoading={isConvertedLoading}>
              {amount === 0n || !converted ? '0.00' : format(converted, 4)}
            </LoadingLabel>
            <TokenIcon token={tokens.mainnet.OETH} sx={{ fontSize: 20 }} />
            <Typography>{tokens.mainnet.OETH.symbol}</Typography>
          </Stack>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'Funds withdrawn from EigenLayer go through a 7-day escrow period before being able to be claimed.',
            })}
          >
            {intl.formatMessage({
              defaultMessage: '7-day retention period',
            })}
          </InfoTooltipLabel>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 3,
            alignItems: 'center',
          }}
        >
          <PrimePoints sx={{ fontSize: 36 }} />
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({
              defaultMessage:
                'Accrued XP will be redeemable for retroactive YND airdrop at the TGE',
            })}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          sx={{
            p: 3,
            backgroundColor: '#fff',
          }}
        >
          <TxButton
            params={params}
            callbacks={callbacks}
            disabled={buttonDisabled}
            sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
            label={buttonLabel}
            validatingTxLabel={intl.formatMessage({
              defaultMessage: 'Withdraw',
            })}
          />
        </Stack>
      </Stack>
      <WithdrawProgressModal
        key={open ? '' : 'reset'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  spacing: 1,
  sx: { justifyContent: 'space-between' },
};
