import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { ConnectedButton } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useUserLockupsQuery } from '../queries.generated';
import { LockupsTable } from './LockupsTable';
import { UnlockAllButton } from './UnlockAllModal';

import type { CardProps } from '@mui/material';

export const LockupsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data, isFetching } = useUserLockupsQuery(
    { address: address?.toLowerCase() ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data.ogvLockups },
  );

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Lock-ups' })}
        action={
          isConnected && (
            <UnlockAllButton
              variant="outlined"
              color="secondary"
              disabled={isNilOrEmpty(data)}
              sx={{ ml: 2 }}
            >
              {intl.formatMessage({ defaultMessage: 'Unlock All' })}
            </UnlockAllButton>
          )
        }
      />
      {isConnected ? (
        isFetching ? (
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
        ) : isNilOrEmpty(data) ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'No Lock-ups' })}
            </Typography>
          </Stack>
        ) : (
          <LockupsTable />
        )
      ) : (
        <Stack
          sx={{
            height: '15rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ConnectedButton
            variant="connect"
            sx={{ minWidth: 160, height: 44 }}
          />
        </Stack>
      )}
    </Card>
  );
};
