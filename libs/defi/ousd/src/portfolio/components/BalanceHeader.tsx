import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ConnectedButton, useWatchBalance } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';

export const BalanceCard = (props: CardProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet.OUSD,
  });

  return (
    <Card
      {...props}
      sx={{ backgroundColor: 'background.default', ...props?.sx }}
    >
      <CardContent {...cardProps} sx={{ ...cardProps?.sx, py: 3.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          color="text.secondary"
          fontWeight={500}
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'OUSD Balance' })}
          </Typography>
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'Connected wallet OUSD balance',
            })}
          />
        </Stack>

        {isConnected ? (
          <LoadingLabel
            isLoading={isBalanceLoading}
            variant="h1"
            fontWeight={400}
          >
            {intl.formatNumber(
              +formatUnits(balance ?? 0n, tokens.mainnet.OUSD.decimals),
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
                roundingMode: 'floor',
              },
            )}
          </LoadingLabel>
        ) : (
          <ConnectedButton
            connectLabel={intl.formatMessage({
              defaultMessage: 'Connect a wallet to see your balance',
            })}
          />
        )}
      </CardContent>
      <Divider />
      <CardContent {...cardProps}>
        <Button size="large" variant={isConnected ? 'contained' : 'outlined'}>
          {intl.formatMessage({ defaultMessage: 'Get OUSD' })}
        </Button>
      </CardContent>
    </Card>
  );
};

const cardProps: CardProps = {
  sx: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.75,
  },
};
