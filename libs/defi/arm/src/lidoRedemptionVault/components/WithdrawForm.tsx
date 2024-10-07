import { useState } from 'react';

import { Button, CardContent, Stack, Typography } from '@mui/material';
import { TokenButton, useTxButton } from '@origin/defi/shared';
import {
  BigIntInput,
  InfoTooltipLabel,
  LoadingLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { PiggyBank } from '@origin/shared/icons';
import { TxButton } from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { format, from, gt } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useArmVault } from '../hooks';

import type { CardContentProps } from '@mui/material';
import type { Dnum } from 'dnum';

export const WithdrawForm = (props: CardContentProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [amount, setAmount] = useState(
    from(0, tokens.mainnet['ARM-WETH-stETH'].decimals),
  );
  const { data: info, isLoading: isInfoLoading } = useArmVault();
  const { params, callbacks } = useTxButton({
    params: {
      contract: contracts.mainnet.ARMstETHWETHPool,
      functionName: 'requestRedeem',
      args: [amount[0]],
    },
    activity: {
      type: 'redeem',
      status: 'pending',
      amountIn: amount[0],
      tokenIdIn: tokens.mainnet['ARM-WETH-stETH'].id,
      tokenIdOut: tokens.mainnet.WETH.id,
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
    setAmount([val, tokens.mainnet['ARM-WETH-stETH'].decimals] as Dnum);
  };

  const handleMaxClick = () => {
    setAmount(
      info?.userBalance ?? from(0, tokens.mainnet['ARM-WETH-stETH'].decimals),
    );
  };

  const isWithdrawDisabled =
    isInfoLoading ||
    gt(amount, info?.userBalance ?? from(0)) ||
    amount[0] === 0n;
  const withdrawButtonLabel = gt(amount, info?.userBalance ?? from(0))
    ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
    : intl.formatMessage({ defaultMessage: 'Withdraw' });

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
            <LoadingLabel
              isLoading={isInfoLoading}
              noWrap
              sx={{
                fontWeight: 'medium',
              }}
            >
              {format(info?.userBalance ?? from(0), {
                digits: getFormatPrecision(info?.userBalance ?? from(0)),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </LoadingLabel>
          </Button>
        </Stack>
        <BigIntInput
          value={amount[0]}
          decimals={amount[1]}
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
        <TxButton
          params={params}
          callbacks={callbacks}
          label={withdrawButtonLabel}
          disabled={isWithdrawDisabled}
          variant="action"
          fullWidth
        />
      </Stack>
    </CardContent>
  );
};
