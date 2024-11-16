import { useState } from 'react';

import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { useMeasure } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';

export type NetAssetsCardProps = {
  height: number;
} & CardProps;

export const NetAssetsCard = ({ height, ...rest }: NetAssetsCardProps) => {
  const intl = useIntl();
  const { limit, offset, currency } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();

  const width = measures?.width ?? 0;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Net Assets' })}
      />
      <Divider />
      <CardContent>
        <Stack
          spacing={0.5}
          sx={{
            alignItems: 'flex-start',
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
          </LoadingLabel>
          <LoadingLabel
            variant="body1"
            isLoading={isLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(totalTvl ?? 0, {
              maximumFractionDigits: 0,
            })}
          </LoadingLabel> */}
        </Stack>
      </CardContent>
      {/* {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <LineChart
          series={series}
          width={width}
          height={height}
          margins={{ top: 5, left: 25, right: 60, bottom: 50 }}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          tickYFormat={(value: NumberLike) =>
            `${currency === 'ETH' ? 'Ξ' : '$'} ${intl.formatNumber(
              Number(value),
              {
                notation: 'compact',
              },
            )}`
          }
        />
      )} */}
    </Card>
  );
};
