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
import { ExternalLink, TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { WarningExclamation } from '@origin/shared/icons';
import { ConnectedButton, useWatchBalance } from '@origin/shared/providers';
import { format, mul } from 'dnum';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { TokenInput } from '../components/TokenInput';

import type { StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Dnum } from 'dnum';

type Step = 'disclaimer' | 'form' | 'stepper';

export const WithdrawView = () => {
  const [step, setStep] = useState<Step>('disclaimer');
  const [amount, setAmount] = useState(0n);

  const converted = mul([amount, tokens.mainnet.primeETH.decimals], 1.1);

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

  if (step === 'form') {
    return (
      <Form
        onContinueClick={() => {
          setStep('stepper');
        }}
        amount={amount}
        converted={converted}
        setAmount={(val: bigint) => {
          setAmount(val);
        }}
      />
    );
  }

  return <Stepper converted={converted} />;
};

type DisclaimerProps = { onContinueClick: () => void } & StackProps;

const Disclaimer = ({ onContinueClick, ...rest }: DisclaimerProps) => {
  const intl = useIntl();

  const points = [
    intl.formatMessage({ defaultMessage: `YieldNest YND season 1 airdrop` }),
    intl.formatMessage({
      defaultMessage: `YieldNest Seeds bonus (+5% boost for primeETH users)`,
    }),
    intl.formatMessage({
      defaultMessage: `Pioneer NFT + 15% permanent boost for migrating ≥ 5 OETH`,
    }),
    intl.formatMessage({
      defaultMessage: `Access to all upcoming YND airdrop seasons`,
    }),
    intl.formatMessage({ defaultMessage: `Community incentives of +60%` }),
    intl.formatMessage({ defaultMessage: `Collect EigenLayer points` }),
    intl.formatMessage({ defaultMessage: `AVS/Network yields & airdrops` }),
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
      <Stack component="ul" spacing={0.5}>
        {points.map((p) => (
          <Typography key={p} component="li">
            {p}
          </Typography>
        ))}
      </Stack>
      <ExternalLink
        sx={{ alignSelf: 'flex-start', color: 'primary.main', mb: 3 }}
      >
        {intl.formatMessage({ defaultMessage: 'Learn More' })}
      </ExternalLink>
      <Button
        component={RouterLink}
        to="/restake/"
        fullWidth
        sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
      >
        {intl.formatMessage({ defaultMessage: 'Back to staking' })}
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
  converted: Dnum;
} & StackProps;

const Form = ({
  onContinueClick,
  amount,
  setAmount,
  converted,
  ...rest
}: FormProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { data: bal, isLoading: isBalLoading } = useWatchBalance({
    token: tokens.mainnet.primeETH,
  });

  const handleAmountChange = (val: bigint) => {
    setAmount(val);
  };

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
          value={intl.formatMessage({ defaultMessage: '1:1.1' })}
          {...valueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Gas:' })}
          value={intl.formatMessage({ defaultMessage: '~$1.50' })}
          {...valueLabelProps}
        />
      </Stack>
      <Divider />
      <Stack p={3}>
        <Typography mb={2} color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Receive' })}
        </Typography>

        <Typography>
          {intl.formatMessage(
            {
              defaultMessage: '{converted} OETH',
            },
            { converted: format(converted, 4) },
          )}
        </Typography>
        <Typography>
          {intl.formatMessage({
            defaultMessage: '7 days retention period',
          })}
        </Typography>
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
            sx={{ fontSize: 16, fontWeight: 'medium', lineHeight: 2 }}
          >
            {intl.formatMessage({
              defaultMessage:
                'You will no longer be eligible for the Season 1 Airdrop or YieldNest Seeds if you withdraw.',
            })}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack p={3} sx={{ backgroundColor: '#fff' }}>
        <ConnectedButton
          onClick={onContinueClick}
          disabled={amount === 0n}
          sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
        >
          {intl.formatMessage({ defaultMessage: 'Withdraw' })}
        </ConnectedButton>
      </Stack>
    </Stack>
  );
};

type StepperProps = { converted: Dnum } & StackProps;

const Stepper = ({ converted, ...rest }: StepperProps) => {
  const intl = useIntl();
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps = [
    intl.formatMessage({ defaultMessage: 'Initiate Withdrawal' }),
    intl.formatMessage({ defaultMessage: 'Approve Withdrawal' }),
    intl.formatMessage({ defaultMessage: 'Wait 7 days' }),
    intl.formatMessage({ defaultMessage: 'Return to Claim' }),
  ];

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
            <Typography>{format(converted, 4)}</Typography>
          </Stack>
        }
        px={3}
        py={1}
        {...valueLabelProps}
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
        <ConnectedButton
          disabled={!checked}
          sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
        >
          {intl.formatMessage({ defaultMessage: 'Withdraw' })}
        </ConnectedButton>
        <Button
          component={RouterLink}
          to="/restake/migrate"
          variant="text"
          sx={{
            fontSize: 16,
            color: 'primary.main',
            '&:hover': { color: 'primary.dark' },
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
