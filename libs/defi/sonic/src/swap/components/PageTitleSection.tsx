import { Stack, Typography } from '@mui/material';
import { ColorChip, useTokenInfo } from '@origin/defi/shared';
import {
  InfoTooltip,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(
    tokens.base.superOETHb,
  );

  return (
    <Stack
      direction="row"
      spacing={1}
      {...props}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          pt: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <ColorChip spacing={0.5} minHeight={40}>
        <TokenIcon token={tokens.base.superOETHb} sx={{ fontSize: 24 }} />
        <LoadingLabel
          isLoading={isInfoLoading}
          sWidth={90}
          sx={{ color: 'inherit', fontWeight: 'bold' }}
        >
          {intl.formatNumber(info?.apy7 /* bestApy?.value */ ?? 0, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'percent',
          })}
        </LoadingLabel>
        <Typography
          variant="caption1"
          sx={{
            color: 'inherit',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'APY' })}
        </Typography>
        <InfoTooltip
          tooltipLabel={intl.formatMessage(
            {
              defaultMessage: '{trailingDays}-day trailing APY',
            },
            { trailingDays: 7 /* info?.bestApy?.trailingDays */ },
          )}
          iconColor="primary.main"
        />
      </ColorChip>
    </Stack>
  );
};
