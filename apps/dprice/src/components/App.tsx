import { Box, Container, Stack, Typography } from '@mui/material';

import { DPriceProvider } from '../state';
import { Audio } from './Audio';
import { Controls } from './Controls';
import { GaugeChart } from './GaugeChart';
import { Metrics } from './Metrics';
import { PriceChart } from './PriceChart';

export const App = () => {
  return (
    <DPriceProvider>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" textAlign="center" mb={4}>
          Lido Redemption Visualization
        </Typography>
        <Box sx={{ width: 1, mb: 4 }}>
          <PriceChart />
        </Box>
        <Stack direction="row" mb={4} spacing={2}>
          <GaugeChart />
          <Metrics />
        </Stack>
        <Controls />
        <Audio />
      </Container>
    </DPriceProvider>
  );
};
