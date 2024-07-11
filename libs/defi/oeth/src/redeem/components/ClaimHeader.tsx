import { Divider, Stack, Typography } from '@mui/material';
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
      (acc, curr) =>
        curr.claimable
          ? add([curr.amount, tokens.mainnet.WETH.decimals], acc)
          : acc,
      from(0),
    ) ?? from(0);
  const pendingAmount =
    pending?.reduce(
      (acc, curr) =>
        curr.claimable
          ? add([curr.amount, tokens.mainnet.WETH.decimals], acc)
          : acc,
      from(0),
    ) ?? from(0);

  return (
    <Stack
      {...props}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        backgroundColor: 'background.highlight',
        ...props?.sx,
      }}
    >
      <Stack alignItems="center" p={3} spacing={1}>
        <Typography color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Available to claim' })}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={0.75}>
          <LoadingLabel
            isLoading={isRequestsLoading}
            variant="featured1"
            fontWeight="bold"
          >
            {eq(availableToClaim, 0)
              ? '0.0'
              : format(availableToClaim, getFormatPrecision(availableToClaim))}
          </LoadingLabel>
          <Typography variant="body2">{tokens.mainnet.WETH.symbol}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center">
        <Stack width={1} alignItems="center" p={3} spacing={1}>
          <Typography color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Your requests' })}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2} minHeight={32}>
            <IconChip claimable amount={claimable?.length ?? 0} />
            <Divider orientation="vertical" flexItem />
            <IconChip claimable={false} amount={pending?.length ?? 0} />
          </Stack>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack width={1} alignItems="center" p={3} spacing={1}>
          <Typography color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Your pending amount' })}
          </Typography>
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={0.75}
            minHeight={32}
          >
            <LoadingLabel
              isLoading={isRequestsLoading}
              variant="featured2"
              fontWeight="bold"
            >
              {format(pendingAmount, getFormatPrecision(pendingAmount))}
            </LoadingLabel>
            <Typography variant="body2">
              {tokens.mainnet.OETH.symbol}
            </Typography>
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
      alignItems="center"
      spacing={1}
      {...rest}
      sx={{
        svg: {
          fontSize: 24,
          color: claimable ? 'success.main' : 'warning.main',
        },
        ...rest?.sx,
      }}
    >
      {claimable ? <FaCircleCheckRegular /> : <FaClockRegular />}
      <Typography variant="body2" fontWeight="bold">
        {amount}
      </Typography>
    </Stack>
  );
};
