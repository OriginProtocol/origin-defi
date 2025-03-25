import { Stack, Typography } from '@mui/material';
import {
  ChainsChip,
  ColorChip,
  dailyStatMapper,
  useOTokenStatsQuery,
} from '@origin/defi/shared';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';
import { useSwitchChain } from 'wagmi';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();
  const { switchChain } = useSwitchChain();
  const { data: apies, isLoading: isApiesLoading } = useOTokenStatsQuery(
    {
      token: tokens.mainnet.OETH.address.toLowerCase(),
      chainId: tokens.mainnet.OETH.chainId,
      limit: 1,
      offset: 1,
    },
    {
      select: (data) =>
        dailyStatMapper(data.oTokenDailyStats?.[0], tokens.mainnet.OETH),
    },
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
        <LoadingLabel
          isLoading={isApiesLoading}
          sWidth={90}
          sx={{ color: 'inherit', fontWeight: 'bold' }}
        >
          {intl.formatNumber(apies?.bestApy.value ?? 0, {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
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
              defaultMessage: '{trailing}-day trailing APY',
            },
            {
              trailing: apies?.bestApy.trailingDays,
            },
          )}
          iconColor="primary.main"
        />
      </ColorChip>
      <ChainsChip
        chainIds={[mainnet.id, arbitrum.id]}
        minHeight={40}
        onChainClick={(chainId) => {
          switchChain({ chainId });
        }}
      />
    </Stack>
  );
};
