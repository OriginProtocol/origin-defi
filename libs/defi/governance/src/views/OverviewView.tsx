import { Stack } from '@mui/material';

import { ProposalsCard } from '../components/ProposalsCard';
import { ProtocolCard } from '../components/ProtocolCard';
import { UserVotingPowerCard } from '../components/UserVotingPowerCard';

export const OverviewView = () => {
  return (
    <Stack direction="row" spacing={3}>
      <Stack width={0.6} spacing={3}>
        <ProtocolCard />
        <ProposalsCard />
      </Stack>
      <Stack width={0.4} spacing={3}>
        <UserVotingPowerCard />
      </Stack>
    </Stack>
  );
};
