import { useState } from 'react';

import { alpha, Divider, Stack, Typography } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { YND } from '@origin/shared/icons';
import { ConnectedButton, useWatchBalance } from '@origin/shared/providers';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { TokenInput } from '../components/TokenInput';

import type { StackProps } from '@mui/material';

export const MigrateView = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState(0n);
  const { data: bal, isLoading: isBalLoading } = useWatchBalance({
    token: tokens.mainnet.primeETH,
  });

  const handleAmountChange = (val: bigint) => {
    setAmount(val);
  };

  const converted = mul([amount, tokens.mainnet.primeETH.decimals], 1.1);

  return (
    <Stack>
      <Stack p={3}>
        <PreMintDisclaimer mb={2} />
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
        <Typography mt={0.75} color="text.secondary">
          {intl.formatMessage({
            defaultMessage:
              'All your XP will be redeemable for YND tokens at the TGE.',
          })}
        </Typography>
      </Stack>
      <Divider />
      <Stack p={3}>
        <Typography mb={0.75} color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Receive' })}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <YND sx={{ fontSize: 32 }} />
          <Typography>
            {intl.formatMessage(
              {
                defaultMessage:
                  '≥ {converted} YN LSD Tokens + YND tokens (at the TGE)',
              },
              { converted: format(converted, 4) },
            )}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack p={3} sx={{ backgroundColor: '#fff' }}>
        <ConnectedButton
          disabled={amount === 0n}
          sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
        >
          {intl.formatMessage({ defaultMessage: 'pre-mint ynLSD' })}
        </ConnectedButton>
      </Stack>
    </Stack>
  );
};

const PreMintDisclaimer = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      {...props}
      sx={{
        p: 1,
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'secondary.main',
        backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.2),
        borderRadius: 2,
        ...props?.sx,
      }}
    >
      <Typography mb={0.75}>
        {intl.formatMessage({
          defaultMessage: `Here's why you should consider pre-mint:`,
        })}
      </Typography>
      <Typography>
        {intl.formatMessage({
          defaultMessage: `- It'll make your life easier`,
        })}
      </Typography>
      <Typography>
        {intl.formatMessage({
          defaultMessage: `- Your hair will re-grow`,
        })}
      </Typography>
      <Typography>
        {intl.formatMessage({
          defaultMessage: `- You'll contribute buying drones to protect the European jungles`,
        })}
      </Typography>
    </Stack>
  );
};
