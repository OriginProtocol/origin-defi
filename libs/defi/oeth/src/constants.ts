import { FormatNumberOptions } from 'react-intl';

export const numberCurrencyFormat: FormatNumberOptions = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
};

export const valueFormat: FormatNumberOptions = {
  minimumFractionDigits: 2,
};
