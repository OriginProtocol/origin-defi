import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { ChartTooltip } from '@origin/analytics/shared';
import {
  BarChart,
  CurrencyLabel,
  InfoTooltipLabel,
  LoadingLabel,
} from '@origin/shared/components';
import { Spinner } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView, useNetAssetValue } from '../hooks';

import type { CardProps } from '@mui/material';
import type { NumberLike } from '@visx/scale';

export type NetAssetsCardProps = {
  height: number;
} & CardProps;

export const NetAssetsCard = ({ height, ...rest }: NetAssetsCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { currency } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useNetAssetValue();

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];
  const width = measures?.width ?? 0;
  const totalNAV =
    currency === 'ETH' ? activeItem?.totalETH : activeItem?.totalUSD;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'Total assets minus liabilities',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Net Asset Value' })}
          </InfoTooltipLabel>
        }
      />
      <Divider />
      <CardContent>
        <Stack
          spacing={0.5}
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <LoadingLabel
            isLoading={isLoading}
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
          >
            {format(
              toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
              'dd MMM yyyy',
            )}
          </LoadingLabel>
          <LoadingLabel
            variant="body1"
            isLoading={isLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(totalNAV ?? 0, {
              maximumFractionDigits: 0,
            })}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <BarChart
          width={width}
          height={height}
          barData={data ?? []}
          xKey="timestamp"
          yKey={currency === 'ETH' ? 'totalETH' : 'totalUSD'}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          margins={{ top: 5, left: 25, right: 60, bottom: 50 }}
          tickYFormat={(value: NumberLike) =>
            `${currency === 'ETH' ? 'Ξ' : '$'} ${intl.formatNumber(
              Number(value),
              {
                notation: 'compact',
              },
            )}`
          }
          barColor={theme.palette.chart3}
          activeBarColor={theme.palette.chart8}
          Tooltip={ChartTooltip}
        />
      )}
    </Card>
  );
};
