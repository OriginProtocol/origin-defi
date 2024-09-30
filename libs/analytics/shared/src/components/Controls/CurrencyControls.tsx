import { Button, ButtonGroup } from '@mui/material';
import { defineMessage, useIntl } from 'react-intl';

import type { ButtonGroupProps } from '@mui/material';

const currencyOptions = {
  ETH: defineMessage({ defaultMessage: 'ETH' }),
  USD: defineMessage({ defaultMessage: 'USD' }),
};

export type Currency = keyof typeof currencyOptions;

export type CurrencyControlsProps = {
  currency: Currency;
  setCurrency: (value: Currency) => void;
} & ButtonGroupProps;

export const CurrencyControls = ({
  currency,
  setCurrency,
  ...rest
}: CurrencyControlsProps) => {
  const intl = useIntl();

  return (
    <ButtonGroup size="small" variant="outlined" color="secondary" {...rest}>
      {Object.entries(currencyOptions).map(([key, value]) => (
        <Button
          key={key}
          onClick={() => {
            setCurrency(key as Currency);
          }}
          sx={[
            ...(key === currency
              ? [{ backgroundColor: 'secondary.main' }]
              : []),
          ]}
        >
          {intl.formatMessage(value)}
        </Button>
      ))}
    </ButtonGroup>
  );
};
