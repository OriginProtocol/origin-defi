import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { supportedChainNames } from '@origin/shared/constants';
import {
  getTokenPriceKey,
  useTokenPrice,
  useTvl,
} from '@origin/shared/providers';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type GlobalStatsCardProps = { token: Token } & CardProps;

export const GlobalStatsCard = ({ token, ...rest }: GlobalStatsCardProps) => {
  const intl = useIntl();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(token),
  );
  const { data: tvl, isLoading: isTvlLoading } = useTvl(token);

  return (
    <Card {...rest}>
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
            labelProps={{ variant: 'body3', fontWeight: 'medium' }}
            labelInfoTooltip={intl.formatMessage(
              {
                defaultMessage: 'Total value locked on {chainName}',
              },
              {
                chainName: supportedChainNames[token.chainId].short,
              },
            )}
            value={`$${format(tvl ?? from(0), 2)}`}
            valueProps={{ fontWeight: 'medium' }}
            isLoading={isTvlLoading}
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Price' })}
            labelInfoTooltip={intl.formatMessage(
              {
                defaultMessage: 'USD price of {symbol} on {chainName}',
              },
              {
                symbol: token.symbol,
                chainName: supportedChainNames[token.chainId].short,
              },
            )}
            labelProps={{ variant: 'body3', fontWeight: 'medium' }}
            value={`$${format(price ?? from(0), 2)}`}
            valueProps={{ fontWeight: 'medium' }}
            isLoading={isPriceLoading}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
