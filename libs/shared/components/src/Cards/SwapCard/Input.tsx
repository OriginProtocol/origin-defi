import { useState } from 'react';

import { alpha, Box, InputBase, Stack, Typography } from '@mui/material';
import { useDebouncedEffect } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import { Loader } from '../../Loader';
import { cardStyles } from '../Card';
import { currencyFormat } from './SwapCard';
import { SwapItem } from './SwapItem';
import { styles } from './utils';

interface Props {
  baseTokenName: string;
  baseTokenIcon: string | string[];
  isSwapped: boolean;
  baseTokenBalance?: number;
  baseTokenValue?: number;
  isLoading: boolean;
  exchangeTokenNode?: React.ReactNode;
  onValueChange: (value: string) => void;
}

export function Input({
  baseTokenIcon,
  baseTokenName,
  isSwapped,
  baseTokenBalance,
  baseTokenValue,
  isLoading,
  exchangeTokenNode,
  onValueChange,
}: Props) {
  const intl = useIntl();
  const [value, setValues] = useState('');
  useDebouncedEffect(
    () => {
      onValueChange(value);
    },
    [value],
    350,
  );
  return (
    <Box
      sx={{
        backgroundColor: 'grey.900',
        ...cardStyles,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        borderEndStartRadius: 0,
        borderEndEndRadius: 0,
        paddingBlock: 2.875,
        '&:hover, &:focus-within': {
          borderColor: 'transparent',
          borderStartStartRadius: (theme) => theme.shape.borderRadius,
          borderStartEndRadius: (theme) => theme.shape.borderRadius,
        },
        '&:hover': {
          background: (theme) =>
            `linear-gradient(${theme.palette.grey[900]}, ${
              theme.palette.grey[900]
            }) padding-box,
              linear-gradient(90deg, ${alpha(
                theme.palette.primary.main,
                0.4,
              )} 0%, ${alpha(
                theme.palette.primary.dark,
                0.4,
              )} 100%) border-box;`,
        },
        '&:focus-within': {
          background: (theme) =>
            `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box,
             linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%) border-box;`,
        },
      }}
    >
      <Box sx={styles}>
        <InputBase
          placeholder="0.00"
          type="numeric"
          fullWidth
          value={value}
          sx={{
            border: 'none',
            backgroundColor: 'transparent',
            borderRadius: 0,
            paddingBlock: 0,
            paddingInline: 0,
            alignSelf: 'end',
            borderImageWidth: 0,
            boxSizing: 'border-box',
            position: 'relative',
            bottom: '-4px',
            '& .MuiInputBase-input': {
              padding: 0,
              lineHeight: '1.5rem',
              boxSizing: 'border-box',
              fontStyle: 'normal',
              fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              height: '1.5rem',
              color: 'primary.contrastText',
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 1,
              },
            },
          }}
          onChange={(e) => {
            setValues(e.target.value.replace(/[^\d.,]/g, '').replace(',', '.'));
          }}
          data-testid="swap-input"
        />
        <Stack
          flexDirection="row-reverse"
          sx={baseTokenBalance === undefined ? { gridRow: 'span 2' } : {}}
        >
          <SwapItem
            name={baseTokenName}
            icon={baseTokenIcon}
            {...(isSwapped ? { additionalNode: exchangeTokenNode } : {})}
          />
        </Stack>

        {baseTokenValue !== undefined ? (
          isLoading ? (
            <Loader width={50} />
          ) : (
            <Typography
              color="text.secondary"
              variant="body1"
              sx={{ fontWeight: 400, fontStyle: 'normal' }}
            >
              {intl.formatNumber(baseTokenValue, currencyFormat)}
            </Typography>
          )
        ) : undefined}

        {baseTokenBalance ? (
          <Stack
            component={Typography}
            direction="row"
            gap={1}
            alignItems="center"
            color="text.secondary"
            variant="body1"
            sx={{
              justifySelf: 'flex-end',
              fontWeight: 400,
              fontStyle: 'normal',
            }}
          >
            {intl.formatMessage(
              { defaultMessage: 'Balance: {number}' },
              { number: intl.formatNumber(baseTokenBalance, currencyFormat) },
            )}
            {/* <Box
              component="span"
              sx={{
                display: 'block',
                paddingBlock: 0.25,
                paddingInline: 0.5,
                borderRadius: 1,
                background: (theme) => alpha(theme.palette.common.white, 0.1),
              }}
            >
              max
            </Box> */}
          </Stack>
        ) : undefined}
      </Box>
    </Box>
  );
}
