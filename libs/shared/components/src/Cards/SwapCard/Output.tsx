import { alpha, Box, Typography } from '@mui/material';
import { currencyFormat, valueFormat } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import { Loader } from '../../Loader';
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
        borderTopColor: 'transparent',
        borderRadius: 1,
        borderStartStartRadius: 0,
        borderStartEndRadius: 0,
        backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.2),
        padding: (theme) => ({
          xs: theme.spacing(2, 1.5),
          md: 3,
        }),
        borderBlockEnd: '1px solid',
        paddingBlock: 2.5,
        paddingBlockEnd: 2.625,
        boxShadow: 'none',
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
              flex: 1,
              alignSelf: 'end',
              lineHeight: '1.875rem',
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
          sx={{
            justifySelf: 'end',
            ...(!exchangeTokenBalance ? { transform: 'translateY(50%)' } : {}),
          }}
        />
      </Box>

      <Box sx={{ ...styles, marginBlockStart: 1 }}>
        {exchangeTokenValue !== undefined ? (
          isLoading ? (
            <Loader width={28} />
          ) : (
            <Typography variant="body1" color="grey.200" lineHeight="1.5rem">
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
              lineHeight="1.5rem"
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
