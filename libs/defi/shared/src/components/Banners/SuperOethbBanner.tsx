import { Button, Stack, Typography } from '@mui/material';
import {
  InfoTooltip,
  LoadingLabel,
  NetworkIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { base } from 'viem/chains';

import { useTokenInfo } from '../../hooks';

import type { StackProps } from '@mui/material';

export const SuperOethbBanner = (props: StackProps) => {
  const intl = useIntl();
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(
    tokens.base.superOETHb,
  );

  return (
    <Stack
      {...props}
      sx={[
        {
          borderRadius: 4,
          background: `linear-gradient(90deg, rgba(34, 141, 239, 0.50) -28.99%, rgba(0, 82, 255, 0.50) 144.97%), #0B59A6`,
          overflow: 'hidden',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        sx={{
          alignItems: { xs: 'flex-start', md: 'center' },
          px: { xs: 2, md: 4 },
          py: 3,
          overflow: 'hidden',
          color: 'primary.contrastText',
          backgroundImage: `url('/images/base-icon.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: {
            xs: 'right -300px center',
            sm: 'right -300px center',
            md: 'right -50px center',
          },
          backgroundSize: { xs: 400, md: 200 },
          backgroundBlendMode: 'darken',
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 3, sm: 2 }}
          sx={{
            alignItems: { xs: 'flex-start', lg: 'center' },
            width: 1,
          }}
        >
          <Stack direction="row" spacing={{ xs: 1, md: 3 }}>
            <NetworkIcon chainId={base.id} outlined size={48} />
            <Stack>
              <Typography
                noWrap
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Super OETH now available on BASE!',
                })}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'baseline',
                }}
              >
                <LoadingLabel
                  isLoading={isInfoLoading}
                  variant="featured2"
                  sx={[
                    {
                      textUnderlineOffset: 4,
                      fontWeight: 'bold',
                    },
                    isInfoLoading
                      ? {
                          textDecoration: 'none',
                        }
                      : {
                          textDecoration: 'underline',
                        },
                  ]}
                >
                  {intl.formatNumber(info?.bestApy.value ?? 0, {
                    style: 'percent',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </LoadingLabel>
                <Stack
                  direction="row"
                  alignItems="center"
                  useFlexGap
                  spacing={0.25}
                >
                  <Typography>APY</Typography>
                  <InfoTooltip
                    iconColor="inherit"
                    tooltipLabel={intl.formatMessage(
                      {
                        defaultMessage: '{trailingDays}-day trailing APY',
                      },
                      { trailingDays: info?.bestApy?.trailingDays },
                    )}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Typography>
            {intl.formatMessage({
              defaultMessage:
                'Mint superOETHb to maximize your ETH position. Super OETH combines Ethereum liquid staking yield with Aerodrome rewards.',
            })}
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: 'row', sm: 'column', lg: 'row' }}
          spacing={1}
          sx={{
            width: { xs: 1, sm: 0.4 },
          }}
        >
          <Button
            fullWidth
            component={RouterLink}
            to="/super"
            color="secondary"
            size="large"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {intl.formatMessage({ defaultMessage: 'Get Super OETH' })}
          </Button>
          <Button
            fullWidth
            href="https://www.originprotocol.com/super-oeth-live-on-base"
            target="_blank"
            rel="noopener noreferrer nofollow"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ color: 'primary.contrastText', whiteSpace: 'nowrap' }}
          >
            {intl.formatMessage({ defaultMessage: 'Learn more' })}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
