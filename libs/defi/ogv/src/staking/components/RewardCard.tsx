import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useOgvInfo } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { TransactionButton, useFormat } from '@origin/shared/providers';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';

import { cardContentProps } from '../styles';

import type { CardProps } from '@mui/material';

export const RewardCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();
  const { data: info, isLoading: isInfoLoading } = useOgvInfo();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'OGV rewards available to claim',
        })}
      />
      <CardContent {...cardContentProps}>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <TokenIcon token={tokens.mainnet.OGV} sx={{ fontSize: 28 }} />
          <LoadingLabel
            sWidth={60}
            isLoading={isInfoLoading}
            sx={{ fontSize: 16 }}
          >
            {formatAmount(
              info?.veOgvRewards ?? 0n,
              tokens.mainnet.OGV.decimals,
            )}
          </LoadingLabel>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <TransactionButton
            contract={tokens.mainnet.veOGV}
            functionName="collectRewards"
            args={undefined}
            label={intl.formatMessage({ defaultMessage: 'Claim' })}
            variant="outlined"
            color="primary"
            disabled={info?.veOgvRewards === 0n}
            notificationTitle={intl.formatMessage({
              defaultMessage: 'Collect Rewards',
            })}
            notificationSubtitle={intl.formatMessage(
              {
                defaultMessage: 'Collect {rewards} rewards OGV',
              },
              {
                rewards: formatAmount(
                  info?.veOgvRewards,
                  tokens.mainnet.OGV.decimals,
                  undefined,
                  { notation: 'compact', maximumSignificantDigits: 4 },
                ),
              },
            )}
            onSuccess={() => {
              queryClient.invalidateQueries({
                queryKey: [useOgvInfo.getKey(address, config)],
              });
            }}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardContent {...cardContentProps}>
        <Typography variant="body2" color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Total accrued rewards' })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {intl.formatNumber(1.456e6, {
            notation: 'compact',
            maximumSignificantDigits: 5,
          })}
          &nbsp;OGV
        </Typography>
      </CardContent>
    </Card>
  );
};
