import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useWatchBalance } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { cardContentProps } from '../styles';
import { StakeButton } from './StakeFormModal';

import type { CardProps } from '@mui/material';

export const BalanceCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet.OGV.address,
  });

  return (
    <Card {...props}>
      <CardHeader
        disableTypography
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'Balance' })}
            </Typography>
            <Stack direction="row" alignItems="center">
              <TokenIcon
                token={tokens.mainnet.OGV}
                sx={{ fontSize: 24, mr: 0.75 }}
              />
              <LoadingLabel
                sWidth={50}
                isLoading={isBalanceLoading}
                sx={{ fontSize: 16, mr: 2 }}
              >
                {intl.formatNumber(
                  +formatUnits(balance ?? 0n, tokens.mainnet.OGV.decimals),
                  { notation: 'compact', maximumSignificantDigits: 4 },
                )}
              </LoadingLabel>
              <Button variant="outlined" sx={{ textWrap: 'nowrap' }}>
                {intl.formatMessage({ defaultMessage: 'Get OGV' })}
              </Button>
            </Stack>
          </Stack>
        }
      />
      <CardContent
        {...cardContentProps}
        sx={{ ...cardContentProps?.sx, pt: 4 }}
      >
        <StakeButton variant="action" fullWidth>
          {intl.formatMessage({ defaultMessage: 'Stake OGV' })}
        </StakeButton>
      </CardContent>
    </Card>
  );
};
