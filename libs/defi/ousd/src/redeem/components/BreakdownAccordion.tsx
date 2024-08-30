import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';
import {
  getTokenPriceKey,
  useRedeemerPrices,
  useRedeemState,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';

import type { AccordionProps, StackProps } from '@mui/material';
import type { RedeemEstimate } from '@origin/shared/providers';
import type { Dnum } from 'dnum';

export const BreakdownAccordion = (props: Omit<AccordionProps, 'children'>) => {
  const intl = useIntl();
  const [{ split, isEstimateLoading }] = useRedeemState();
  const { data: prices, isLoading: isPricesLoading } = useRedeemerPrices();

  return (
    <Accordion
      sx={{
        backgroundColor: 'background.highlight',
        '&&&': { borderRadius: 3 },
        ...props?.sx,
      }}
    >
      <AccordionSummary
        expandIcon={<FaChevronDownRegular sx={{ color: 'text.secondary' }} />}
        sx={{ px: 2, py: 2, color: 'text.secondary' }}
      >
        {intl.formatMessage({ defaultMessage: 'Show breakdown' })}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Divider />
        <Stack
          spacing={2}
          sx={{
            p: 2,
          }}
        >
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
  price?: Dnum;
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
  const estimated = [estimate?.amount ?? 0n, estimate.token.decimals] as Dnum;
  const converted = mul(estimated, price ?? 0);

  return (
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <TokenIcon token={estimate.token} sx={{ fontSize: 20 }} />
        <Typography
          sx={{
            fontWeight: 500,
          }}
        >
          {estimate.token.symbol}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <LoadingLabel
          sx={{ fontWeight: 'medium' }}
          isLoading={isEstimateLoading}
          sWidth={80}
        >
          {format(estimated, {
            digits: getFormatPrecision(estimated),
            decimalsRounding: 'ROUND_DOWN',
          })}
        </LoadingLabel>
        <LoadingLabel
          isLoading={isPricesLoading || isEstimateLoading}
          sWidth={80}
          noWrap
          sx={{
            fontWeight: 'medium',
            color: 'text.secondary',
            textAlign: 'end',
            minWidth: 80,
          }}
        >
          ${format(converted, 2)}
        </LoadingLabel>
      </Stack>
    </Stack>
  );
}
