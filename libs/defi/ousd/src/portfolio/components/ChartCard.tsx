import { useMemo, useState } from 'react';

import { Card, CardHeader } from '@mui/material';
import { SliderSwitch } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

export const ChartCard = (props: CardProps) => {
  const intl = useIntl();
  const [chartOption, setChartOption] = useState('daily');
  const chartOptions: Option[] = useMemo(
    () => [
      {
        label: intl.formatMessage({ defaultMessage: 'Daily yield' }),
        value: 'daily',
      },
      {
        label: intl.formatMessage({ defaultMessage: 'Lifetime earnings' }),
        value: 'lifetime',
      },
    ],
    [intl],
  );

  const handleChartOptionChange = (newVal: string | number) => {
    setChartOption(newVal as string);
  };

  return (
    <Card {...props}>
      <CardHeader
        title={
          <SliderSwitch
            options={chartOptions}
            value={chartOption}
            onChange={handleChartOptionChange}
          />
        }
        titleTypographyProps={{
          sx: { display: 'flex', justifyContent: 'flex-start' },
        }}
      />
    </Card>
  );
};
