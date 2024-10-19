import { useState } from 'react';

import { CardContent, Stack, Typography } from '@mui/material';
import { TokenInput, useTxButton } from '@origin/defi/shared';
import { InfoTooltipLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { TxButton } from '@origin/shared/providers';
import { useQueryClient } from '@tanstack/react-query';
import { div, from, gt, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useArmVault } from '../hooks';

import type { CardContentProps } from '@mui/material';
import type { Dnum } from 'dnum';

export const WithdrawForm = (props: CardContentProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [amount, setAmount] = useState(from(0, tokens.mainnet.WETH.decimals));
  const { data: info, isLoading: isInfoLoading } = useArmVault();
  const lpAmount = div(
    amount,
    info?.prices['1:ARM-WETH-stETH_1:WETH'] ?? from(1, 18),
  );
  const { params, callbacks } = useTxButton({
    params: {
      contract: contracts.mainnet.ARMstETHWETHPool,
      functionName: 'requestRedeem',
      args: [amount[0]],
    },
    activity: {
      type: 'redeem',
      status: 'pending',
      amountIn: lpAmount[0],
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

  const userWethBalance = mul(
    info?.userBalance ?? from(0),
    info?.prices?.['1:ARM-WETH-stETH_1:WETH'] ?? from(0),
    { rounding: 'ROUND_DOWN' },
  );
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
        </Stack>
        <TokenInput
          amount={amount[0]}
          decimals={amount[1]}
          onAmountChange={handleAmountChange}
          balance={userWethBalance[0]}
          isBalanceLoading={isInfoLoading}
          token={tokens.mainnet.WETH}
          tokenPriceUsd={info?.prices?.['1:WETH_USD']}
          isPriceLoading={isInfoLoading}
          isTokenClickDisabled
          sx={(theme) => ({
            p: 2,
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
