import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ConnectedButton } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useMyVApy, useTotalLockedUp } from '../hooks';
import { useOgvLockupsQuery } from '../queries.generated';
import { LockupsTable } from './LockupsTable';

import type { CardProps, StackProps } from '@mui/material';

export const LockupsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: lockups, isFetching: isLockupsFetching } = useOgvLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data.ogvLockups },
  );

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Lock-ups' })}
        action={<CardActionHeader />}
      />
      {isConnected ? (
        isLockupsFetching ? (
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
        ) : isNilOrEmpty(lockups) ? (
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
          <ConnectedButton sx={{ minWidth: 160, height: 44 }} />
        </Stack>
      )}
    </Card>
  );
};

function CardActionHeader() {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { data: myvAPY, isLoading: isMyvAPYLoading } = useMyVApy();
  const { data: totalLocked, isLoading: isTotalLockedLoading } =
    useTotalLockedUp();

  if (!isConnected) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1.5}>
      <Stack {...stackProps}>
        <Typography variant="inherit">
          {intl.formatMessage({ defaultMessage: 'Total' })}
        </Typography>
        <Stack direction="row" spacing={0.75}>
          <TokenIcon
            token={tokens.mainnet.veOGV}
            sx={{ fontSize: 16, transform: 'translateY(4px)' }}
          />
          <LoadingLabel isLoading={isTotalLockedLoading}>
            {intl.formatNumber(
              +formatUnits(totalLocked ?? 0n, tokens.mainnet.veOGV.decimals),
              {
                notation: 'compact',
                minimumSignificantDigits: 4,
                maximumSignificantDigits: 4,
                roundingMode: 'floor',
              },
            )}
          </LoadingLabel>
        </Stack>
      </Stack>
      <Stack {...stackProps}>
        <Typography variant="inherit">
          {intl.formatMessage({ defaultMessage: 'Your APY' })}
        </Typography>
        <LoadingLabel
          variant="inherit"
          isLoading={isMyvAPYLoading}
          sx={{
            fontSize: 16,
            fontWeight: 500,
            background: (theme) => theme.palette.background.gradientOrange,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {intl.formatNumber((myvAPY ?? 0) / 100, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </LoadingLabel>
      </Stack>
    </Stack>
  );
}

const stackProps: StackProps = {
  direction: 'row',
  alignItems: 'center',
  spacing: 1.5,
  sx: {
    fontFamily: 'Sailec',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    px: 1,
    py: 0.25,
  },
};
