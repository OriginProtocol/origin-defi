import { Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';

import csv from '../data.csv';
import { useDPrice } from '../state';
import {
  getARMPrice,
  getBaseAmount,
  getBoughtAmount,
  getQueueAmount,
  getTimestamp,
  getTradePrice,
} from '../utils';

import type { ValueLabelProps } from '@origin/shared/components';

export const Metrics = () => {
  const [{ index }] = useDPrice();

  const point = csv[index];

  return (
    <Stack>
      <ValueLabel
        {...valueLabelProps}
        label="Trade Price"
        value={index > 0 ? getTradePrice(point) : '-'}
      />
      <ValueLabel
        {...valueLabelProps}
        label="Qty Bought"
        value={index > 0 ? getBoughtAmount(point) : '-'}
      />
      <ValueLabel
        {...valueLabelProps}
        label="ARM Price"
        value={index > 0 ? getARMPrice(point) : '-'}
      />
      <ValueLabel
        {...valueLabelProps}
        label="ETH"
        value={index > 0 ? getBaseAmount(point) : '-'}
      />
      <ValueLabel
        {...valueLabelProps}
        label="Queued ETH"
        value={index > 0 ? getQueueAmount(point) : '-'}
      />
      <ValueLabel
        {...valueLabelProps}
        label="Date"
        value={index > 0 ? getTimestamp(point).toLocaleString() : '-'}
      />
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  labelProps: { minWidth: 120 },
};
