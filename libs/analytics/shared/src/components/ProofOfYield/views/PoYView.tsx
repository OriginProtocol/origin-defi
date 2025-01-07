import { Grid2, Stack } from '@mui/material';

import { BonusCard } from '../components/BonusCard';
import { ChartCard } from '../components/ChartCard';
import { ControlsCard } from '../components/ControlsCard';
import { DailyYieldCard } from '../components/DailyYieldCard';
import { DripperCard } from '../components/DripperCard';
import { YieldEventsCard } from '../components/YieldEventsCard';
import { PoYProvider } from '../state';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type PoYViewProps = { token: Token } & StackProps;

export const PoYView = ({ token, ...rest }: PoYViewProps) => {
  return (
    <PoYProvider key={token.id} token={token}>
      <Stack spacing={2} {...rest}>
        <ControlsCard />
        <ChartCard height={300} />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              <DailyYieldCard />
              <YieldEventsCard />
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <BonusCard />
          </Grid2>
        </Grid2>
        <DripperCard />
      </Stack>
    </PoYProvider>
  );
};
