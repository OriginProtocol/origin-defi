import { Box, IconButton, Stack } from '@mui/material';
import { SwapCard, SwapModal } from '@origin/shared/components';
import random from 'lodash/random';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { numberCurrencyFormat, valueFormat } from '../../constants';
import { GasPopover } from './GasPopover';
import { SwapRoute } from './SwapRoute';

export function Swap() {
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isSelectionModalOpen, setSelectionModal] = useState(false);
  const [values, setValues] = useState({
    baseToken: {
      abbrevation: 'OETH',
      imgSrc: 'https://app.oeth.com/images/currency/oeth-icon-small.svg',
      quantity: 0,
      value: intl.formatNumber(0, numberCurrencyFormat),
    },
    exchangeCurrency: {
      abbrevation: 'ETH',
      imgSrc: 'https://app.oeth.com/images/currency/eth-icon-small.svg',
      quantity: 0,
      value: intl.formatNumber(0, numberCurrencyFormat),
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
        value: intl.formatNumber(
          number * random(18500, 19000, true),
          numberCurrencyFormat
        ),
      },
      exchangeCurrency: {
        ...prev.exchangeCurrency,
        quantity: number * random(number - 0.5, number, true),
        value: intl.formatNumber(
          number * random(18500, 19000, true),
          valueFormat
        ),
      },
    }));
  }

  function swapTokens() {
    setValues((prev) => ({
      baseToken: {
        ...prev.exchangeCurrency,
        quantity: prev.baseToken.quantity,
        value: intl.formatNumber(
          prev.baseToken.quantity * random(18500, 19000),
          numberCurrencyFormat
        ),
      },
      exchangeCurrency: {
        ...prev.baseToken,
        quantity:
          prev.baseToken.quantity *
          random(prev.baseToken.quantity - 0.5, prev.baseToken.quantity, true),
        value: intl.formatNumber(
          prev.baseToken.quantity * random(18500, 19000, true),
          valueFormat
        ),
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
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <img src="https://app.oeth.com/images/settings-icon.svg" />
            </IconButton>
          </Stack>
        }
        onSwap={swapTokens}
        onValueChange={handleValueChange}
        baseTokenIcon={values.baseToken.imgSrc}
        baseTokenName={values.baseToken.abbrevation}
        baseTokenValue={values.baseToken.value}
        exchangeTokenName={values.exchangeCurrency.abbrevation}
        exchangeTokenIcon={values.exchangeCurrency.imgSrc}
        exchangeTokenQuantity={intl.formatNumber(
          values.exchangeCurrency.quantity,
          valueFormat
        )}
        exchangeTokenValue={values.exchangeCurrency.value}
        exchangeTokenNode={
          <IconButton onClick={() => setSelectionModal(true)}>
            <Box
              component={'img'}
              src={`https://app.oeth.com/images/downarrow.svg`}
              sx={{
                transform: isSelectionModalOpen
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: (theme) => theme.transitions.create(['transform']),
              }}
            />
          </IconButton>
        }
      />
      <GasPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <SwapModal
        handleClose={handleCloseSelectionModal}
        isOpen={isSelectionModalOpen}
        onSelection={(option) =>
          setValues((prev) => ({
            ...prev,
            exchangeCurrency: {
              value: intl.formatNumber(
                prev.baseToken.quantity * random(18500, 19000, true),
                numberCurrencyFormat
              ),
              quantity: random(
                prev.baseToken.quantity - 0.5,
                prev.baseToken.quantity
              ),
              abbrevation: option.abbrevation,
              imgSrc: option.imgSrc,
            },
          }))
        }
        options={[
          {
            name: intl.formatMessage({ defaultMessage: 'Wrapped Ether' }),
            abbrevation: intl.formatMessage({ defaultMessage: 'WETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/weth-icon-small.png',
            value: intl.formatNumber(0, numberCurrencyFormat),
            quantity: intl.formatNumber(0, valueFormat),
          },
          {
            name: intl.formatMessage({
              defaultMessage: 'Liquid Staked Ether 2.0',
            }),
            abbrevation: intl.formatMessage({ defaultMessage: 'stETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/steth-icon-small.svg',
            value: intl.formatNumber(0, numberCurrencyFormat),
            quantity: intl.formatNumber(0, valueFormat),
          },
          {
            name: intl.formatMessage({ defaultMessage: 'Rocket Pool ETH' }),
            abbrevation: intl.formatMessage({ defaultMessage: 'rETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/reth-icon-small.png',
            value: intl.formatNumber(0, numberCurrencyFormat),
            quantity: intl.formatNumber(0, valueFormat),
          },
          {
            name: intl.formatMessage({ defaultMessage: 'Frax Ether' }),
            abbrevation: intl.formatMessage({ defaultMessage: 'frxETH' }),
            imgSrc:
              'https://app.oeth.com/images/currency/frxeth-icon-small.svg',
            value: intl.formatNumber(0, numberCurrencyFormat),
            quantity: intl.formatNumber(0, valueFormat),
          },
          {
            name: intl.formatMessage({ defaultMessage: 'ETH' }),
            abbrevation: intl.formatMessage({ defaultMessage: 'ETH' }),
            imgSrc: 'https://app.oeth.com/images/currency/eth-icon-small.svg',
            value: intl.formatNumber(0, numberCurrencyFormat),
            quantity: intl.formatNumber(0, valueFormat),
          },
        ]}
      />
      <SwapRoute
        tokenAbbrevation={values.exchangeCurrency.abbrevation}
        tokenValue={values.exchangeCurrency.value}
        tokenQuantity={values.exchangeCurrency.quantity}
        price={intl.formatNumber(
          random(
            values.exchangeCurrency.quantity,
            values.exchangeCurrency.quantity + 300
          ),
          numberCurrencyFormat
        )}
        curve={intl.formatNumber(random(0.0001, 0.005), {
          ...valueFormat,
          minimumFractionDigits: 4,
        })}
      />
    </>
  );
}
