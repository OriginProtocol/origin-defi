import { Button, Divider, Stack, Typography } from '@mui/material';
import { useOgvInfo } from '@origin/defi/shared';
import { TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowRightRegular, OGVOutlined } from '@origin/shared/icons';
import { useFormat, useWatchBalance } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { StackProps } from '@mui/material';
import type { MouseEvent } from 'react';

export const ConvertOgvCard = (props: StackProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { data: info, isLoading: isInfoLoading } = useOgvInfo();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet.OGV,
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
      sx={{
        width: 1,
        borderRadius: 1,
        backgroundColor: 'background.paper',
        p: 3,
        rowGap: 3,
        ...props?.sx,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={3} width={0.4}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <OGVOutlined sx={{ fontSize: 48 }} />
          <FaArrowRightRegular />
          <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 48 }} />
        </Stack>
        <Stack>
          <Typography sx={{ fontSize: 24 }}>
            {intl.formatMessage({
              defaultMessage: 'Convert your OGV to OGN',
            })}
          </Typography>
          <Typography>
            {intl.formatMessage({
              defaultMessage:
                'You will receive OGN (any unclaimed OGV staking rewards will also be converted).',
            })}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Your OGV balance' })}
          value={
            <Stack direction="row" alignItems="center" spacing={1}>
              <TokenIcon token={tokens.mainnet.OGV} sx={{ fontSize: 24 }} />
              <Typography sx={{ fontSize: 24 }}>
                {intl.formatNumber(
                  +formatUnits(balance ?? 0n, tokens.mainnet.OGV.decimals),
                  { notation: 'compact', maximumSignificantDigits: 4 },
                )}
              </Typography>
            </Stack>
          }
          isLoading={isBalanceLoading}
          labelProps={{ color: 'text.primary', textAlign: 'center' }}
          sx={{ p: 2 }}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Unclaimed Rewards' })}
          value={
            <Stack direction="row" alignItems="center" spacing={1}>
              <TokenIcon token={tokens.mainnet.OGV} sx={{ fontSize: 24 }} />
              <Typography sx={{ fontSize: 24 }}>
                {formatAmount(
                  info?.veOgvRewards ?? 0n,
                  tokens.mainnet.OGV.decimals,
                )}
              </Typography>
            </Stack>
          }
          isLoading={isInfoLoading}
          labelProps={{ color: 'text.primary', textAlign: 'center' }}
          sx={{ p: 2 }}
        />
      </Stack>
      <Button
        variant="action"
        onClick={(evt: MouseEvent<HTMLButtonElement>) => {
          evt.stopPropagation();
        }}
        sx={{ width: 300 }}
      >
        {intl.formatMessage({ defaultMessage: 'Convert All OGV' })}
      </Button>
    </Stack>
  );
};
