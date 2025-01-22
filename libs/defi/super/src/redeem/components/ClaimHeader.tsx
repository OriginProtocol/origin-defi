import {
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaCircleCheckRegular, FaClockRegular } from '@origin/shared/icons';
import { getFormatPrecision } from '@origin/shared/utils';
import { add, eq, format, from } from 'dnum';
import { groupBy } from 'ramda';
import { useIntl } from 'react-intl';

import { useWithdrawalRequests } from '../hooks';

import type { StackProps } from '@mui/material';

export const ClaimHeader = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { data: requests, isLoading: isRequestsLoading } =
    useWithdrawalRequests({
      select: (data) => data?.filter((r) => !r.claimed),
    });

  const { claimable, pending } = groupBy(
    (r) => (r.claimable ? 'claimable' : 'pending'),
    requests ?? [],
  );
  const availableToClaim =
    claimable?.reduce(
      (acc, curr) => add([curr.amount, tokens.base.WETH.decimals], acc),
      from(0),
    ) ?? from(0);
  const pendingAmount =
    pending?.reduce(
      (acc, curr) => add([curr.amount, tokens.base.WETH.decimals], acc),
      from(0),
    ) ?? from(0);

  return (
    <Stack
      {...props}
      sx={[
        {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          backgroundColor: 'background.highlight',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Stack
        spacing={1}
        sx={{
          alignItems: 'center',
          p: 3,
        }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Available to claim' })}
        </Typography>
        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            alignItems: 'baseline',
          }}
        >
          <LoadingLabel
            isLoading={isRequestsLoading}
            variant="featured1"
            sx={{ fontWeight: 'bold' }}
          >
            {eq(availableToClaim, 0)
              ? '0.0'
              : format(availableToClaim, getFormatPrecision(availableToClaim))}
          </LoadingLabel>
          <Typography variant="body2">{tokens.base.WETH.symbol}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          alignItems: 'center',
        }}
      >
        <Stack
          spacing={1}
          sx={{
            width: 1,
            alignItems: 'center',
            p: 3,
          }}
        >
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Your requests' })}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              minHeight: 32,
            }}
          >
            <IconChip claimable amount={claimable?.length ?? 0} />
            <Divider orientation="vertical" flexItem />
            <IconChip claimable={false} amount={pending?.length ?? 0} />
          </Stack>
        </Stack>
        {isSm ? (
          <Divider orientation="horizontal" flexItem />
        ) : (
          <Divider orientation="vertical" flexItem />
        )}
        <Stack
          spacing={1}
          sx={{
            width: 1,
            alignItems: 'center',
            p: 3,
          }}
        >
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Your pending amount' })}
          </Typography>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              alignItems: 'baseline',
              minHeight: 32,
            }}
          >
            <LoadingLabel
              isLoading={isRequestsLoading}
              variant="featured2"
              sx={{ fontWeight: 'bold' }}
            >
              {format(pendingAmount, getFormatPrecision(pendingAmount))}
            </LoadingLabel>
            <Typography variant="body2">{tokens.base.WETH.symbol}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

type IconChipProps = {
  claimable: boolean;
  amount: number;
} & StackProps;

const IconChip = ({ claimable, amount, ...rest }: IconChipProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        {
          svg: {
            fontSize: 24,
          },
        },
        claimable
          ? {
              svg: {
                color: 'success.main',
              },
            }
          : {
              svg: {
                color: 'warning.main',
              },
            },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {claimable ? <FaCircleCheckRegular /> : <FaClockRegular />}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {amount}
      </Typography>
    </Stack>
  );
};
