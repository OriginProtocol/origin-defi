import { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  keyframes,
  Link,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { ChainIcon, TokenIcon } from '@origin/shared/components';
import { getTokenByAddress } from '@origin/shared/contracts';
import {
  FaArrowRightRegular,
  FaArrowUpRightFromSquareRegular,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaLoaderDuotone,
} from '@origin/shared/icons';
import { getChain } from '@origin/shared/providers';
import { formatAmount } from '@origin/shared/utils';
import { useIntervalEffect } from '@react-hookz/web';
import { defineMessage, useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';

import { useBridgeActivity } from '../hooks/useBridgeActivity';

import type { MessageDescriptor } from 'react-intl';
import type { Chain } from 'viem/chains';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const BridgeActivityCard = () => {
  const { address } = useAccount();
  const intl = useIntl();
  const [limit, setLimit] = useState(6);
  const activity = useBridgeActivity({ limit });

  useEffect(() => {
    setLimit(6);
  }, [address]);

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Bridging activity',
        })}
      />
      {!activity.data || activity.data?.length === 0 ? (
        <CardContent>
          <Stack alignItems={'center'} marginBottom={1}>
            <Typography>
              {intl.formatMessage({ defaultMessage: 'No activity' })}
            </Typography>
          </Stack>
        </CardContent>
      ) : activity.isLoading && !activity.data ? (
        <CardContent>
          <Stack alignItems={'center'} marginBottom={1}>
            <Skeleton width={120} />
          </Stack>
        </CardContent>
      ) : (
        <Stack>
          {activity.data?.slice(0, limit - 2).map((a, i: number) => {
            return <BridgeTransfer key={`${a.messageId}-${i}`} activity={a} />;
          })}
          {limit <= activity.data?.length && (
            <CardContent>
              <Stack alignItems={'center'}>
                <Button
                  onClick={() => {
                    setLimit(limit + 2);
                  }}
                >
                  Show more
                </Button>
              </Stack>
            </CardContent>
          )}
        </Stack>
      )}
    </Card>
  );
};

const messaging: Record<
  ReturnType<typeof useBridgeActivity>['data'][number]['state'],
  {
    title: MessageDescriptor;
    subTitle: MessageDescriptor;
  }
> = {
  untouched: {
    title: defineMessage({ defaultMessage: 'Bridging' }),
    subTitle: defineMessage({ defaultMessage: 'Waiting for CCIP' }),
  },
  processing: {
    title: defineMessage({ defaultMessage: 'Bridging' }),
    subTitle: defineMessage({ defaultMessage: 'Waiting for CCIP' }),
  },
  complete: {
    title: defineMessage({ defaultMessage: 'Bridged' }),
    subTitle: defineMessage({ defaultMessage: 'Bridged' }),
  },
  failed: {
    title: defineMessage({ defaultMessage: 'Bridge failed' }),
    subTitle: defineMessage({ defaultMessage: 'Check CCIP for details' }),
  },
};

function StatusIcon(props: {
  state: ReturnType<typeof useBridgeActivity>['data'][number]['state'];
}) {
  return props.state === 'complete' ? (
    <FaCircleCheckRegular sx={{ color: 'success.main', fontSize: 14 }} />
  ) : props.state === 'failed' ? (
    <FaCircleExclamationRegular
      sx={{
        color: 'error.main',
        fontSize: 14,
      }}
    />
  ) : (
    <FaLoaderDuotone
      sx={{
        color: '#FFD84E',
        fontSize: 18,
        animation: `${spin} 1s linear infinite`,
      }}
    />
  );
}

export const BridgeTransfer = ({
  activity,
}: {
  activity: ReturnType<typeof useBridgeActivity>['data'][number];
}) => {
  const intl = useIntl();
  const config = useConfig();
  const token = getTokenByAddress(activity.tokenIn, activity.chainIn);
  const { title, subTitle } = messaging[activity.state];
  return (
    <CardContent
      sx={{ borderBottom: 'solid 1px', borderBottomColor: 'divider' }}
    >
      <Stack spacing={2} width={1}>
        <Stack direction={'row'} spacing={2} width={1}>
          <TokenIcon token={token} sx={{ fontSize: 40 }} />
          <Stack width={1} spacing={0.25}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography>{intl.formatMessage(title)}</Typography>
              <Typography>
                {formatAmount(activity.amountOut)} {token?.symbol}
              </Typography>
            </Stack>
            <BridgeRoute
              srcChain={getChain(config, activity.chainIn)}
              dstChain={getChain(config, activity.chainOut)}
            />
          </Stack>
        </Stack>
        <Stack direction={'row'} width={1}>
          <Stack
            direction={'row'}
            spacing={0.5}
            alignItems={'center'}
            width={1}
          >
            <StatusIcon state={activity.state} />
            <Typography fontSize={12}>
              {intl.formatMessage(subTitle)}
            </Typography>
            <Link
              href={`https://ccip.chain.link/msg/${activity.messageId}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <FaArrowUpRightFromSquareRegular
                sx={{
                  fontSize: 12,
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              />
            </Link>
          </Stack>
          <Eta
            state={activity.state}
            timestamp={Date.parse(activity.timestamp)}
          />
        </Stack>
      </Stack>
    </CardContent>
  );
};

export const BridgeRoute = (props: { srcChain?: Chain; dstChain?: Chain }) => (
  <Stack
    direction={'row'}
    spacing={{ xs: '3px' }}
    alignItems={'center'}
    color={'text.secondary'}
  >
    <ChainIcon chainId={props.srcChain?.id} sx={{ fontSize: 14 }} />
    <Typography fontSize={12}>{props.srcChain?.name}</Typography>
    <FaArrowRightRegular sx={{ height: 12 }} />
    <ChainIcon chainId={props.dstChain?.id} sx={{ fontSize: 14 }} />
    <Typography fontSize={12}>{props.dstChain?.name}</Typography>
  </Stack>
);

export const Eta = (props: {
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
  if (props.state === 'untouched' || props.state === 'processing') {
    return (
      <Stack
        direction={'row'}
        width={1}
        spacing={1}
        justifyContent={'flex-end'}
      >
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          {remaining > 0 && (
            <Typography color={'text.secondary'} fontSize={12}>
              {intl.formatMessage(
                { defaultMessage: '~{remaining} mins left' },
                { remaining },
              )}
            </Typography>
          )}
        </Stack>
      </Stack>
    );
  }
  return null;
};
