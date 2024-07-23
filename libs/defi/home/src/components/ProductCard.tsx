import {
  Box,
  Button,
  Card,
  Collapse,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useOTokenAddressQuery, useOTokenApyQuery } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { FaArrowRightRegular, FaCircleInfoRegular } from '@origin/shared/icons';
import { useTvl } from '@origin/shared/providers';
import {
  formatAmount,
  getFormatPrecision,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';
import type { Dnum } from 'dnum';

import type { Product } from '../constants';

export type ProductCardProps = {
  product: Product;
} & CardProps;

export const ProductCard = ({ product, ...rest }: ProductCardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: tvl, isLoading: isTvlLoading } = useTvl(product.token);
  const { data: apies, isLoading: isApiesLoading } = useOTokenApyQuery(
    { token: product.token.address, chainId: product.token.chainId },
    {
      select: (data) => {
        return data?.oTokenApies[0];
      },
    },
  );
  const { data: user, isLoading: isUserLoading } = useOTokenAddressQuery(
    {
      token: product.token.address,
      chainId: product.token.chainId,
      address: address ?? ZERO_ADDRESS,
    },
    { enabled: isConnected, select: (data) => data?.oTokenAddresses?.[0] },
  );

  const bal = [BigInt(user?.balance ?? 0), product.token.decimals] as Dnum;
  const { apy, tooltip } =
    (apies?.apy30DayAvg ?? 0) > (apies?.apy7DayAvg ?? 0)
      ? {
          apy: apies?.apy30DayAvg,
          tooltip: intl.formatMessage({
            defaultMessage: '30-day trailing APY',
          }),
        }
      : {
          apy: apies?.apy7DayAvg,
          tooltip: intl.formatMessage({
            defaultMessage: '7-day trailing APY',
          }),
        };

  return (
    <Card
      {...rest}
      sx={{
        position: 'relative',
        backgroundColor: 'background.highlight',
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        ...rest?.sx,
      }}
    >
      <Box
        component="img"
        src={product.icon}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: product.iconSize,
          mask: `url(${product.icon})`,
          backgroundColor: product.bgcolor,
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography variant="h6" pb={1}>
          {product.token.name}
        </Typography>
        <TokenIcon
          token={product.token}
          sx={{ fontSize: 56, zIndex: 1 }}
          outlined
        />
      </Stack>
      <Typography variant="featured3" mb={2}>
        ({product.token.symbol})
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <FaArrowRightRegular sx={{ fontSize: 16 }} />
        <Typography variant="mono">
          {intl.formatMessage(product.description)}
        </Typography>
      </Stack>
      <Stack py={3} spacing={1}>
        <Tooltip title={tooltip}>
          <Stack direction="row" alignItems="baseline">
            <LoadingLabel
              isLoading={isApiesLoading}
              variant="featured1"
              color="primary"
              fontWeight="bold"
              mr={1}
            >
              {intl.formatNumber(apy ?? 0, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                style: 'percent',
              })}
            </LoadingLabel>
            <Typography variant="body2" color="primary.main" mr={0.5}>
              {intl.formatMessage({ defaultMessage: 'APY' })}
            </Typography>
            <FaCircleInfoRegular sx={{ fontSize: 14, color: 'primary.main' }} />
          </Stack>
        </Tooltip>
        <LoadingLabel isLoading={isTvlLoading} sWidth={60}>
          {intl.formatMessage(
            { defaultMessage: 'TVL: {tvl}' },
            {
              tvl: `$${format(tvl ?? from(0), { digits: 2, compact: true })}`,
            },
          )}
        </LoadingLabel>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        pb={3}
        flexGrow={1}
        spacing={2}
      >
        <Button
          size="large"
          fullWidth
          component={RouterLink}
          to={product.href}
          sx={{ flexWrap: 'nowrap' }}
        >
          {intl.formatMessage(
            { defaultMessage: 'Get {symbol}' },
            { symbol: product.token.symbol },
          )}
        </Button>
      </Stack>
      <Collapse in={isConnected}>
        <Stack
          spacing={2}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 4,
          }}
        >
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Your balance:' })}
            labelProps={{
              variant: 'body3',
              fontWeight: 'medium',
              color: 'text.secondary',
            }}
            value={
              <Stack direction="row" alignItems="baseline" spacing={0.75}>
                <LoadingLabel isLoading={isUserLoading} fontWeight="medium">
                  {format(bal, getFormatPrecision(bal))}
                </LoadingLabel>
                <Typography variant="caption1">
                  {product.token.symbol}
                </Typography>
              </Stack>
            }
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Yield earned:' })}
            labelProps={{
              variant: 'body3',
              fontWeight: 'medium',
              color: 'text.secondary',
            }}
            value={
              <Stack direction="row" alignItems="baseline" spacing={0.75}>
                <LoadingLabel isLoading={isUserLoading} fontWeight="medium">
                  {formatAmount(BigInt(user?.earned ?? '0'))}
                </LoadingLabel>
                <Typography variant="caption1">
                  {product.token.symbol}
                </Typography>
              </Stack>
            }
          />
        </Stack>
      </Collapse>
    </Card>
  );
};
