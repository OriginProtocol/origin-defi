import { Chip, Stack, Typography } from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { ChipProps } from '@mui/material';

export type SupportedBoost =
  | 'primeETH20xp'
  | 'primeETH15xp'
  | 'primeETH11xp'
  | 'eigenTurboCharge';

export type BoostChipProps = {
  boost: SupportedBoost;
} & ChipProps;

export const BoostChip = ({ boost, ...rest }: BoostChipProps) => {
  const intl = useIntl();

  return (
    {
      eigenTurboCharge: (
        <Chip
          size="small"
          {...rest}
          label={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="inherit">
                {intl.formatMessage({ defaultMessage: 'Eigen Turbocharge' })}
              </Typography>
              <InfoTooltip
                iconColor="success.main"
                tooltipLabel={intl.formatMessage({
                  defaultMessage:
                    '1M Extra EigenLayer pts - 50 extra EL pts per ETHx minted and restaked',
                })}
              />
            </Stack>
          }
          color="success"
          variant="outlined"
        />
      ),
      primeETH11xp: (
        <Chip
          size="small"
          {...rest}
          label={intl.formatMessage({
            defaultMessage: '1.1 primeETH XP Boost',
          })}
          color="primary"
          variant="outlined"
        />
      ),
      primeETH15xp: (
        <Chip
          size="small"
          {...rest}
          label={intl.formatMessage({
            defaultMessage: '1.5 primeETH XP Boost',
          })}
          color="primary"
          variant="outlined"
        />
      ),
      primeETH20xp: (
        <Chip
          size="small"
          {...rest}
          label={intl.formatMessage({ defaultMessage: '2x primeETH XP Boost' })}
          color="primary"
        />
      ),
    }[boost] ?? <Chip {...rest} />
  );
};
