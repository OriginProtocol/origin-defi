import { Stack } from '@mui/material';

import { LockupsCard } from '../components/LockupsCard';
import { StackingHeader } from '../components/StakingHeader';

export const StakingView = () => {
  return (
    <Stack mt={5} spacing={3}>
      <StackingHeader />
      <LockupsCard />
    </Stack>
  );
};
