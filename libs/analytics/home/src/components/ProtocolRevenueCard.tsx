import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useTokensChartStats } from '@origin/analytics/shared';
import { useMeasure } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';

export type ProtocolRevenueCardProps = {
  height: number;
} & CardProps;

export const ProtocolRevenueCard = ({
  height,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { limit, offset, currency } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokensChartStats(limit, offset);

  const width = measures?.width ?? 0;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Cumulative protocol revenue',
        })}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          {/* <LoadingLabel
            isLoading={isLoading}
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
          >
            {format(
              new Date(activeItem?.timestamp ?? new Date().getTime()),
              'dd MMM yyyy',
            )}
          </LoadingLabel> */}
          {/* <LoadingLabel
            variant="body1"
            isLoading={isLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(activeItem?.totalCumulated ?? 0, {
              maximumFractionDigits: 3,
            })}
          </LoadingLabel> */}
        </Stack>
      </CardContent>
      {/* {isLoading ? <Spinner sx={{ width, height }} /> : <BarStackChart />} */}
    </Card>
  );
};
