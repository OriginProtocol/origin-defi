import { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  keyframes,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {
  ExternalLink,
  NetworkIcon,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenByAddress } from '@origin/shared/contracts';
import {
  FaArrowRightRegular,
  FaCircleCheckRegular,
  FaCircleExclamationRegular,
  FaLoaderDuotone,
} from '@origin/shared/icons';
import { getChain } from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { useIntervalEffect } from '@react-hookz/web';
import { format } from 'dnum';
import { defineMessage, useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';

import { useBridgeActivity } from '../hooks/useBridgeActivity';

import type { SupportedChain } from '@origin/shared/components';
import type { Dnum } from 'dnum';
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
      <Divider />
      {!activity.data || activity.data?.length === 0 ? (
        <CardContent>
          <Stack
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: 'text.secondary',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'No activity' })}
            </Typography>
          </Stack>
        </CardContent>
      ) : activity.isLoading && !activity.data ? (
        <CardContent>
          <Stack
            sx={{
              alignItems: 'center',
            }}
          >
            <Skeleton width={120} />
          </Stack>
        </CardContent>
      ) : (
        <Stack divider={<Divider />}>
          {activity.data?.slice(0, limit - 2).map((a, i: number) => {
            return <BridgeTransfer key={`${a.messageId}-${i}`} activity={a} />;
          })}
          {limit <= activity.data?.length && (
            <CardContent>
              <Stack
                sx={{
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setLimit(limit + 2);
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Show more' })}
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

  const amt = [BigInt(activity?.amountOut ?? 0), token?.decimals ?? 18] as Dnum;

  return (
    <CardContent>
      <Stack
        spacing={1.5}
        sx={{
          width: 1,
        }}
      >
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            width: 1,
          }}
        >
          <TokenIcon token={token} sx={{ fontSize: 40 }} />
          <Stack
            spacing={0.5}
            sx={{
              width: 1,
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {intl.formatMessage(title)}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {format(amt, {
                  digits: getFormatPrecision(amt),
                  decimalsRounding: 'ROUND_DOWN',
                })}
                &nbsp;
                {token?.symbol}
              </Typography>
            </Stack>
            <BridgeRoute
              srcChain={getChain(config, activity.chainIn)}
              dstChain={getChain(config, activity.chainOut)}
            />
          </Stack>
        </Stack>
        <Stack
          direction={'row'}
          sx={{
            width: 1,
          }}
        >
          <Stack
            direction={'row'}
            spacing={0.75}
            sx={{
              alignItems: 'center',
              width: 1,
            }}
          >
            <StatusIcon state={activity.state} />
            <ExternalLink
              href={`https://ccip.chain.link/msg/${activity.messageId}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              variant="caption2"
            >
              {intl.formatMessage(subTitle)}
            </ExternalLink>
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
    spacing={0.5}
    sx={{
      alignItems: 'center',
      color: 'text.secondary',
    }}
  >
    <NetworkIcon
      chainId={props.srcChain?.id as SupportedChain}
      size={16}
      sx={{ mr: 0.5 }}
    />
    <Typography
      sx={{
        fontSize: 12,
      }}
    >
      {props.srcChain?.name}
    </Typography>
    <FaArrowRightRegular sx={{ height: 12 }} />
    <NetworkIcon
      chainId={props.dstChain?.id as SupportedChain}
      size={16}
      sx={{ mr: 0.5 }}
    />
    <Typography
      sx={{
        fontSize: 12,
      }}
    >
      {props.dstChain?.name}
    </Typography>
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
        spacing={1}
        sx={{
          width: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Stack
          direction={'row'}
          spacing={1}
          sx={{
            alignItems: 'center',
          }}
        >
          {remaining > 0 && (
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: 12,
              }}
            >
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
