import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Chip, Mix } from '@origin/shared/components';
import { usePrices } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useProductCardQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

import type { products } from '../constants';

export type ProductCardProps = { product: (typeof products)[0] } & StackProps;

export const ProductCard = ({ product, ...rest }: ProductCardProps) => {
  const intl = useIntl();
  const { data: prices, isLoading: isPricesLoading } = usePrices();
  const { data: queryData, isLoading: isQueryDataLoading } =
    useProductCardQuery();

  const apy =
    product.token.symbol === 'OETH'
      ? queryData?.oethDailyStats?.[0]?.apy30DayAvg ?? 0
      : 0;
  const tvl =
    product.token.symbol === 'OETH'
      ? +formatUnits(
          queryData?.oethDailyStats?.[0]?.strategies?.reduce(
            (acc, curr) => acc + BigInt(curr.tvl),
            0n,
          ) ?? 0n,
          product.token.decimals,
        )
      : 0;

  return (
    <Stack
      {...rest}
      sx={{
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        ...rest?.sx,
      }}
    >
      <Stack
        direction="row"
        sx={{ backgroundColor: 'background.header', px: 3, pt: 3 }}
      >
        {product.tags.map((tag) => (
          <Chip
            key={intl.formatMessage(tag.label)}
            label={intl.formatMessage(tag.label)}
            icon={tag.icon}
          />
        ))}
      </Stack>
      <Stack sx={{ position: 'relative', p: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 0.5,
            backgroundColor: 'background.header',
            zIndex: 0,
          }}
        />
        <Box
          component="img"
          src={product.token.icon}
          sx={{ width: 68, height: 68, zIndex: 1 }}
        />
      </Stack>
      <Stack px={3}>
        <Typography
          variant="h1"
          sx={{ '.symbol': { color: 'text.secondary', fontWeight: '500' } }}
        >
          {product.token.name}&nbsp;
          <span className="symbol">({product.token.symbol})</span>
        </Typography>
        <Typography variant="subtitle1">
          {intl.formatMessage(product.description)}
        </Typography>
      </Stack>
      <Stack p={3}>
        <Typography color="text.secondary" fontSize={14}>
          {intl.formatMessage({ defaultMessage: 'APY (Trailing 30-day)' })}
        </Typography>
        <Typography
          sx={{ fontSize: 32, fontFamily: 'Sailec', fontWeight: 700 }}
        >
          {isQueryDataLoading ? (
            <Skeleton width={80} />
          ) : (
            intl.formatNumber(apy, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              style: 'percent',
            })
          )}
        </Typography>
      </Stack>
      <Stack pt={3} pb={6} px={3} flexGrow={1}>
        <Button variant="outlined" sx={{ height: 56, fontSize: 16 }}>
          {intl.formatMessage(
            { defaultMessage: 'Get {symbol}' },
            { symbol: product.token.symbol },
          )}
        </Button>
      </Stack>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <BottomTile
          label={intl.formatMessage({ defaultMessage: 'TVL' })}
          value={
            isQueryDataLoading ? (
              <Skeleton width={60} height={24} />
            ) : (
              intl.formatNumber(tvl, {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
              })
            )
          }
        />
        <BottomTile
          label={intl.formatMessage({ defaultMessage: 'Current price' })}
          value={
            isPricesLoading ? (
              <Skeleton width={60} height={24} />
            ) : (
              intl.formatNumber(prices[product.token.symbol], {
                style: 'currency',
                currency: 'USD',
              })
            )
          }
        />
        <BottomTile
          label={intl.formatMessage({ defaultMessage: 'Collateral' })}
          value={<Mix imgSrc={product.collaterals.map((t) => t.icon)} />}
        />
      </Stack>
    </Stack>
  );
};

type BottomTileProps = {
  label: string;
  value: ReactNode;
};

function BottomTile({ label, value }: BottomTileProps) {
  return (
    <Stack
      sx={{
        width: 0.33,
        alignItems: 'center',
        py: 2,
        gap: 1,
      }}
    >
      <Typography color="text.secondary">{label}</Typography>
      {typeof value === 'string' ? <Typography>{value}</Typography> : value}
    </Stack>
  );
}