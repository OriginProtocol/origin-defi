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
import { OUSD_ANALYTICS_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import {
  AaveFull,
  CompoundFull,
  ConvexFull,
  FaArrowUpRightRegular,
  FluxFull,
  MakerFull,
  MorphoFull,
} from '@origin/shared/icons';
import { useFormat, useTokenPrices } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useReadContract } from 'wagmi';

import { useOusdApyQuery } from '../queries.generated';

import type { CardContentProps, TypographyProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

export const OusdDetailCard = () => {
  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'OUSD details' })}
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
            href={OUSD_ANALYTICS_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            sx={{ height: 44, px: 3 }}
          >
            {intl.formatMessage({ defaultMessage: 'OUSD analytics' })}&nbsp;
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
  const { data: apy, isLoading: apyLoading } = useOusdApyQuery(undefined, {
    select: (data) => data.ousdapies[0],
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
    'OUSD:1_USD',
  ]);

  return (
    <CardContent {...cardContentProps}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography {...labelProps}>
          {intl.formatMessage({ defaultMessage: 'Price' })}
        </Typography>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'OUSD price',
          })}
        />
      </Stack>
      <LoadingLabel isLoading={isPricesLoading} {...valueProps}>
        {formatCurrency(prices?.['OUSD:1_USD'])}
      </LoadingLabel>
    </CardContent>
  );
}

function Tvl() {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useReadContract({
      address: tokens.mainnet.OUSD.address,
      abi: tokens.mainnet.OUSD.abi,
      functionName: 'totalSupply',
    });
  const { data: prices, isLoading: isPricesLoading } = useTokenPrices([
    'OUSD:1_USD',
  ]);

  const tvl =
    +formatUnits(totalSupply ?? 0n, tokens.mainnet.OUSD.decimals) *
    (prices?.['OUSD:1_USD'] ?? 0);

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
        tokens={[tokens.mainnet.DAI, tokens.mainnet.USDC, tokens.mainnet.USDT]}
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
        <AaveFull />
        <CompoundFull />
        <ConvexFull />
        <FluxFull />
        <MakerFull />
        <MorphoFull />
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
