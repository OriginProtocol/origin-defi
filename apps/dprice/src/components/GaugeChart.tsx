import { Box, Stack, Typography } from '@mui/material';
import { scaleLinear } from '@visx/scale';

import csv from '../data.csv';
import { useDPrice } from '../state';
import { getBaseAmount, getQueueAmount } from '../utils';

import type { BoxProps } from '@mui/material';

export const GaugeChart = (props: BoxProps) => {
  const [{ index }] = useDPrice();

  if (index === 0) {
    return <Box sx={{ height: 50, width: 700 }} />;
  }

  const point = csv[index];
  const base = `${scaleWidth(getBaseAmount(point))}px`;
  const queue = `${scaleWidth(getQueueAmount(point))}px`;

  return (
    <Stack spacing={2}>
      <Typography variant="h6">ETH / Queued</Typography>
      <Box
        {...props}
        sx={{ ...props?.sx, position: 'relative', width: 700, height: 50 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 1,
            width: base,
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: base,
            height: 1,
            width: queue,
            backgroundColor: (theme) => theme.palette.primary.faded,
          }}
        />
      </Box>
    </Stack>
  );
};

const scaleWidth = scaleLinear({
  domain: [0, 5000],
  range: [0, 1000],
});
