import { Box, Divider, Stack, Typography } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useContractRead } from 'wagmi';

import type { StackProps } from '@mui/material';

export const ProtocolCard = (props: StackProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { data, isLoading: isTotalSupplyLoading } = useContractRead({
    address: tokens.mainnet.veOGV.address,
    abi: tokens.mainnet.veOGV.abi,
    functionName: 'totalSupply',
  });

  const totalSupply = +formatUnits(data ?? 0n, tokens.mainnet.veOGV.decimals);

  return (
    <Stack borderRadius={2} border={1} borderColor="divider" {...props}>
      <Stack
        direction="row"
        p={{ xs: 1.5, md: 3 }}
        justifyContent="space-between"
      >
        <Stack spacing={1}>
          <Typography
            variant="h1"
            sx={{
              '.blue': { color: 'primary.main' },
            }}
          >
            <span className="blue">Origin</span>&nbsp;
            {intl.formatMessage({ defaultMessage: 'Governance' })}
          </Typography>
          <Typography color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Description' })}
          </Typography>
        </Stack>
        <Box
          component="img"
          src={tokens.mainnet.OGV.icon}
          width={{ xs: 44, sm: 88 }}
          height={{ xs: 44, sm: 88 }}
        />
      </Stack>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
        sx={{
          backgroundColor: 'background.header',
          borderBottomLeftRadius: (theme) => theme.shape.borderRadius * 2,
          borderBottomRightRadius: (theme) => theme.shape.borderRadius * 2,
        }}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Proposals' })}
          value={formatAmount(28)}
          py={2}
          valueProps={{ variant: 'h3' }}
          width={1}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Vote supply' })}
          value={intl.formatNumber(totalSupply, {
            notation: 'compact',
            minimumFractionDigits: 2,
          })}
          isLoading={isTotalSupplyLoading}
          py={2}
          valueProps={{ variant: 'h3' }}
          width={1}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Voting addresses' })}
          value={formatAmount(52)}
          py={2}
          valueProps={{ variant: 'h3' }}
          width={1}
        />
      </Stack>
    </Stack>
  );
};
