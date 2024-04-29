import { Button, Card, Collapse, Stack, Typography } from '@mui/material';
import { ChainsChip, useOTokenApyQuery } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { useFormat, useTvl, useWatchBalance } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';
import type { Product } from '@origin/defi/shared';

export type ProductCardProps = {
  product: Product;
} & CardProps;

export const ProductCard = ({ product, ...rest }: ProductCardProps) => {
  const intl = useIntl();
  const { formatBalance, formatCurrency } = useFormat();
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: product.token,
  });
  const { data: tvl, isLoading: isTvlLoading } = useTvl(product.token);
  const { data: apy, isLoading: isApyLoading } = useOTokenApyQuery(
    { token: product.token.address, chainId: mainnet.id },
    {
      enabled: isConnected,
      select: (data) => {
        return data?.oTokenApies[0].apy30DayAvg ?? 0;
      },
    },
  );

  return (
    <Card
      {...rest}
      sx={{
        backgroundColor: 'background.highlight',
        backgroundImage: `url(${product.icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: product.iconSize,
        backgroundPosition: 'top right',
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        ...rest?.sx,
      }}
    >
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
        <Stack direction="row" spacing={1} alignItems="baseline">
          <LoadingLabel
            isLoading={isApyLoading}
            variant="featured1"
            color="primary"
            fontWeight="bold"
          >
            {intl.formatNumber(apy ?? 0, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              style: 'percent',
            })}
          </LoadingLabel>
          <Typography variant="body2" color="primary">
            {intl.formatMessage({ defaultMessage: 'APY' })}
          </Typography>
        </Stack>
        <LoadingLabel isLoading={isTvlLoading} sWidth={60}>
          {intl.formatMessage(
            { defaultMessage: 'TVL: {tvl}' },
            {
              tvl: formatCurrency(tvl, undefined, undefined, {
                notation: 'compact',
                minimumFractionDigits: 2,
              }),
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
      >
        <Button
          size="large"
          onClick={() => {
            navigate(product.href);
          }}
        >
          {intl.formatMessage(
            { defaultMessage: 'Get {symbol}' },
            { symbol: product.token.symbol },
          )}
        </Button>
        {!isNilOrEmpty(product.supportedChainIds) && (
          <ChainsChip chainIds={product.supportedChainIds} />
        )}
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
            labelProps={{ variant: 'mono', color: 'text.secondary' }}
            value={intl.formatMessage(
              { defaultMessage: '{balance} {symbol}' },
              {
                balance: formatBalance(balance),
                symbol: product.token.symbol,
              },
            )}
            isLoading={isBalanceLoading}
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Yield earned:' })}
            labelProps={{ variant: 'mono', color: 'text.secondary' }}
            value={intl.formatMessage(
              { defaultMessage: '{balance} {symbol}' },
              { balance: 2.375, symbol: product.token.symbol },
            )}
          />
        </Stack>
      </Collapse>
    </Card>
  );
};
