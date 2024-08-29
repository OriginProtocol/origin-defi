import {
  Divider,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  InfoTooltip,
  MultiTokenIcon,
  TokenIcon,
} from '@origin/shared/components';
import { getFormatPrecision, isNilOrEmpty } from '@origin/shared/utils';
import { add, format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';

import { useGasPrice } from '../../gas';
import { useFormat } from '../../intl';
import { getTokenPriceKey } from '../../prices';
import { MIX_TOKEN } from '../constants';
import { useRedeemerPrices } from '../hooks';
import { useRedeemState } from '../state';

import type { StackProps } from '@mui/material';
import type { Dnum } from 'dnum';

import type { RedeemEstimate } from '../types';

export const RedeemSplitCard = (props: Omit<StackProps, 'children'>) => {
  const intl = useIntl();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: prices, isLoading: isPricesLoading } = useRedeemerPrices();
  const [{ vaultContract, amountOut, gas, rate, split, isEstimateLoading }] =
    useRedeemState();
  const { data: gasPrice, isLoading: gasPriceLoading } = useGasPrice(
    gas,
    vaultContract.chainId,
  );

  const convertedAmount =
    isPricesLoading || isEstimateLoading || isNilOrEmpty(prices)
      ? from(0)
      : split.reduce((acc, curr) => {
          return add(
            acc,
            mul(
              [curr.amount, curr.token.decimals],
              prices?.[getTokenPriceKey(curr.token)] ?? 0,
            ),
          );
        }, from(0));

  return (
    <Stack
      sx={[
        {
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'transparent',
          background: `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      ]}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'stretch',
          px: 2,
          py: 1.5,
        }}
      >
        {!isXs && (
          <Stack
            sx={{
              justifyContent: 'center',
            }}
          >
            <MultiTokenIcon tokens={split.map((s) => s.token)} />
          </Stack>
        )}
        <Stack
          direction="column"
          sx={{
            flex: 1,
            gap: 0.5,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: 'baseline',
              justifyContent: 'space-between',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 1,
                alignItems: 'baseline',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                }}
              >
                {isEstimateLoading ? (
                  <Skeleton width={100} />
                ) : (
                  format(
                    [amountOut ?? 0n, MIX_TOKEN.decimals],
                    getFormatPrecision([amountOut ?? 0n, MIX_TOKEN.decimals]),
                  )
                )}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  color: 'text.secondary',
                }}
              >
                {isEstimateLoading || isPricesLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `($${format(convertedAmount, 2)})`
                )}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Gas:' })}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                }}
              >
                {isEstimateLoading || gasPriceLoading ? (
                  <Skeleton width={60} />
                ) : (
                  `~${format(gasPrice?.gasCostUsd ?? from(0), 2)}`
                )}
              </Typography>
            </Stack>
          </Stack>
          <Typography noWrap>
            {intl.formatMessage({
              defaultMessage: 'Redeem for mix via Origin Vault',
            })}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: 1.5,
          py: 1.5,
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Rate:' })}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
            }}
          >
            {isEstimateLoading ? (
              <Skeleton width={60} />
            ) : (
              `1:${format(from(rate ?? 0), 3)}`
            )}
          </Typography>
        </Stack>
        <InfoTooltip
          tooltipLabel={intl.formatMessage({
            defaultMessage: 'Exchange rate',
          })}
        />
      </Stack>
      <Divider />
      <Stack
        spacing={2}
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        {split?.map((s) => (
          <SplitRow
            key={s.token.symbol}
            estimate={s}
            price={prices?.[getTokenPriceKey(s.token)]}
            isEstimateLoading={isEstimateLoading}
            isPricesLoading={isPricesLoading}
          />
        ))}
      </Stack>
    </Stack>
  );
};

type SplitRowProps = {
  estimate: RedeemEstimate;
  price?: Dnum;
  isEstimateLoading: boolean;
  isPricesLoading: boolean;
} & StackProps;

function SplitRow({
  estimate,
  price,
  isEstimateLoading,
  isPricesLoading,
  ...rest
}: SplitRowProps) {
  const { formatAmount } = useFormat();

  const converted = mul([estimate.amount, estimate.token.decimals], price ?? 0);

  return (
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <TokenIcon token={estimate.token} />
        <Typography
          sx={{
            fontWeight: 500,
          }}
        >
          {estimate.token.symbol}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
          }}
        >
          {isEstimateLoading ? (
            <Skeleton width={80} />
          ) : (
            formatAmount(estimate.amount, estimate.token.decimals)
          )}
        </Typography>
        {isPricesLoading || isEstimateLoading ? (
          <Skeleton width={80} />
        ) : (
          <Typography
            noWrap
            sx={{
              fontWeight: 500,
              color: 'text.secondary',
              textAlign: 'end',
              minWidth: 80,
            }}
          >
            ${format(converted, 2)}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
