import { Grid, Stack } from '@mui/material';

import { useLayout } from '../../Layout';
import { ApyCard } from '../components/ApyCard';
import { PercentWrappedCard } from '../components/PercentWrappedCard';
import { PriceCard } from '../components/PriceCard';
import { ProtocolRevenueCard } from '../components/ProtocolRevenueCard';
import { TotalSupplyCard } from '../components/TotalSupplyCard';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';

export type OverviewViewProps = {
  children?: ReactNode;
  token: Token;
} & StackProps;

export const OverviewView = ({
  token,
  children,
  ...rest
}: OverviewViewProps) => {
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Stack {...rest} key={token.id}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
          <ApyCard token={token} height={300} />
        </Grid>
        <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
          <TotalSupplyCard token={token} height={300} />
        </Grid>
        {children}
        <Grid size={12}>
          <ProtocolRevenueCard token={token} height={300} />
        </Grid>
        <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
          <PriceCard token={token} height={300} />
        </Grid>
        <Grid size={{ xs: 12, md: isDrawerOpen ? 12 : 6, lg: 6 }}>
          <PercentWrappedCard token={token} height={300} />
        </Grid>
      </Grid>
    </Stack>
  );
};
