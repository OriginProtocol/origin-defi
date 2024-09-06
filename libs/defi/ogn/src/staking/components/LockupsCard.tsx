import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useOgnLockupsQuery } from '../queries.generated';
import { LockupsTable } from './LockupsTable';

import type { CardProps } from '@mui/material';

export const LockupsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: lockups, isLoading: isLockupsFetching } = useOgnLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: !!address,
      select: (data) => data.esLockups,
    },
  );

  if (!isConnected || isNilOrEmpty(lockups)) {
    return null;
  }

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Your lockups' })}
      />
      <Divider />
      {isLockupsFetching ? (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '15rem',
            width: 1,
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <LockupsTable />
      )}
    </Card>
  );
};
