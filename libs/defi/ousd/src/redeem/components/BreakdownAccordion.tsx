import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';
import {
  getTokenPriceKey,
  useFormat,
  useRedeemerPrices,
  useRedeemState,
} from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { AccordionProps, StackProps } from '@mui/material';
import type { RedeemEstimate } from '@origin/shared/providers';

export const BreakdownAccordion = (props: Omit<AccordionProps, 'children'>) => {
  const intl = useIntl();
  const [{ split, isEstimateLoading }] = useRedeemState();
  const { data: prices, isLoading: isPricesLoading } = useRedeemerPrices();

  return (
    <Accordion
      sx={{
        py: 1,
        px: 2,
        backgroundColor: 'background.highlight',
        '&&&': { borderRadius: 3 },
        ...props?.sx,
      }}
    >
      <AccordionSummary
        expandIcon={<FaChevronDownRegular sx={{ color: 'text.secondary' }} />}
        sx={{ py: 1, color: 'text.secondary' }}
      >
        {intl.formatMessage({ defaultMessage: 'Show breakdown' })}
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 1, pb: 2, px: 0 }}>
        <Stack spacing={0.5}>
          {split?.map((s) => (
            <SplitRow
              key={s.token.symbol}
              estimate={s}
              price={prices?.[getTokenPriceKey(s.token)]}
              isEstimateLoading={isEstimateLoading}
              isPricesLoading={isPricesLoading}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

type SplitRowProps = {
  estimate: RedeemEstimate;
  price?: number;
  isEstimateLoading: boolean;
  isPricesLoading: boolean;
} & StackProps;

function SplitRow({
  estimate,
  price,
  isEstimateLoading,
  isPricesLoading,
  ...rest
}: SplitRowProps) {
  const { formatAmount, formatCurrency } = useFormat();

  const converted =
    +formatUnits(estimate.amount, estimate.token.decimals) * (price ?? 0);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      {...rest}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <TokenIcon token={estimate.token} />
        <Typography fontWeight={500}>{estimate.token.symbol}</Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <LoadingLabel
          fontWeight={500}
          isLoading={isEstimateLoading}
          sWidth={80}
        >
          {formatAmount(estimate.amount, estimate.token.decimals)}
        </LoadingLabel>
        <LoadingLabel
          isLoading={isPricesLoading || isEstimateLoading}
          sWidth={80}
          noWrap
          fontWeight={500}
          color="text.secondary"
          textAlign="end"
          minWidth={80}
        >
          {formatCurrency(converted)}
        </LoadingLabel>
      </Stack>
    </Stack>
  );
}
