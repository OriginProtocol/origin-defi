import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  InfoTooltip,
  LoadingLabel,
  MultiTokenIcon,
  SliderSwitch,
} from '@origin/shared/components';
import { OETH_ANALYTICS_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import {
  AuraFull,
  BalancerFull,
  ConvexFull,
  CurveFull,
  FaArrowUpRightRegular,
  FraxFull,
  LidoFull,
  MorphoFull,
  RocketpoolFull,
} from '@origin/shared/icons';
import { useFormat, useTokenPrices } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useReadContract } from 'wagmi';

import { useOethApyQuery } from '../queries.generated';

import type { CardContentProps, TypographyProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

export const OethDetailCard = () => {
  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'OETH details' })}
      />
      <Stack divider={<Divider />}>
        <Apy />
        <Price />
        <Tvl />
        <Collateral />
        <YieldSource />
        <CardContent>
          <Button
            color="inherit"
            fullWidth
            href={OETH_ANALYTICS_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            sx={{ height: 44, px: 3 }}
          >
            {intl.formatMessage({ defaultMessage: 'OETH analytics' })}&nbsp;
            <FaArrowUpRightRegular />
          </Button>
        </CardContent>
      </Stack>
    </Card>
  );
};

function Apy() {
  const intl = useIntl();
  const once = useRef(false);
  const [trailing, setTrailing] = useState(30);
  const { data: apy, isLoading: apyLoading } = useOethApyQuery(undefined, {
    select: (data) => data.oethapies[0],
  });
  const trailingOptions: Option[] = useMemo(
    () => [
      {
        label: intl.formatMessage({ defaultMessage: '30d' }),
        value: 30,
      },
      { label: intl.formatMessage({ defaultMessage: '7d' }), value: 7 },
    ],
    [intl],
  );

  useEffect(() => {
    if (!once.current && !apyLoading && apy?.apy30DayAvg && apy?.apy7DayAvg) {
      setTrailing(
        trailingOptions[apy?.apy30DayAvg > apy?.apy7DayAvg ? 0 : 1]
          .value as number,
      );
      once.current = true;
    }
  }, [apy?.apy30DayAvg, apy?.apy7DayAvg, apyLoading, trailingOptions]);

  const handleTrailingChange = (newVal: string | number) => {
    setTrailing(newVal as number);
  };

  return (
    <CardContent {...cardContentProps}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography {...labelProps}>
          {intl.formatMessage({ defaultMessage: 'APY' })}
        </Typography>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'Annual Percentage Yield',
          })}
        />
        <SliderSwitch
          options={trailingOptions}
          value={trailing}
          onChange={handleTrailingChange}
        />
      </Stack>
      <LoadingLabel isLoading={apyLoading} {...valueProps}>
        {intl.formatNumber(
          trailing === 30 ? apy?.apy30DayAvg ?? 0 : apy?.apy7DayAvg ?? 0,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'percent',
          },
        )}
      </LoadingLabel>
    </CardContent>
  );
}

function Price() {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const { data: prices, isLoading: isPricesLoading } = useTokenPrices([
    'OETH_USD',
  ]);

  return (
    <CardContent {...cardContentProps}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography {...labelProps}>
          {intl.formatMessage({ defaultMessage: 'Price' })}
        </Typography>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'OETH price',
          })}
        />
      </Stack>
      <LoadingLabel isLoading={isPricesLoading} {...valueProps}>
        {formatCurrency(prices?.OETH_USD)}
      </LoadingLabel>
    </CardContent>
  );
}

function Tvl() {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useReadContract({
      address: tokens.mainnet.OETH.address,
      abi: tokens.mainnet.OETH.abi,
      functionName: 'totalSupply',
    });
  const { data: prices, isLoading: isPricesLoading } = useTokenPrices([
    'OETH_USD',
  ]);

  const tvl =
    +formatUnits(totalSupply ?? 0n, tokens.mainnet.OETH.decimals) *
    (prices?.OETH_USD ?? 0);

  return (
    <CardContent {...cardContentProps}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography {...labelProps}>
          {intl.formatMessage({ defaultMessage: 'TVL' })}
        </Typography>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'Total Value Locked',
          })}
        />
      </Stack>
      <LoadingLabel
        isLoading={isPricesLoading || isTotalSupplyLoading}
        {...valueProps}
      >
        {formatCurrency(tvl)}
      </LoadingLabel>
    </CardContent>
  );
}

function Collateral() {
  const intl = useIntl();

  return (
    <CardContent {...cardContentProps}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography {...labelProps}>
          {intl.formatMessage({ defaultMessage: 'Backing collateral' })}
        </Typography>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'Underlyings assets',
          })}
        />
      </Stack>
      <MultiTokenIcon
        zOrder="last"
        spacing={4}
        tokens={[
          tokens.mainnet.ETH,
          tokens.mainnet.rETH,
          tokens.mainnet.stETH,
          tokens.mainnet.frxETH,
        ]}
      />
    </CardContent>
  );
}

function YieldSource() {
  const intl = useIntl();

  return (
    <CardContent {...cardContentProps}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography {...labelProps}>
          {intl.formatMessage({ defaultMessage: 'Yield sources' })}
        </Typography>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'Yield strategy protocols',
          })}
        />
      </Stack>
      <Stack
        spacing={3}
        alignItems="flex-start"
        sx={{ pt: 1, svg: { height: 20, width: 'auto' } }}
      >
        <LidoFull />
        <RocketpoolFull />
        <FraxFull />
        <CurveFull />
        <BalancerFull />
        <ConvexFull />
        <MorphoFull />
        <AuraFull />
      </Stack>
    </CardContent>
  );
}

const cardContentProps: CardContentProps = {
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
};

const labelProps: TypographyProps = {
  sx: { color: 'text.secondary', fontWeight: 500 },
};

const valueProps: TypographyProps = {
  sx: { fontSize: 16 },
};
