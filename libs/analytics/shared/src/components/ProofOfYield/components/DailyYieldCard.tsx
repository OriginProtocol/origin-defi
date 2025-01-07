import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { LoadingLabel, ValueLabel } from '@origin/shared/components';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { usePoY } from '../hooks';

import type { CardProps } from '@mui/material';

export const DailyYieldCard = (props: CardProps) => {
  const intl = useIntl();
  const { token, selectedItem, isLoading, yKey } = usePoY();

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={1}>
          <Typography color="text.secondary" sx={{ fontWeight: 'medium' }}>
            {intl.formatMessage(
              {
                defaultMessage: 'Yield distributed: {date}',
              },
              {
                date: dayjs.utc(selectedItem?.timestamp).format('DD MMM YYYY'),
              },
            )}
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <LoadingLabel isLoading={isLoading} variant="h6" sWidth={120}>
              {intl.formatNumber((selectedItem?.[yKey] as number) ?? 0, {
                maximumFractionDigits: 4,
              })}
            </LoadingLabel>
            <Typography>{token.symbol}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'APY' })}
            value={intl.formatNumber(selectedItem?.apy ?? 0, {
              style: 'percent',
              maximumFractionDigits: 2,
            })}
            isLoading={isLoading}
          />
          <ValueLabel
            label={intl.formatMessage({
              defaultMessage: 'Vault value',
            })}
            value={intl.formatNumber(selectedItem?.totalSupply ?? 0, {
              maximumFractionDigits: 1,
            })}
            isLoading={isLoading}
          />
          <ValueLabel
            label={intl.formatMessage({
              defaultMessage: 'Fees generated',
            })}
            value={intl.formatNumber(selectedItem?.feesETH ?? 0, {
              maximumFractionDigits: 3,
              minimumFractionDigits: 3,
            })}
            isLoading={isLoading}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
