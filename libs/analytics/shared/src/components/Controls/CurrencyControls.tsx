import { Button, ButtonGroup } from '@mui/material';
import { defineMessage, useIntl } from 'react-intl';

const currencyOptions = {
  ETH: defineMessage({ defaultMessage: 'ETH' }),
  USD: defineMessage({ defaultMessage: 'USD' }),
};

export type Currency = keyof typeof currencyOptions;

export type CurrencyControlsProps = {
  currency: Currency;
  setCurrency: (value: Currency) => void;
};

export const CurrencyControls = ({
  currency,
  setCurrency,
}: CurrencyControlsProps) => {
  const intl = useIntl();

  return (
    <ButtonGroup size="small" variant="outlined" color="secondary">
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
