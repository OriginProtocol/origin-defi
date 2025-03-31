import { Card, CardContent, Grid, Stack } from '@mui/material';
import { OverviewView as GenericOverview } from '@origin/analytics/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { format } from 'dnum';
import { useIntl } from 'react-intl';
import { useReadContract } from 'wagmi';

import { OethDistributionCard } from '../components/OethDistributionCard';

export const OverviewView = () => {
  const intl = useIntl();
  const { data: mainnetTotalSupply, isLoading: isMainnetTotalSupplyLoading } =
    useReadContract({
      address: tokens.mainnet.OETH.address,
      abi: tokens.mainnet.OETH.abi,
      chainId: tokens.mainnet.OETH.chainId,
      functionName: 'totalSupply',
    });
  const { data: arbTotalSupply, isLoading: isArbTotalSupplyLoading } =
    useReadContract({
      address: tokens.arbitrum.wOETH.address,
      abi: tokens.arbitrum.wOETH.abi,
      chainId: tokens.arbitrum.wOETH.chainId,
      functionName: 'totalSupply',
    });
  const { data: baseTotalSupply, isLoading: isBaseTotalSupplyLoading } =
    useReadContract({
      address: tokens.base.wOETH.address,
      abi: tokens.base.wOETH.abi,
      chainId: tokens.base.wOETH.chainId,
      functionName: 'totalSupply',
    });

  return (
    <GenericOverview token={tokens.mainnet.OETH}>
      <Grid size={12}>
        <Stack
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: 2,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Card sx={{ width: 1 }}>
                <CardContent>
                  <ValueLabel
                    label={intl.formatMessage({
                      defaultMessage: 'Ethereum TVL',
                    })}
                    value={format(
                      [
                        BigInt(mainnetTotalSupply ?? 0n),
                        tokens.mainnet.OETH.decimals,
                      ],
                      2,
                    )}
                    isLoading={isMainnetTotalSupplyLoading}
                    currency="ETH"
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: 1 }}>
                <CardContent>
                  <ValueLabel
                    label={intl.formatMessage({
                      defaultMessage: 'Arbitrum TVL',
                    })}
                    value={format(
                      [
                        BigInt(arbTotalSupply ?? 0n),
                        tokens.arbitrum.wOETH.decimals,
                      ],
                      2,
                    )}
                    isLoading={isArbTotalSupplyLoading}
                    currency="ETH"
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: 1 }}>
                <CardContent>
                  <ValueLabel
                    label={intl.formatMessage({
                      defaultMessage: 'Base TVL',
                    })}
                    value={format(
                      [
                        BigInt(baseTotalSupply ?? 0n),
                        tokens.base.wOETH.decimals,
                      ],
                      2,
                    )}
                    isLoading={isBaseTotalSupplyLoading}
                    currency="ETH"
                  />
                </CardContent>
              </Card>
            </Stack>
            <OethDistributionCard height={300} />
          </Stack>
        </Stack>
      </Grid>
    </GenericOverview>
  );
};
