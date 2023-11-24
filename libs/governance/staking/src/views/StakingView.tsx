import { Stack } from '@mui/material';

import { LockupsCard } from '../components/LockupsCard';
import { StackingHeader } from '../components/StakingHeader';

export const StakingView = () => {
  return (
    <Stack spacing={3}>
      <StackingHeader />
      <LockupsCard />
    </Stack>
  );
};
