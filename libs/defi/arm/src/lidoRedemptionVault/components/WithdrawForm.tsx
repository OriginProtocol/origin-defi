import { useState } from 'react';

import { Button, CardContent, Stack, Typography } from '@mui/material';
import { TokenButton } from '@origin/defi/shared';
import { BigIntInput, InfoTooltipLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { PiggyBank } from '@origin/shared/icons';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import { useArmVault } from '../hooks';

import type { CardContentProps } from '@mui/material';

export const WithdrawForm = (props: CardContentProps) => {
  const intl = useIntl();
  const [amount, setAmount] = useState(0n);
  const { data } = useArmVault();

  const handleAmountChange = (val: bigint) => {
    setAmount(val);
  };

  const handleMaxClick = () => {
    setAmount(data?.userBalance[0] ?? 0n);
  };

  const isWithdrawDisabled = amount === 0n;

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
              defaultMessage: 'The amount to withdraw',
            })}
            fontWeight="medium"
          >
            {intl.formatMessage({ defaultMessage: 'Amount to withdraw' })}
          </InfoTooltipLabel>
          <Button variant="link" onClick={handleMaxClick}>
            <PiggyBank sx={{ fontSize: 20, mr: 1 }} />
            <Typography
              noWrap
              sx={{
                fontWeight: 'medium',
              }}
            >
              {format(data?.userBalance ?? from(0), {
                digits: getFormatPrecision(data?.userBalance ?? from(0)),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </Typography>
          </Button>
        </Stack>
        <BigIntInput
          value={amount}
          decimals={18}
          onChange={handleAmountChange}
          endAdornment={<TokenButton token={tokens.mainnet.WETH} disabled />}
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
              'The waiting time for the withdrawal to be processed',
          })}
          sx={{
            fontWeight: 'medium',
            height: 36,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Withdraw time estimate' })}
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
          <Typography
            variant="featured3"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {intl.formatMessage({
              defaultMessage: '~ 0-5 days',
            })}
          </Typography>
        </Stack>
        <Button variant="action" fullWidth disabled={isWithdrawDisabled}>
          {intl.formatMessage({ defaultMessage: 'Withdraw' })}
        </Button>
      </Stack>
    </CardContent>
  );
};
