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

const activityHeaderSx: SxProps = {
  color: 'text.secondary',
};
const activityContentSx: SxProps = {
  height: { xs: 40, sm: 56 },
  fontSize: '.75rem',
  display: 'flex',
  alignItems: 'center',
};
export const BridgeActivityCard = () => {
  const intl = useIntl();
  const { state } = useBridgeState();
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={'Bridging activity'} />
      {/* Table Header */}
      <CardContent
        sx={{
          paddingY: 2,
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: 'divider',
        }}
      >
        <Grid2 container spacing={1} columns={15}>
          <Grid2 xs={5} sm={4} sx={activityHeaderSx}>
            Amount
          </Grid2>
          <Grid2 xs={4} sm={3} sx={activityHeaderSx}>
            Route
          </Grid2>
          <Grid2 xs={3} sx={activityHeaderSx}>
            Date
          </Grid2>
          <Grid2
            xs={2}
            sm={4}
            sx={activityHeaderSx}
            textAlign={{ xs: 'center', sm: 'left' }}
          >
            Status
          </Grid2>
          <Grid2 xs={1} sm={1} sx={activityHeaderSx} textAlign={'center'}>
            Tx
          </Grid2>
        </Grid2>
      </CardContent>
      {/* Table Content */}
      <CardContent>
        <Grid2 container spacing={1} columns={15}>
          {state.activity.map((a: BridgeActivity, i: number) => {
            return (
              <Fragment key={`${a.tx}-${i}`}>
                <Grid2 xs={5} sm={4} sx={activityContentSx}>
                  <BridgeAmount token={a.token} amount={a.amount} />
                </Grid2>
                <Grid2 xs={4} sm={3} sx={activityContentSx}>
                  <BridgeRoute srcChain={a.srcChain} dstChain={a.dstChain} />
                </Grid2>
                <Grid2 xs={3} sx={activityContentSx}>
                  {intl.formatDate(new Date(a.timestamp))}
                </Grid2>
                <Grid2
                  xs={2}
                  sm={4}
                  sx={activityContentSx}
                  justifyContent={{ xs: 'center', sm: 'left' }}
                >
                  <BridgeStatus status={a.status} />
                </Grid2>
                <Grid2 xs={1} sx={activityContentSx} justifyContent={'center'}>
                  <Link
                    href={`https://ccip.chain.link/msg/${a.tx}`}
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
  <Stack
    direction={'row'}
    spacing={{ xs: '1px', sm: '3px' }}
    alignItems={'center'}
  >
    <ChainIcon
      chainId={props.srcChain.id}
      sx={{ height: { xs: 14, sm: 20 } }}
    />
    <FaArrowRightRegular sx={{ height: { xs: 12, sm: 18 } }} />
    <ChainIcon
      chainId={props.dstChain.id}
      sx={{ height: { xs: 14, sm: 20 } }}
    />
  </Stack>
);

export const BridgeStatus = (props: {
  status: 'complete' | 'failed' | 'processing';
  eta?: number;
}) => {
  const intl = useIntl();
  const hideWhenXs: SxProps = { display: { xs: 'none', sm: 'inherit' } };
  if (props.status === 'complete') {
    return (
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1}
        justifyContent={{ xs: 'center', sm: 'left' }}
      >
        <FaCircleCheckRegular
          sx={{
            color: '#66FE90AA',
            fontSize: 20,
          }}
        />
        <Box sx={hideWhenXs}>
          {intl.formatMessage({ defaultMessage: 'Transferred' })}
        </Box>
      </Stack>
    );
  }
  if (props.status === 'processing') {
    return (
      <Box>
        <Stack
          direction={'row'}
          alignItems={'center'}
          spacing={1}
          justifyContent={{ xs: 'center', sm: 'left' }}
        >
          <FaLoaderDuotone
            sx={{
              color: '#FFD84E',
              fontSize: 20,
            }}
          />
          <Box sx={hideWhenXs}>
            {intl.formatMessage({ defaultMessage: 'Processing' })}
          </Box>
        </Stack>
        <Box sx={hideWhenXs} color={'text.secondary'}>
          ~5 mins left
        </Box>
      </Box>
    );
  }
  if (props.status === 'failed') {
    return (
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1}
        justifyContent={{ xs: 'center', sm: 'left' }}
      >
        <FaCircleExclamationRegular
          sx={{
            color: '#FF4E4E',
            fontSize: 20,
          }}
        />
        <Box sx={hideWhenXs}>
          {intl.formatMessage({ defaultMessage: 'Failed' })}
        </Box>
      </Stack>
    );
  }
};
