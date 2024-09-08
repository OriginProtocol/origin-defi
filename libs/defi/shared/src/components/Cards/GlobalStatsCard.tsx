import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { supportedChainNames } from '@origin/shared/constants';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import { useTokenInfo } from '../../hooks';
import { ColorChip } from '../Chips';

import type { AccordionProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type GlobalStatsCardProps = {
  token: Token;
  borderRadius?: number;
  showTokenHeader?: boolean;
  showAprChip?: boolean;
} & Omit<AccordionProps, 'children'>;

export const GlobalStatsCard = ({
  token,
  borderRadius = 4,
  showTokenHeader = false,
  showAprChip = false,
  ...rest
}: GlobalStatsCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(token);

  return (
    <Accordion
      defaultExpanded
      {...rest}
      sx={[
        {
          backgroundColor: 'background.default',
          '&&&': { borderRadius },
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <AccordionSummary
        expandIcon={<FaChevronDownRegular />}
        sx={{ p: 3, minHeight: 72 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            pr: 0.5,
          }}
        >
          {showTokenHeader ? (
            <>
              <TokenIcon token={token} sx={{ fontSize: 24 }} />
              <Typography
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {token.symbol}
              </Typography>
            </>
          ) : (
            <Typography
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Global stats' })}
            </Typography>
          )}
          {showAprChip && (!isMd || isSm) && (
            <ColorChip alignItems="baseline" px={0.5}>
              <LoadingLabel
                variant="caption1"
                isLoading={isInfoLoading}
                sx={{ fontWeight: 'bold' }}
              >
                {intl.formatNumber(info?.apies?.apr ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </LoadingLabel>
              <Typography variant="caption2">APR</Typography>
            </ColorChip>
          )}
        </Stack>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ p: 3 }}>
        <Stack spacing={3}>
          <ValueLabel
            direction="row"
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({ defaultMessage: 'TVL' })}
            labelProps={{ variant: 'body3', sx: { fontWeight: 'medium' } }}
            labelInfoTooltip={intl.formatMessage(
              {
                defaultMessage: 'Total value locked on {chainName}',
              },
              {
                chainName: supportedChainNames[token.chainId].short,
              },
            )}
            value={`$${format(info?.tvlUsd ?? from(0), 2)}`}
            valueProps={{ sx: { fontWeight: 'medium' } }}
            isLoading={isInfoLoading}
          />
          <ValueLabel
            direction="row"
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({ defaultMessage: 'Price' })}
            labelInfoTooltip={intl.formatMessage(
              {
                defaultMessage: 'USD price of {symbol} on {chainName}',
              },
              {
                symbol: token.symbol,
                chainName: supportedChainNames[token.chainId].short,
              },
            )}
            labelProps={{ variant: 'body3', sx: { fontWeight: 'medium' } }}
            value={`$${format(info?.price ?? from(0), 2)}`}
            valueProps={{ sx: { fontWeight: 'medium' } }}
            isLoading={isInfoLoading}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
