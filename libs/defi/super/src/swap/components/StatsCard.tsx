import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { ColorChip, useTokenInfo } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { superOETHb } from '@origin/shared/icons';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type StatsCardProps = { token: Token; disabled?: boolean } & CardProps;

export const StatsCard = ({ token, disabled, ...rest }: StatsCardProps) => {
  const intl = useIntl();
  const { apies, tvl, isLoading } = useTokenInfo({ token, enabled: !disabled });

  return (
    <Card {...rest}>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <SvgIcon component={superOETHb} sx={{ fontSize: 24 }} />
            <Typography fontWeight="medium">{token.symbol}</Typography>
            <ColorChip alignItems="baseline">
              <Typography variant="caption1" fontWeight="bold">
                {intl.formatNumber(apies?.apr ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
              <Typography variant="caption2">APR</Typography>
            </ColorChip>
          </Stack>
        }
      />
      <Divider />
      <CardContent>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'TVL' })}
          value={`${format(tvl ?? from(0), 2)}`}
          valueProps={{ fontWeight: 'bold' }}
          isLoading={isLoading}
          direction="row"
          justifyContent="space-between"
        />
      </CardContent>
    </Card>
  );
};
