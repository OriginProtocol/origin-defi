import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { ColorChip, useTokenInfo } from '@origin/defi/shared';
import { TokenIcon, ValueLabel } from '@origin/shared/components';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import type { AccordionProps } from '@mui/material';
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
  const { apies, tvl, price, isLoading } = useTokenInfo({ token });

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
        <Stack direction="row" alignItems="center" spacing={1}>
          <TokenIcon token={token} />
          <Typography fontWeight="medium">{token.symbol}</Typography>
          <ColorChip alignItems="baseline">
            <Typography variant="caption1" fontWeight="bold">
              {intl.formatNumber(apies?.apr ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography variant="caption2">APR</Typography>
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
            value={format(tvl ?? from(0), 2)}
            isLoading={isLoading}
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Price' })}
            labelProps={{ fontWeight: 'medium' }}
            value={`$${format(price ?? from(0), 2)}`}
            isLoading={isLoading}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
