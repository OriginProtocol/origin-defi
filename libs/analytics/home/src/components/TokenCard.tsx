import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { oTokenConfig, useTokenInfo } from '@origin/analytics/shared';
import {
  LoadingLabel,
  NetworkIcon,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { from, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenCardProps = {
  token: Token;
} & CardProps;

export const TokenCard = ({ token, ...rest }: TokenCardProps) => {
  const intl = useIntl();
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(token);

  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  return (
    <Card {...rest}>
      <CardContent>
        <Stack>
          <TokenIcon
            token={token}
            sx={{ mb: 2, fontSize: { xs: 40, md: 68 } }}
          />
          <Typography variant="h6">{token.name}</Typography>
          <Typography variant="featured3" color="text.secondary">
            ({token.symbol})
          </Typography>
          <Stack direction="row" sx={{ my: 3, flexWrap: 'wrap' }}>
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Total supply' })}
              value={
                <Stack>
                  <LoadingLabel
                    isLoading={isInfoLoading}
                    variant="featured2"
                    sx={{ fontWeight: 'medium' }}
                  >
                    {intl.formatNumber(
                      toNumber(info?.totalSupply ?? from(0), {
                        digits: 2,
                      }),
                      { notation: 'compact', minimumFractionDigits: 2 },
                    )}
                  </LoadingLabel>
                  <LoadingLabel
                    isLoading={isInfoLoading}
                    color="text.secondary"
                  >
                    $
                    {intl.formatNumber(toNumber(info?.tvlUsd ?? from(0)), {
                      notation: 'compact',
                      minimumFractionDigits: 1,
                    })}
                  </LoadingLabel>
                </Stack>
              }
              spacing={0.5}
              sx={{ alignItems: 'flex-start', width: 0.5 }}
            />
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'APY' })}
              value={intl.formatNumber(info?.bestApy?.value ?? 0, {
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
              isLoading={isInfoLoading}
              valueProps={{
                variant: 'featured2',
                sx: { fontWeight: 'medium' },
              }}
              spacing={0.5}
              sx={{ alignItems: 'flex-start', width: 0.5 }}
            />
          </Stack>
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Networks' })}
            value={
              <Stack direction="row" spacing={1}>
                {config?.availableNetworks?.map((network) => (
                  <NetworkIcon
                    key={network.id}
                    chainId={network.id}
                    size={30}
                  />
                ))}
              </Stack>
            }
            sx={{ alignItems: 'flex-start', mb: 3 }}
          />
          <Button
            component={RouterLink}
            to={config?.pageHref ?? '.'}
            fullWidth
            size="large"
          >
            {intl.formatMessage({ defaultMessage: 'View stats' })}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
