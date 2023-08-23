import { alpha, Box, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { Loader } from '../../Loader';
import { cardStyles } from '../Card';
import { currencyFormat, valueFormat } from './SwapCard';
import { SwapItem } from './SwapItem';
import { styles } from './utils';

interface Props {
  isLoading: boolean;
  exchangeTokenQuantity: number;
  exchangeTokenName: string;
  exchangeTokenIcon: string | string[];
  exchangeTokenValue?: number;
  isSwapped: boolean;
  exchangeTokenNode?: React.ReactNode;
  exchangeTokenBalance?: number;
}

export function Output({
  isLoading,
  exchangeTokenIcon,
  exchangeTokenName,
  exchangeTokenQuantity,
  isSwapped,
  exchangeTokenValue,
  exchangeTokenNode,
  exchangeTokenBalance,
}: Props) {
  const intl = useIntl();
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderTop: 0,
        borderRadius: 1,
        borderStartStartRadius: 0,
        borderStartEndRadius: 0,
        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.2),
        ...cardStyles,
        paddingBlock: 3.0625,
      }}
    >
      <Box sx={styles}>
        {isLoading ? (
          <Loader width={116} height={28} />
        ) : (
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              fontStyle: 'normal',
              fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',
              lineHeight: '1.5rem',
              marginBlockStart: 0.4,
              color: (theme) =>
                exchangeTokenQuantity === 0
                  ? theme.palette.text.secondary
                  : theme.palette.primary.contrastText,
            }}
          >
            {intl.formatNumber(exchangeTokenQuantity, valueFormat)}
          </Typography>
        )}

        <SwapItem
          name={exchangeTokenName}
          icon={exchangeTokenIcon}
          {...(!isSwapped ? { additionalNode: exchangeTokenNode } : {})}
          sx={{ justifySelf: 'end' }}
        />

        {exchangeTokenValue !== undefined ? (
          isLoading ? (
            <Loader width={28} />
          ) : (
            <Typography variant="body1" color="grey.200" lineHeight="1.3129rem">
              {intl.formatNumber(exchangeTokenValue, currencyFormat)}
            </Typography>
          )
        ) : undefined}
        {exchangeTokenBalance !== undefined ? (
          isLoading ? (
            <Loader width={50} sx={{ justifySelf: 'flex-end' }} />
          ) : (
            <Typography
              sx={{
                justifySelf: 'flex-end',
              }}
              variant="body1"
              color="grey.200"
              lineHeight="1.3129rem"
            >
              {intl.formatMessage(
                { defaultMessage: 'Balance: {number}' },
                {
                  number: intl.formatNumber(
                    exchangeTokenBalance,
                    currencyFormat,
                  ),
                },
              )}
            </Typography>
          )
        ) : undefined}
      </Box>
    </Box>
  );
}
