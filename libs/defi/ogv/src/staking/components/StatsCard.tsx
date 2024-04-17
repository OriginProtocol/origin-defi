import { Card, Divider, Stack } from '@mui/material';
import { useOgvHoldersCountQuery, useOgvInfo } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { useStakingAPY } from '../hooks';
import { valueLabelProps } from '../styles';

import type { CardProps } from '@mui/material';

export const StatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: info, isLoading: isInfoLoading } = useOgvInfo();
  const { data: staking, isLoading: isStakingLoading } = useStakingAPY(100, 48);
  const { data: holdersCount, isLoading: isHoldersCountLoading } =
    useOgvHoldersCountQuery();

  return (
    <Card {...props}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          justifyContent: 'space-evenly',
        }}
      >
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({
            defaultMessage: 'Max vAPY',
          })}
          labelInfoTooltip={intl.formatMessage({
            defaultMessage:
              'The maximum variable APY currently being earned on staked OGV. Staking rewards are distributed in OGV.',
          })}
          value={intl.formatNumber((staking?.stakingAPY ?? 0) / 100, {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          valueProps={{
            variant: 'h3',
            sx: {
              background: (theme) => theme.palette.background.gradientOrange,
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          }}
          isLoading={isStakingLoading}
        />
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: 'Total OGV staked',
          })}
          value={intl.formatNumber(info?.ogvTotalLockedPercent ?? 0, {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            roundingMode: 'floor',
          })}
          isLoading={isInfoLoading}
          {...valueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'veOGV holders' })}
          value={intl.formatNumber(
            holdersCount?.ogvAddressesConnection?.totalCount ?? 0,
          )}
          isLoading={isHoldersCountLoading}
          {...valueLabelProps}
        />
      </Stack>
    </Card>
  );
};
