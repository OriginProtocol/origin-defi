import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { LrtWithdrawalStatus } from '@origin/prime/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useTokenPrice } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useMatch } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { useUserWithdrawalsQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Dnum } from 'dnum';

export const PastClaimsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const match = useMatch('/restake/claim');
  const { data: price, isLoading: isPriceLoading } =
    useTokenPrice('1:OETH_USD');
  const { data: withdrawals, isLoading: iswithdrawalsLoading } =
    useUserWithdrawalsQuery(
      { address: address ?? ZERO_ADDRESS },
      {
        enabled: isConnected,
        select: (data) =>
          data?.lrtWithdrawalRequests?.filter(
            (r) => r.status === LrtWithdrawalStatus.Claimed,
          ) ?? [],
      },
    );

  if (!match || iswithdrawalsLoading || isNilOrEmpty(withdrawals)) {
    return null;
  }

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Past Claims' })}
      />
      <Stack pb={2}>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Date' })}
          value={intl.formatMessage({ defaultMessage: 'Amount' })}
          {...valueLabelProps}
          labelProps={{
            variant: 'body1',
            color: 'text.secondary',
            ...valueLabelProps?.labelProps,
          }}
          valueProps={{
            variant: 'body1',
            color: 'text.secondary',
            ...valueLabelProps?.labelProps,
          }}
        />
        {withdrawals?.map((r) => {
          const amt = [
            BigInt(r?.assetAmount ?? 0),
            tokens.mainnet.OETH.decimals,
          ] as Dnum;
          const converted = mul(amt, price ?? 0);

          return (
            <ValueLabel
              key={r.id}
              label={intl.formatDate(new Date(r.timestamp), {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
              value={intl.formatMessage(
                { defaultMessage: '{amount} {converted}' },
                {
                  amount: `${format(amt, 4)} OETH`,
                  converted: (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="start"
                    >
                      (${format(converted, 2)})
                    </Typography>
                  ),
                },
              )}
              isLoading={isPriceLoading}
              {...valueLabelProps}
            />
          );
        })}
      </Stack>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  px: 2,
  pt: 1,
  labelProps: { sx: { width: 0.5 } },
  valueProps: { sx: { width: 0.5 } },
};
