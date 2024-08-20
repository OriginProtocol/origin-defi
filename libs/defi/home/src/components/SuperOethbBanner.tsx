import { Button, Stack, Typography } from '@mui/material';
import { useTokenInfo } from '@origin/defi/shared';
import { LoadingLabel, NetworkIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { base } from 'viem/chains';

import type { StackProps } from '@mui/material';

export const SuperOethbBanner = (props: StackProps) => {
  const intl = useIntl();
  const { apy, isLoading } = useTokenInfo({ token: tokens.base.superOETHb });

  return (
    <Stack
      {...props}
      sx={{
        borderRadius: 4,
        background: `linear-gradient(90deg, rgba(34, 141, 239, 0.50) -28.99%, rgba(0, 82, 255, 0.50) 144.97%), #0B59A6`,
        overflow: 'hidden',
        ...props?.sx,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={3}
        sx={{
          px: 4,
          py: 3,
          overflow: 'hidden',
          color: 'primary.contrastText',
          backgroundImage: `url('/images/base-icon.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: {
            xs: 'right -200px center',
            md: '100% center',
          },
          backgroundSize: { xs: 400, md: 200 },
          backgroundBlendMode: 'darken',
        }}
      >
        <Stack direction="row" spacing={3}>
          <NetworkIcon chainId={base.id} outlined size={48} />
          <Stack>
            <Typography fontWeight="medium" noWrap>
              {intl.formatMessage({
                defaultMessage: 'Super OETH now available on BASE!',
              })}
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="featured2" fontWeight="bold">
                {intl.formatMessage({
                  defaultMessage: 'Earn',
                })}
              </Typography>
              <LoadingLabel
                isLoading={isLoading}
                variant="featured2"
                fontWeight="bold"
                sx={{ textDecoration: isLoading ? 'none' : 'underline' }}
              >
                {intl.formatNumber(apy ?? 0, {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </LoadingLabel>
              <Typography>APY</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Typography width={1}>
          {intl.formatMessage({
            defaultMessage:
              'Mint superOETHb to maximize your ETH position. Super OETH combines Ethereum liquid staking yield with Aerodrome rewards.',
          })}
        </Typography>
        <Stack direction="row" spacing={1} width={1}>
          <Button
            fullWidth
            component={RouterLink}
            to="/oeth"
            color="secondary"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {intl.formatMessage({ defaultMessage: 'Get Super OETH' })}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ color: 'primary.contrastText', whiteSpace: 'nowrap' }}
          >
            {intl.formatMessage({ defaultMessage: 'Learn more' })}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
