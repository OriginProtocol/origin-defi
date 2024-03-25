import { Fragment, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  keyframes,
  Link,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ChainIcon, TokenIcon } from '@origin/shared/components';
import { getTokenByAddress } from '@origin/shared/contracts';
import {
  FaArrowRightRegular,
  FaArrowUpRightFromSquareRegular,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaLoaderDuotone,
} from '@origin/shared/icons';
import { getChain, useFormat } from '@origin/shared/providers';
import { useIntervalEffect } from '@react-hookz/web';
import { useIntl } from 'react-intl';
import { useConfig } from 'wagmi';

import { useBridgeActivity } from '../state/useBridgeActivity';

import type { SxProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

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
  const activity = useBridgeActivity();
  const config = useConfig();

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Bridging activity',
        })}
      />
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
            {intl.formatMessage({
              defaultMessage: 'Amount',
            })}
          </Grid2>
          <Grid2 xs={4} sm={3} sx={activityHeaderSx}>
            {intl.formatMessage({
              defaultMessage: 'Route',
            })}
          </Grid2>
          <Grid2 xs={3} sx={activityHeaderSx}>
            {intl.formatMessage({
              defaultMessage: 'Date',
            })}
          </Grid2>
          <Grid2
            xs={2}
            sm={4}
            sx={activityHeaderSx}
            textAlign={{ xs: 'center', sm: 'left' }}
          >
            {intl.formatMessage({
              defaultMessage: 'Status',
            })}
          </Grid2>
          <Grid2 xs={1} sm={1} sx={activityHeaderSx} textAlign={'center'}>
            {intl.formatMessage({
              defaultMessage: 'Tx',
            })}
          </Grid2>
        </Grid2>
      </CardContent>
      {/* Table Content */}
      <CardContent>
        {activity.data?.length === 0 && (
          <Stack alignItems={'center'}>
            <Typography>
              {intl.formatMessage({ defaultMessage: 'No activity yet.' })}
            </Typography>
          </Stack>
        )}
        {activity.isLoading && (
          <Stack alignItems={'center'}>
            <Skeleton width={120} />
          </Stack>
        )}
        <Grid2 container spacing={1} columns={15}>
          {activity.data?.map((a, i: number) => {
            const token = getTokenByAddress(a.chainIn, a.tokenIn);
            return (
              <Fragment key={`${a.messageId}-${i}`}>
                <Grid2 xs={5} sm={4} sx={activityContentSx}>
                  {token && (
                    <BridgeAmount token={token} amount={BigInt(a.amountIn)} />
                  )}
                </Grid2>
                <Grid2 xs={4} sm={3} sx={activityContentSx}>
                  <BridgeRoute
                    srcChain={getChain(config, a.chainIn)}
                    dstChain={getChain(config, a.chainOut)}
                  />
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
                  <BridgeStatus
                    state={a.state}
                    timestamp={Date.parse(a.timestamp)}
                  />
                </Grid2>
                <Grid2 xs={1} sx={activityContentSx} justifyContent={'center'}>
                  <Link
                    href={`https://ccip.chain.link/msg/${a.messageId}`}
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

export const BridgeRoute = (props: { srcChain?: Chain; dstChain?: Chain }) => (
  <Stack
    direction={'row'}
    spacing={{ xs: '3px', sm: '5px' }}
    alignItems={'center'}
  >
    <ChainIcon
      chainId={props.srcChain?.id}
      sx={{ fontSize: { xs: 14, sm: 20 } }}
    />
    <FaArrowRightRegular sx={{ height: { xs: 12, sm: 18 } }} />
    <ChainIcon
      chainId={props.dstChain?.id}
      sx={{ fontSize: { xs: 14, sm: 20 } }}
    />
  </Stack>
);

export const BridgeStatus = (props: {
  state?: 'complete' | 'failed' | 'processing' | 'untouched';
  timestamp: number;
}) => {
  const intl = useIntl();
  const [now, setNow] = useState(Date.now());
  const remaining = Math.floor(22 - (now - props.timestamp) / 60000);
  useIntervalEffect(
    () => {
      setNow(Date.now());
    },
    remaining > 0 ? 5000 : undefined,
  );

  const hideWhenXs: SxProps = { display: { xs: 'none', sm: 'inherit' } };
  if (props.state === 'complete') {
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
  if (props.state === 'untouched' || props.state === 'processing') {
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
              animation: `${spin} 1s linear infinite`,
            }}
          />
          <Box sx={hideWhenXs}>
            {intl.formatMessage({ defaultMessage: 'Processing' })}
          </Box>
        </Stack>
        {remaining > 0 && (
          <Box sx={hideWhenXs} color={'text.secondary'}>
            {intl.formatMessage(
              { defaultMessage: '~{remaining} mins left' },
              { remaining },
            )}
          </Box>
        )}
      </Box>
    );
  }
  if (props.state === 'failed') {
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
