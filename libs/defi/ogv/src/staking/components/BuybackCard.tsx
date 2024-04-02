import { Button, Card, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { valueLabelProps } from '../styles';

import type { CardProps } from '@mui/material';

export const BuybackCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-evenly',
        }}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Total OGV buybacks' })}
          value={intl.formatNumber(10.368e6, {
            notation: 'compact',
            maximumSignificantDigits: 5,
            roundingMode: 'floor',
          })}
          {...valueLabelProps}
        />
        <Stack justifyContent="center" alignItems="center">
          <Button variant="outlined">
            {intl.formatMessage({ defaultMessage: 'Buyback history' })}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
