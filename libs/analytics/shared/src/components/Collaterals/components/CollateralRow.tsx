import { Box, Stack, Typography } from '@mui/material';
import { ExternalLink, TokenIcon } from '@origin/shared/components';
import { useTokenBlockExplorerLink } from '@origin/shared/providers';
import { div, toNumber } from 'dnum';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { Dnum } from 'dnum';

import type { StrategyBalanceMapped } from '../../../utils';

export type CollateralRowProps = {
  balance: StrategyBalanceMapped;
  total: Dnum;
  color?: string;
} & StackProps;

export const CollateralRow = ({
  balance,
  total,
  color,
  ...rest
}: CollateralRowProps) => {
  const intl = useIntl();
  const href = useTokenBlockExplorerLink(balance.token);

  const percentage = div(balance.amount, total);

  return (
    <Stack
      direction="row"
      spacing={3}
      {...rest}
      sx={[
        { alignItems: 'center', px: 3 },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <TokenIcon token={balance.token} sx={{ fontSize: 36 }} />
      <Stack sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: color,
              }}
            />
            <Typography variant="body2">{balance.token.name}</Typography>
            <Typography color="text.secondary">
              ({balance.token.symbol})
            </Typography>
          </Stack>
          <ExternalLink iconType="arrow" href={href} />
        </Stack>
        <Stack
          direction="row"
          sx={{
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Typography variant="featured2">
            {intl.formatNumber(toNumber(balance.amount))}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {intl.formatNumber(
              toNumber(percentage, {
                decimalsRounding: 'ROUND_HALF',
                digits: 2,
              }),
              {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
