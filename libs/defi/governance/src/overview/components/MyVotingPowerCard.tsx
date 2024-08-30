import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { TokenChip, useOgnInfo } from '@origin/defi/shared';
import {
  LoadingLabel,
  ValueLabel,
  WalletIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { div, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount, useWalletClient } from 'wagmi';

import { useUserVotingPowerQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';

export const MyVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected, connector } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { data: ognInfo, isLoading: isOgnInfoLoading } = useOgnInfo();
  const { data: info, isLoading: isInfoLoading } = useUserVotingPowerQuery(
    {
      address: address ?? '',
    },
    {
      enabled: isConnected,
      select: (data) =>
        data.esAccounts.find(
          (a) =>
            a?.address?.toLowerCase() ===
            tokens.mainnet.xOGN.address.toLowerCase(),
        ),
    },
  );

  const handleAddTokenToWallet = () => {
    walletClient?.watchAsset({
      type: 'ERC20',
      options: tokens.mainnet.xOGN,
    });
  };

  const xOgnTotalSupply =
    ognInfo?.xOgnTotalSupply === undefined || ognInfo?.xOgnTotalSupply === 0n
      ? 1n
      : BigInt(ognInfo?.xOgnTotalSupply);
  const votingPowerPercent = toNumber(
    div(
      [BigInt(info?.votingPower ?? 0), tokens.mainnet.xOGN.decimals],
      [xOgnTotalSupply ?? 1n, tokens.mainnet.xOGN.decimals],
    ),
  );

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Your voting power' })}
      />
      <Divider />
      {isConnected ? (
        <CardContent>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <LoadingLabel
              isLoading={isInfoLoading}
              variant="featured3"
              sx={{ fontWeight: 'bold' }}
            >
              {formatAmount(
                BigInt(info?.votingPower ?? '0'),
                tokens.mainnet.xOGN.decimals,
                undefined,
                { notation: 'compact', maximumSignificantDigits: 4 },
              )}
            </LoadingLabel>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
              }}
            >
              <TokenChip
                token={tokens.mainnet.xOGN}
                iconProps={{ sx: { fontSize: 24 } }}
                labelProps={{ variant: 'featured3', fontWeight: 'medium' }}
              />
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Add to metamask',
                })}
              >
                <Button
                  variant="link"
                  color="secondary"
                  onClick={handleAddTokenToWallet}
                >
                  <WalletIcon
                    walletName={connector?.name}
                    sx={{ fontSize: 12 }}
                  />
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
          <ValueLabel
            label={intl.formatMessage({
              defaultMessage: 'Percentage of total votes',
            })}
            labelProps={{
              variant: 'body3',
              sx: { color: 'text.secondary', fontWeight: 'medium' },
            }}
            isLoading={isInfoLoading || isOgnInfoLoading}
            value={intl.formatMessage(
              {
                defaultMessage: '{value}',
              },
              {
                value: intl.formatNumber(votingPowerPercent ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 5,
                }),
              },
            )}
            sx={{ width: 1, alignItems: 'flex-start' }}
          />
          {/* <DelegationPanel mt={3} /> */}
        </CardContent>
      ) : (
        <CardContent>
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your voting power',
            })}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};
