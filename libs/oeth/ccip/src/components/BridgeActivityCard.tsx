import { Fragment } from 'react';

import { Box, Card, CardContent, CardHeader, Link, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ChainIcon, TokenIcon } from '@origin/shared/components';
import {
  FaArrowRightRegular,
  FaArrowUpRightFromSquareRegular,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaLoaderDuotone,
} from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { useBridgeState } from '../state';

import type { SxProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

import type { BridgeActivity } from '../state';

const activityRowSx: SxProps = { height: 56 };
const activityHeaderSx: SxProps = {
  ...activityRowSx,
  borderBottom: 'solid 1px divider',
};
export const BridgeActivityCard = () => {
  const intl = useIntl();
  const { state } = useBridgeState();
  return (
    <Card sx={{ width: { xs: 350, sm: 550 } }}>
      <CardHeader title={'Bridging activity'} />
      <CardContent>
        <Grid2 container spacing={1} columns={15}>
          {/* Header */}
          <Grid2 xs={4} sx={activityHeaderSx} color={'text.secondary'}>
            Amount
          </Grid2>
          <Grid2 xs={3} sx={activityHeaderSx} color={'text.secondary'}>
            Route
          </Grid2>
          <Grid2 xs={3} sx={activityHeaderSx} color={'text.secondary'}>
            Date
          </Grid2>
          <Grid2 xs={4} sx={activityHeaderSx} color={'text.secondary'}>
            Status
          </Grid2>
          <Grid2 xs={1} sx={activityHeaderSx} color={'text.secondary'}>
            Txn
          </Grid2>
          {/* Content */}
          {state.activity.map((a: BridgeActivity, i: number) => {
            return (
              <Fragment key={`${a.tx}-${i}`}>
                <Grid2 xs={4} sx={activityRowSx}>
                  <BridgeAmount token={a.token} amount={a.amount} />
                </Grid2>
                <Grid2 xs={3} sx={activityRowSx}>
                  <BridgeRoute srcChain={a.srcChain} dstChain={a.dstChain} />
                </Grid2>
                <Grid2 xs={3} sx={activityRowSx}>
                  {intl.formatDate(new Date(a.timestamp))}
                </Grid2>
                <Grid2 xs={4} sx={activityRowSx}>
                  <BridgeStatus status={a.status} />
                </Grid2>
                <Grid2 xs={1} sx={activityRowSx}>
                  <Link
                    href={`https://etherscan.io/tx/${a.tx}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <FaArrowUpRightFromSquareRegular
                      sx={{
                        fontSize: 16,
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    />
                  </Link>
                </Grid2>
              </Fragment>
            );
          })}
        </Grid2>
      </CardContent>
    </Card>
  );
};

export const BridgeAmount = (props: { token: Token; amount: bigint }) => {
  const { formatAmount } = useFormat();
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={1}>
      <TokenIcon token={props.token} />
      <Box>{formatAmount(props.amount)}</Box>
    </Stack>
  );
};

export const BridgeRoute = (props: { srcChain: Chain; dstChain: Chain }) => (
  <Stack direction={'row'} spacing={'3px'} alignItems={'center'}>
    <ChainIcon chainId={props.srcChain.id} sx={{ height: 20 }} />
    <FaArrowRightRegular sx={{ height: 18 }} />
    <ChainIcon chainId={props.dstChain.id} sx={{ height: 20 }} />
  </Stack>
);

export const BridgeStatus = (props: {
  status: 'complete' | 'failed' | 'processing';
  eta?: number;
}) => {
  const intl = useIntl();
  if (props.status === 'complete') {
    return (
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <FaCircleCheckRegular
          sx={{
            color: '#66FE90AA',
            fontSize: 20,
          }}
        />
        <Box>{intl.formatMessage({ defaultMessage: 'Transferred' })}</Box>
      </Stack>
    );
  }
  if (props.status === 'processing') {
    return (
      <Box>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <FaLoaderDuotone
            sx={{
              color: '#FFD84E',
              fontSize: 20,
            }}
          />
          <Box>{intl.formatMessage({ defaultMessage: 'Processing' })}</Box>
        </Stack>
        <Box color={'text.secondary'}>~5 mins left</Box>
      </Box>
    );
  }
  if (props.status === 'failed') {
    return (
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <FaCircleExclamationRegular
          sx={{
            color: '#FF4E4E',
            fontSize: 20,
          }}
        />
        <Box>{intl.formatMessage({ defaultMessage: 'Failed' })}</Box>
      </Stack>
    );
  }
};
