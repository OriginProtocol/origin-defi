import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { LrtWithdrawalStatus } from '@origin/prime/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat, useTokenPrice } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useUserWithdrawalsQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const PastClaimsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount, formatCurrency } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice('OETH_USD');
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

  if (iswithdrawalsLoading || isNilOrEmpty(withdrawals)) {
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
        {withdrawals?.map((r) => (
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
                amount: formatAmount(BigInt(r.claimedAmount)),
                converted: (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="start"
                  >
                    (
                    {formatCurrency(
                      (price ?? 0) *
                        +formatUnits(
                          BigInt(r.claimedAmount),
                          tokens.mainnet.OETH.decimals,
                        ),
                    )}
                    )
                  </Typography>
                ),
              },
            )}
            isLoading={isPriceLoading}
            {...valueLabelProps}
          />
        ))}
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
