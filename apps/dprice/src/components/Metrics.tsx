import { Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';

import csv from '../data.csv';
import { useDPrice } from '../state';
import {
  getARMPrice,
  getBaseAmount,
  getBoughtAmount,
  getQueueAmount,
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
        value={getTradePrice(point)}
      />
      <ValueLabel
        {...valueLabelProps}
        label="Qty Bought"
        value={getBoughtAmount(point)}
      />
      <ValueLabel
        {...valueLabelProps}
        label="ARM Price"
        value={getARMPrice(point)}
      />
      <ValueLabel
        {...valueLabelProps}
        label="ETH"
        value={getBaseAmount(point)}
      />
      <ValueLabel
        {...valueLabelProps}
        label="Queued ETH"
        value={getQueueAmount(point)}
      />
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  labelProps: { minWidth: 120 },
};
