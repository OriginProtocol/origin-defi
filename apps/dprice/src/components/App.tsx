import { Box, Container, Typography } from '@mui/material';

import { DPriceProvider } from '../state';
import { Controls } from './Controls';
import { PriceChart } from './PriceChart';

export const App = () => {
  return (
    <DPriceProvider>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography variant="h3" textAlign="center" mb={4}>
          Dynamic Pricing Visualization
        </Typography>
        <Box sx={{ width: 1, mb: 4 }}>
          <PriceChart />
        </Box>
        <Controls />
      </Container>
    </DPriceProvider>
  );
};
