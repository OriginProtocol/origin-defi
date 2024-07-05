import { useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import {
  ExternalLink,
  InfoTooltipLabel,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { WarningExclamation } from '@origin/shared/icons';
import {
  ConnectedButton,
  TxButton,
  useFormat,
  useTxButton,
  useWatchBalance,
} from '@origin/shared/providers';
import { add, format } from 'dnum';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { TokenInput } from '../components/TokenInput';
import { WithdrawProgressModal } from '../components/WithdrawProgressModal';
import { usePrimeETH_OETH } from '../hooks';

import type { StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type {
  GasPrice,
  WriteTransactionCallbacks,
  WriteTransactionParameters,
} from '@origin/shared/providers';
import type { Dnum } from 'dnum';

type Step = 'disclaimer' | 'form' | 'stepper';

export const WithdrawView = () => {
  const [step, setStep] = useState<Step>('disclaimer');
  const [amount, setAmount] = useState(0n);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: converted, isLoading: isConvertedLoading } =
    usePrimeETH_OETH(amount);
  const { params, callbacks, gasPrice } = useTxButton({
    params: {
      contract: contracts.mainnet.lrtDepositPool,
      functionName: 'requestWithdrawal',
      args: [
        tokens.mainnet.OETH.address,
        converted?.[0] ?? 0n,
        add([amount, tokens.mainnet.primeETH.decimals], 1e-17)[0],
      ],
    },
    callbacks: {
      onTxSigned: () => {
        setModalOpen(true);
      },
    },
    disableActivity: true,
    disableNotification: true,
    enableGas: true,
  });

  if (step === 'disclaimer') {
    return (
      <Stack p={3}>
        <Disclaimer
          onContinueClick={() => {
            setStep('form');
          }}
        />
      </Stack>
    );
  }

  return (
    <>
      <Form
        onContinueClick={() => {
          setStep('stepper');
        }}
        amount={amount}
        converted={converted}
        isConvertedLoading={isConvertedLoading}
        setAmount={(val: bigint) => {
          setAmount(val);
        }}
        gasPrice={gasPrice}
        sx={{ display: step === 'form' ? 'block' : 'none' }}
      />
      <Stepper
        amount={amount}
        converted={converted}
        isConvertedLoading={isConvertedLoading}
        params={params}
        callbacks={callbacks}
        sx={{ display: step === 'stepper' ? 'block' : 'none' }}
      />
      <WithdrawProgressModal
        key={modalOpen ? '' : 'reset'}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};

type DisclaimerProps = { onContinueClick: () => void } & StackProps;

const Disclaimer = ({ onContinueClick, ...rest }: DisclaimerProps) => {
  const intl = useIntl();

  const points = [
    intl.formatMessage({
      defaultMessage: `YieldNest <b>Season 1 Airdrop</b> + access to all upcoming seasons`,
    }),
    intl.formatMessage({
      defaultMessage: `<b>+5% boost</b> for primeETH users for Season 1`,
    }),
    intl.formatMessage({
      defaultMessage: `<b>15% boost</b> for ALL seasons for migrating ≥ 5 primeETH`,
    }),
    intl.formatMessage({
      defaultMessage: `<b>60+% YND</b> community incentives `,
    }),
    intl.formatMessage({ defaultMessage: `Collect <b>EigenLayer points</b>` }),

    intl.formatMessage({
      defaultMessage: `AVS/Network <b>yields & airdrops</b>`,
    }),
  ];

  return (
    <Stack
      {...rest}
      sx={{
        p: 3,
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'primary.main',
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        borderRadius: 2,
        ...rest?.sx,
      }}
    >
      <WarningExclamation sx={{ fontSize: 74, color: 'primary.main' }} />
      <Typography variant="h5" textAlign="center" mb={1}>
        {intl.formatMessage({
          defaultMessage:
            'You will no longer be eligible for the following rewards if you withdraw:',
        })}
      </Typography>
      <Stack component="ul" spacing={0.5} sx={{ paddingInlineStart: 1 }}>
        {points.map((p) => (
          <Typography key={p} component="li">
            {p}
          </Typography>
        ))}
      </Stack>
      <ExternalLink
        href="https://www.originprotocol.com/primestaked-yieldnest-airdrop"
        sx={{ alignSelf: 'flex-start', color: 'primary.main', mb: 3 }}
      >
        {intl.formatMessage({ defaultMessage: 'Learn More' })}
      </ExternalLink>
      <Button
        component={RouterLink}
        to="/dashboard"
        fullWidth
        sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
      >
        {intl.formatMessage({ defaultMessage: 'Back to dashboard' })}
      </Button>
      <Button
        variant="text"
        onClick={onContinueClick}
        sx={{
          fontSize: 20,
          py: 2,
          borderRadius: 8,
          height: 60,
          color: 'primary.main',
          '&:hover': { color: 'primary.dark' },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Continue anyway' })}
      </Button>
    </Stack>
  );
};

type FormProps = {
  onContinueClick: () => void;
  amount: bigint;
  setAmount: (val: bigint) => void;
  converted: Dnum | undefined;
  isConvertedLoading: boolean;
  gasPrice: GasPrice | null | undefined;
} & StackProps;

const Form = ({
  onContinueClick,
  amount,
  setAmount,
  converted,
  isConvertedLoading,
  gasPrice,
  ...rest
}: FormProps) => {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const { isConnected } = useAccount();
  const { data: bal, isLoading: isBalLoading } = useWatchBalance({
    token: tokens.mainnet.primeETH,
  });
  const { data: rate, isLoading: isRateLoading } = usePrimeETH_OETH(
    parseUnits('1', tokens.mainnet.primeETH.decimals),
  );

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
    <Stack {...rest}>
      <Stack p={3}>
        <Typography mb={0.75} color="text.secondary">
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
      </Stack>
      <Divider />
      <Stack p={3} spacing={1}>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Wait time:' })}
          value={intl.formatMessage({ defaultMessage: '7 days' })}
          {...valueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Rate:' })}
          value={intl.formatMessage(
            { defaultMessage: '1:{rate}' },
            { rate: format(rate ?? [0n, 18], 4) },
          )}
          isLoading={isRateLoading}
          {...valueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Gas:' })}
          value={formatCurrency(gasPrice?.gasCostUsd)}
          {...valueLabelProps}
        />
      </Stack>
      <Divider />
      <Stack p={3}>
        <Typography mb={2} color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Receive' })}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.5} pb={0.5}>
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
      <Stack p={3}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 3,
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'primary.main',
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            borderRadius: 2,
          }}
        >
          <WarningExclamation sx={{ fontSize: 74, color: 'primary.main' }} />
          <Typography
            component="span"
            sx={{
              display: 'inline-block',
              fontSize: 16,
              fontWeight: 'medium',
              lineHeight: 1.5,
            }}
          >
            {intl.formatMessage(
              {
                defaultMessage:
                  'You will no longer be eligible for the YND Season 1 Airdrop or Seeds (points) boost if you withdraw. {link}',
              },
              {
                link: (
                  <ExternalLink
                    href="https://www.originprotocol.com/primestaked-yieldnest-airdrop"
                    sx={{ display: 'inline-flex', color: 'primary.main' }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Learn more' })}
                  </ExternalLink>
                ),
              },
            )}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack p={3} sx={{ backgroundColor: '#fff' }}>
        <ConnectedButton
          onClick={onContinueClick}
          disabled={buttonDisabled}
          sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
        >
          {buttonLabel}
        </ConnectedButton>
      </Stack>
    </Stack>
  );
};

type StepperProps = {
  amount: bigint;
  converted: Dnum | undefined;
  isConvertedLoading: boolean;
  params: WriteTransactionParameters;
  callbacks: WriteTransactionCallbacks;
} & StackProps;

const Stepper = ({
  amount,
  converted,
  isConvertedLoading,
  params,
  callbacks,
  ...rest
}: StepperProps) => {
  const intl = useIntl();
  const [checked, setChecked] = useState(false);
  const [progress] = useState(0);

  const steps = [
    intl.formatMessage({ defaultMessage: 'Preview Withdrawal' }),
    intl.formatMessage({ defaultMessage: 'Approve Withdrawal' }),
    intl.formatMessage({ defaultMessage: 'Wait 7 days' }),
    intl.formatMessage({ defaultMessage: 'Return to Claim' }),
  ];

  const buttonDisabled = isConvertedLoading || !checked;

  return (
    <Stack {...rest}>
      <Typography variant="h5" px={3} py={1}>
        {intl.formatMessage({ defaultMessage: 'Withdrawal Details' })}
      </Typography>
      <Divider />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'You will receive' })}
        value={
          <Stack direction="row" alignItems="center" spacing={1}>
            <TokenIcon token={tokens.mainnet.OETH} sx={{ fontSize: 24 }} />
            <LoadingLabel isLoading={isConvertedLoading}>
              {format(converted ?? [0n, 18], 4)}
            </LoadingLabel>
          </Stack>
        }
        px={3}
        py={1}
        {...valueLabelProps}
        labelProps={{ variant: 'body1', color: 'text.primary' }}
      />
      <Divider />
      <Stack px={3} py={1}>
        <Typography mb={1}>
          {intl.formatMessage({ defaultMessage: 'Withdrawal Process' })}
        </Typography>
        <Stack position="relative" spacing={2}>
          {steps.map((step, index) => (
            <ProcessStep
              key={`${step}${index}`}
              index={index}
              progress={progress}
              label={step}
            />
          ))}
          <Box
            sx={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 8,
              bottom: 8,
              width: '1px',
              backgroundColor: 'primary.main',
            }}
          />
        </Stack>
      </Stack>
      <Divider />
      <Stack px={3} pt={1} pb={3} spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => {
                setChecked(not);
              }}
            />
          }
          label={intl.formatMessage({
            defaultMessage:
              'I understand it will take 7 days to receive my funds',
          })}
          componentsProps={{
            typography: { fontSize: 16, fontWeight: 'medium' },
          }}
        />
        <TxButton
          params={params}
          callbacks={callbacks}
          disabled={buttonDisabled}
          sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
          label={intl.formatMessage({ defaultMessage: 'Withdraw' })}
          validatingTxLabel={intl.formatMessage({
            defaultMessage: 'Withdraw',
          })}
        />
        <Button
          component={RouterLink}
          to="/restake/"
          variant="text"
          sx={{
            fontSize: 16,
            color: 'text.primary',
            textDecoration: 'underline',
            '&:hover': { color: 'primary.dark', textDecoration: 'underline' },
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Wait, I want to earn rewards instead',
          })}
        </Button>
      </Stack>
    </Stack>
  );
};

type ProcessStepProps = {
  label: string;
  progress: number;
  index: number;
} & StackProps;

const ProcessStep = ({ label, index, progress, ...rest }: ProcessStepProps) => {
  return (
    <Stack {...rest} direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: '50%',
          width: 16,
          height: 16,
          backgroundColor:
            index <= progress ? 'primary.main' : 'background.default',
          zIndex: 2,
        }}
      />

      <Typography>{label}</Typography>
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  justifyContent: 'space-between',
  spacing: 1,
};
