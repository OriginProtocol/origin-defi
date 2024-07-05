import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { ColorChip, useOTokenApyQuery } from '@origin/defi/shared';
import {
  LoadingLabel,
  NetworkIcon,
  ValueLabel,
} from '@origin/shared/components';
import { supportedChainNames } from '@origin/shared/constants';
import { FaChevronDownRegular } from '@origin/shared/icons';
import {
  getTokenPriceKey,
  useFormat,
  useTokenPrice,
  useTvl,
} from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import type { AccordionProps } from '@mui/material';
import type { SupportedChain } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

export type DetailsCardProps = {
  token: Token;
  borderRadius?: number;
} & Omit<AccordionProps, 'children'>;

export const DetailsCard = ({
  token,
  borderRadius = 4,
  ...rest
}: DetailsCardProps) => {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const { data: apy, isLoading: isApyLoading } = useOTokenApyQuery(
    {
      token: token?.address ?? ZERO_ADDRESS,
      chainId: token.chainId,
    },
    {
      select: (data) => data?.oTokenApies[0].apy30DayAvg ?? 0,
    },
  );
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(token),
  );
  const { data: tvl, isLoading: isTvlLoading } = useTvl(token);

  const chainName = supportedChainNames[token.chainId].short;

  return (
    <Accordion
      defaultExpanded
      {...rest}
      sx={{
        backgroundColor: 'background.default',
        '&&&': { borderRadius },
        ...rest?.sx,
      }}
    >
      <AccordionSummary expandIcon={<FaChevronDownRegular />} sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width={1}
          mr={1}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <NetworkIcon chainId={token.chainId as SupportedChain} />
            <Typography>{chainName}</Typography>
          </Stack>
          <ColorChip p={0.5}>
            <LoadingLabel
              isLoading={isApyLoading}
              variant="caption1"
              fontWeight="bold"
            >
              {intl.formatNumber(apy ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
              })}
            </LoadingLabel>
            <Typography variant="caption2">
              {intl.formatMessage({ defaultMessage: 'APY' })}
            </Typography>
          </ColorChip>
        </Stack>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ p: 3 }}>
        <Stack spacing={3}>
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'TVL' })}
            labelProps={{ fontWeight: 'medium' }}
            value={formatCurrency(tvl, undefined, undefined, {
              minimumFractionDigits: 2,
            })}
            isLoading={isTvlLoading}
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Price' })}
            labelProps={{ fontWeight: 'medium' }}
            value={formatCurrency(price)}
            isLoading={isPriceLoading}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
