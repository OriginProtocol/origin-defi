import { useState } from 'react';

import { Stack } from '@mui/material';
import {
  ActionButton,
  DropdownIcon,
  SwapCard,
  TokenListModal,
} from '@origin/shared/components';
import random from 'lodash/random';
import { useIntl } from 'react-intl';

import { GasPopover } from '../components/GasPopover';
import { SwapRoute } from '../components/SwapRoute';

import type { Option } from '@origin/shared/components';

export function SwapView() {
  const intl = useIntl();
  const [isSelectionModalOpen, setSelectionModal] = useState(false);
  const [values, setValues] = useState<{
    baseToken: Omit<Option, 'name'>;
    exchangeCurrency: Omit<Option, 'name'>;
  }>({
    baseToken: {
      abbreviation: 'OETH',
      imgSrc: 'https://app.oeth.com/images/currency/oeth-icon-small.svg',
      quantity: 0,
      value: 0,
    },
    exchangeCurrency: {
      abbreviation: 'ETH',
      imgSrc: 'https://app.oeth.com/images/currency/eth-icon-small.svg',
      quantity: 0,
      value: 0,
    },
  });

  function handleCloseSelectionModal() {
    setSelectionModal(false);
  }

  function handleValueChange(value: string) {
    const number = parseInt(value) || 0;
    setValues((prev) => ({
      baseToken: {
        ...prev.baseToken,
        quantity: number,
        value: number * random(18500, 19000, true),
      },
      exchangeCurrency: {
        ...prev.exchangeCurrency,
        quantity: number * random(number - 0.5, number, true),
        value: number * random(18500, 19000, true),
      },
    }));
  }

  function swapTokens() {
    setValues((prev) => ({
      baseToken: {
        ...prev.exchangeCurrency,
        quantity: prev.baseToken.quantity,
        value: prev.baseToken.quantity * random(18500, 19000),
      },
      exchangeCurrency: {
        ...prev.baseToken,
        quantity:
          prev.baseToken.quantity *
          random(prev.baseToken.quantity - 0.5, prev.baseToken.quantity, true),
        value: prev.baseToken.quantity * random(18500, 19000, true),
      },
    }));
  }

  return (
    <>
      <SwapCard
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {intl.formatMessage({ defaultMessage: 'Swap' })}
            <GasPopover
              gasPrice={21}
              onPriceToleranceChange={(tolerance) => null}
            />
          </Stack>
        }
        onSwap={swapTokens}
        onValueChange={handleValueChange}
        baseTokenIcon={values.baseToken.imgSrc}
        baseTokenName={values.baseToken.abbreviation as string}
        baseTokenValue={values.baseToken.value}
        exchangeTokenName={values.exchangeCurrency.abbreviation as string}
        exchangeTokenIcon={values.exchangeCurrency.imgSrc}
        exchangeTokenQuantity={values.exchangeCurrency.quantity}
        exchangeTokenValue={values.exchangeCurrency.value}
        exchangeTokenNode={
          <DropdownIcon onClick={() => setSelectionModal(true)} />
        }
      >
        <SwapRoute routes={[]} isLoading={false} />
        <ActionButton onClick={() => console.log('test')}>
          {intl.formatMessage({ defaultMessage: 'Swap' })}
        </ActionButton>
      </SwapCard>
      <TokenListModal
        handleClose={handleCloseSelectionModal}
        isOpen={isSelectionModalOpen}
        onSelection={(option) =>
          setValues((prev) => ({
            ...prev,
            exchangeCurrency: {
              value: prev.baseToken.quantity * random(18500, 19000, true),
              quantity: random(
                prev.baseToken.quantity - 0.5,
                prev.baseToken.quantity,
              ),
              abbreviation: option.name,
              imgSrc: option.imgSrc,
            },
          }))
        }
        selected={values.exchangeCurrency.abbreviation}
        options={[
          {
            name: intl.formatMessage({ defaultMessage: 'Wrapped Ether' }),
            abbreviation: intl.formatMessage({ defaultMessage: 'WETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/weth-icon-small.png',
            value: 0,
            quantity: 0,
          },
          {
            name: intl.formatMessage({
              defaultMessage: 'Liquid Staked Ether 2.0',
            }),
            abbreviation: intl.formatMessage({ defaultMessage: 'stETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/steth-icon-small.svg',
            value: 0,
            quantity: 0,
          },
          {
            name: intl.formatMessage({ defaultMessage: 'Rocket Pool ETH' }),
            abbreviation: intl.formatMessage({ defaultMessage: 'rETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/reth-icon-small.png',
            value: 0,
            quantity: 0,
          },
          {
            name: intl.formatMessage({ defaultMessage: 'Frax Ether' }),
            abbreviation: intl.formatMessage({ defaultMessage: 'frxETH' }),
            imgSrc:
              'https://app.oeth.com/images/currency/frxeth-icon-small.svg',
            value: 0,
            quantity: 0,
          },
          {
            name: intl.formatMessage({ defaultMessage: 'ETH' }),
            abbreviation: intl.formatMessage({ defaultMessage: 'ETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/eth-icon-small.svg',
            value: 0,
            quantity: 0,
          },
        ]}
      />
    </>
  );
}
