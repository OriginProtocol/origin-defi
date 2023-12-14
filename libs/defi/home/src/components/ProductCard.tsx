import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Chip, Mix, ValueLabel } from '@origin/shared/components';
import { useFormat, usePrices } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { useTokenInfo } from '../hooks';

import type { StackProps } from '@mui/material';

import type { products } from '../constants';

export type ProductCardProps = {
  product: (typeof products)[0];
  href?: string;
} & StackProps;

export const ProductCard = ({ product, href, ...rest }: ProductCardProps) => {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const navigate = useNavigate();
  const { data: prices, isLoading: isPricesLoading } = usePrices();
  const { data: queryData, isLoading: isQueryDataLoading } = useTokenInfo(
    product.token,
  );

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
            intl.formatNumber(queryData.apy30DayAvg, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              style: 'percent',
            })
          )}
        </Typography>
      </Stack>
      <Stack pt={3} pb={6} px={3} flexGrow={1}>
        {!isNilOrEmpty(href) && (
          <Button
            onClick={() => {
              navigate(href);
            }}
            variant="outlined"
            sx={{ height: 56, fontSize: 16 }}
          >
            {intl.formatMessage(
              { defaultMessage: 'Get {symbol}' },
              { symbol: product.token.symbol },
            )}
          </Button>
        )}
      </Stack>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'TVL' })}
          value={formatCurrency(queryData.tvl)}
          isLoading={isQueryDataLoading}
          sx={{
            width: 0.33,
            py: 2,
          }}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Current price' })}
          value={formatCurrency(prices[product.token.symbol])}
          isLoading={isPricesLoading}
          sx={{
            width: 0.33,
            py: 2,
          }}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Collateral' })}
          value={<Mix imgSrc={product.collaterals.map((t) => t.icon)} />}
          sx={{
            width: 0.33,
            py: 2,
          }}
        />
      </Stack>
    </Stack>
  );
};
