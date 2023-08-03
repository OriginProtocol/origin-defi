import { SwapCard } from '@origin/shared/components';
import random from 'lodash/random';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { valueFormat } from '../../constants';

export function PortfolioSwap() {
  const intl = useIntl();
  const [values, setValues] = useState({
    baseToken: {
      abbrevation: 'OETH',
      imgSrc: 'https://app.oeth.com/images/currency/oeth-icon-small.svg',
      quantity: 0,
    },
    exchangeCurrency: {
      abbrevation: 'wOETH',
      imgSrc: 'https://app.oeth.com/images/currency/woeth-icon-small.svg',
      quantity: 0,
    },
  });

  function handleValueChange(value: string) {
    const number = parseInt(value) || 0;
    setValues((prev) => ({
      baseToken: {
        ...prev.baseToken,
        quantity: number,
      },
      exchangeCurrency: {
        ...prev.exchangeCurrency,
        quantity: number * random(number - 0.5, number, true),
      },
    }));
  }

  function swapTokens() {
    setValues((prev) => ({
      baseToken: {
        ...prev.exchangeCurrency,
        quantity: prev.baseToken.quantity,
      },
      exchangeCurrency: {
        ...prev.baseToken,
        quantity:
          prev.baseToken.quantity *
          random(prev.baseToken.quantity - 0.5, prev.baseToken.quantity, true),
      },
    }));
  }
  return (
    <SwapCard
      title={intl.formatMessage({ defaultMessage: 'Wrap' })}
      onSwap={swapTokens}
      onValueChange={handleValueChange}
      baseTokenIcon={values.baseToken.imgSrc}
      baseTokenName={values.baseToken.abbrevation}
      exchangeTokenName={values.exchangeCurrency.abbrevation}
      exchangeTokenIcon={values.exchangeCurrency.imgSrc}
      exchangeTokenQuantity={intl.formatNumber(
        values.exchangeCurrency.quantity,
        valueFormat
      )}
    />
  );
}
