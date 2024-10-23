import { useState } from 'react';

import { CardContent, Stack, Typography } from '@mui/material';
import { TokenInput, useTxButton } from '@origin/defi/shared';
import { InfoTooltipLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { PiggyBank } from '@origin/shared/icons';
import { TxButton } from '@origin/shared/providers';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceStrict } from 'date-fns';
import { from, gt, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useArmInfo } from '../hooks';

import type { CardContentProps } from '@mui/material';
import type { Dnum } from 'dnum';

export const WithdrawForm = (props: CardContentProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const [amount, setAmount] = useState(from(0, tokens.mainnet.WETH.decimals));
  const { data: info, isLoading: isInfoLoading } = useArmInfo();
  const input = mul(amount, info?.wethToLp ?? 0, { rounding: 'ROUND_DOWN' });
  const { params, callbacks } = useTxButton({
    params: {
      contract: contracts.mainnet.ARMstETHWETHPool,
      functionName: 'requestRedeem',
      args: [input[0]],
    },
    activity: {
      type: 'redeem',
      status: 'pending',
      amountIn: input[0],
      tokenIdIn: tokens.mainnet['ARM-WETH-stETH'].id,
      tokenIdOut: tokens.mainnet.WETH.id,
    },
    callbacks: {
      onWriteSuccess: () => {
        setAmount(from(0, tokens.mainnet['ARM-WETH-stETH'].decimals));
        queryClient.invalidateQueries({
          queryKey: useArmInfo.getKey(address),
        });
      },
    },
  });

  const handleAmountChange = (val: bigint) => {
    setAmount([val, tokens.mainnet['ARM-WETH-stETH'].decimals] as Dnum);
  };

  const nextQueued = (info?.withdrawsQueued ?? 0n) + input[0];
  const waitTimeLabel =
    nextQueued > (info?.claimable ?? 0n)
      ? intl.formatMessage({ defaultMessage: '0~5 days' })
      : formatDistanceStrict(0, Number(info?.claimDelay ?? 600) * 1000, {
          unit: 'minute',
        });
  const isWithdrawDisabled =
    isInfoLoading ||
    amount[0] === 0n ||
    gt(amount, info?.userWethBalance ?? from(0));
  const withdrawButtonLabel = gt(amount, info?.userWethBalance ?? from(0))
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
          balance={info?.userWethBalance[0] ?? 0n}
          isBalanceLoading={isInfoLoading}
          token={tokens.mainnet.WETH}
          tokenPriceUsd={info?.prices?.['1:WETH_USD']}
          isPriceLoading={isInfoLoading}
          isTokenClickDisabled
          balanceIcon={<PiggyBank />}
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
            {waitTimeLabel}
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
