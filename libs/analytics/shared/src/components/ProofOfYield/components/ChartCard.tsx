import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import {
  InfoTooltipLabel,
  LimitControls,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
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
  const { token, isLoading, limit, handleLimitChange } = usePoY();

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
            {intl.formatMessage(
              { defaultMessage: '{symbol} Proof of Yield' },
              { symbol: token.symbol },
            )}
          </InfoTooltipLabel>
        }
      />
      <Divider />
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LimitControls limit={limit} setLimit={handleLimitChange} />
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <ChartController width={width} height={height} />
      )}
    </Card>
  );
};
