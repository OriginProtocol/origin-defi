import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  InfoTooltipLabel,
  LimitControls,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { usePoY } from '../hooks';
import { ChartController } from './ChartController';

import type { CardProps } from '@mui/material';

export type ChartCardProps = {
  height: number;
} & CardProps;

export const ChartCard = ({ height, ...rest }: ChartCardProps) => {
  const intl = useIntl();
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { isLoading, limit, handleLimitChange, hoveredItem } = usePoY();

  const width = measures?.width ?? 0;

  return (
    <Card ref={ref} {...rest}>
      <CardHeader
        title={
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'This chart shows the level of daily yield distribution',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Proof of Yield' })}
          </InfoTooltipLabel>
        }
      />
      <Divider />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Stack>
          <Typography color="text.secondary">
            {dayjs.utc(hoveredItem?.timestamp).format('DD MMM YYYY')}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
            <LoadingLabel
              variant="featured2"
              sx={{ fontWeight: 'medium' }}
              isLoading={isLoading || !hoveredItem}
              sWidth={70}
            >
              {intl.formatNumber(hoveredItem?.apy as number, {
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </LoadingLabel>
            <Typography>APY</Typography>
            {dayjs.utc().isSame(dayjs.utc(hoveredItem?.timestamp), 'day') && (
              <InfoTooltipLabel
                tooltipLabel={intl.formatMessage({
                  defaultMessage: 'This data is incomplete until midnight UTC',
                })}
                labelProps={{ color: 'text.secondary' }}
              >
                {intl.formatMessage({ defaultMessage: 'Partial data' })}
              </InfoTooltipLabel>
            )}
          </Stack>
        </Stack>
        <LimitControls limit={limit} setLimit={handleLimitChange} />
      </CardContent>
      {isLoading || !width ? (
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ChartController width={width} height={height} />
      )}
    </Card>
  );
};
