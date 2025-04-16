import { Button, ButtonGroup } from '@mui/material';
import { defineMessage, useIntl } from 'react-intl';

import type { ButtonGroupProps } from '@mui/material';

const currencyOptions = {
  ETH: defineMessage({ defaultMessage: 'ETH' }),
  S: defineMessage({ defaultMessage: 'S' }),
  USD: defineMessage({ defaultMessage: 'USD' }),
  PLUME: defineMessage({ defaultMessage: 'PLUME' }),
};

export type Currency = keyof typeof currencyOptions;

export type CurrencyControlsProps<T extends Currency> = {
  currency: T;
  setCurrency: (value: T) => void;
  options?: T[];
} & ButtonGroupProps;

export const CurrencyControls = <T extends Currency>({
  currency,
  setCurrency,
  options = ['ETH', 'USD'] as T[],
  ...rest
}: CurrencyControlsProps<T>) => {
  const intl = useIntl();

  return (
    <ButtonGroup size="small" variant="outlined" color="secondary" {...rest}>
      {Object.entries(currencyOptions)
        .filter(([key]) => options.includes(key as T))
        .map(([key, value]) => (
          <Button
            key={key}
            onClick={() => {
              setCurrency(key as T);
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
