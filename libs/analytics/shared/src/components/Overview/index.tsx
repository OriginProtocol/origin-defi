import { Grid2, Stack } from '@mui/material';

import { ApyCard, TotalSupplyCard } from '../Cards';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type OverviewProps = {
  token: Token;
} & StackProps;

export const Overview = ({ token, ...rest }: OverviewProps) => {
  return (
    <Stack {...rest}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <ApyCard token={token} height={320} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TotalSupplyCard token={token} height={300} />
        </Grid2>
      </Grid2>
    </Stack>
  );
};
