import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  getTokenPriceKey,
  useFormat,
  useTokenPrice,
  useTvl,
} from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const DetailsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(tokens.mainnet.OUSD),
  );
  const { data: tvl, isLoading: isTvlLoading } = useTvl(tokens.mainnet.OUSD);

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Global stats' })}
      />
      <Divider />
      <CardContent>
        <Stack spacing={3}>
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'TVL' })}
            labelProps={{ variant: 'mono' }}
            value={formatCurrency(tvl, undefined, undefined, {
              minimumFractionDigits: 2,
            })}
            isLoading={isTvlLoading}
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Price' })}
            labelProps={{ variant: 'mono' }}
            value={formatCurrency(price)}
            isLoading={isPriceLoading}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
